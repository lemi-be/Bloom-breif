import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from "@supabase/ssr";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  // Auto-redirect root to /en/ or /am/
  if (pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language') || '';
    const lang = acceptLanguage.includes('am') ? 'am' : 'en';
    return context.redirect(`/${lang}/`);
  }

  // Strictly protect ALL routes under /admin
  if (pathname.startsWith('/admin')) {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://pszozolmrnqnpvcfkbny.supabase.co';
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd';

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
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
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
  }

  return next();
});
