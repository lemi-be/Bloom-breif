import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from "@supabase/ssr";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  // Strictly protect ALL routes under /admin
  if (pathname.startsWith('/admin')) {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://pszozolmrnqnpvcfkbny.supabase.co';
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd';

    try {
      // Instantiate SSR client which parses incoming cookies securely
      const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
          cookies: {
            get(key) {
              return context.cookies.get(key)?.value;
            },
            set(key, value, options) {
              context.cookies.set(key, value, options as any);
            },
            remove(key, options) {
              context.cookies.delete(key, options as any);
            },
          },
        }
      );

      // Verify session authentically via the Supabase server (getUser)
      // Safe destructuring: check if data exists to prevent crashes
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;
      
      if (error || !user) {
        return context.redirect('/en/404');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        return context.redirect('/en/404');
      }

      context.locals.supabase = supabase;
    } catch (e) {
      console.error("[Middleware Error]:", e);
      return context.redirect('/en/404');
    }
  }

  return next();
});
