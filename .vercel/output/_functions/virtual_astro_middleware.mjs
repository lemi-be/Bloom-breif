import { a7 as defineMiddleware, ag as sequence } from './chunks/sequence_bpEQWQ1D.mjs';
import 'piccolore';
import 'clsx';
import { createServerClient } from '@supabase/ssr';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  if (pathname === "/") {
    const acceptLanguage = context.request.headers.get("accept-language") || "";
    const lang = acceptLanguage.includes("am") ? "am" : "en";
    return context.redirect(`/${lang}/`);
  }
  if (pathname.startsWith("/admin")) {
    const supabaseUrl = "https://pszozolmrnqnpvcfkbny.supabase.co";
    const supabaseKey = "sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd";
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          get(key) {
            return context.cookies.get(key)?.value;
          },
          set(key, value, options) {
            context.cookies.set(key, value, options);
          },
          remove(key, options) {
            context.cookies.delete(key, options);
          }
        }
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return context.redirect("/en/404");
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") {
      return context.redirect("/en/404");
    }
    context.locals.supabase = supabase;
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
