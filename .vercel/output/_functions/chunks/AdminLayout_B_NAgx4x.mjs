import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { a3 as addAttribute, Q as renderTemplate, b8 as renderHead, b9 as renderSlot } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_DJd8_lgm.mjs';
import { r as renderScript } from './script_DSQn3iPM.mjs';
import 'clsx';
/* empty css                 */

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/User/Desktop/Blog/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/Desktop/Blog/node_modules/astro/components/ClientRouter.astro", void 0);

const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  let userInitial = "A";
  const { data: { user } } = await Astro2.locals.supabase.auth.getUser();
  if (user) {
    const { data: profile } = await Astro2.locals.supabase.from("profiles").select("full_name, email").eq("id", user.id).single();
    userInitial = profile?.full_name?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || "A";
  }
  const navItems = [
    { label: "Overview", href: "/admin/" },
    { label: "Articles", href: "/admin/posts/" },
    { label: "Research Hub", href: "/admin/research/" },
    { label: "Subscribers", href: "/admin/subscribers/" },
    { label: "Settings", href: "/admin/settings/" }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title} | Bloom Brief Admin</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-[#F4F7F9] font-sans text-gray-900 min-h-screen flex"> <!-- Sidebar --> <aside class="w-60 bg-[#003366] min-h-screen fixed left-0 top-0 flex flex-col z-50"> <!-- Brand --> <div class="px-6 pt-8 pb-6 border-b border-white/10"> <div class="flex items-center gap-3"> <div class="w-8 h-8 rounded bg-[#00A8E8] flex items-center justify-center"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path> </svg> </div> <div> <p class="font-heading font-black text-white text-sm tracking-tight leading-none">Bloom Brief</p> <p class="text-[10px] text-[#00A8E8] font-bold uppercase tracking-widest mt-0.5">Admin Suite</p> </div> </div> </div> <!-- Nav --> <nav class="flex-grow px-3 py-5 space-y-0.5"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-colors duration-150"> ${item.label} </a>`)} </nav> <!-- Footer Actions --> <div class="px-3 pb-6 border-t border-white/10 pt-4 space-y-0.5"> <a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-semibold text-blue-300 hover:text-white hover:bg-white/10 transition-colors duration-150"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline> </svg>
View Site
</a> <button id="logoutBtn" class="w-full flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-semibold text-red-400 hover:text-white hover:bg-red-600/20 transition-colors duration-150 text-left cursor-pointer"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line> </svg>
Sign Out
</button> </div> </aside> ${renderScript($$result, "C:/Users/User/Desktop/Blog/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} <!-- Main --> <main class="flex-grow ml-60 min-h-screen flex flex-col"> <!-- Top Bar --> <header class="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4"> <div class="flex justify-between items-center"> <div> <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Admin Control Center</p> <h1 class="text-xl font-heading font-extrabold text-gray-900 tracking-tight">${title}</h1> </div> <div class="flex items-center gap-3"> <a href="/admin/editor" class="inline-flex items-center gap-2 bg-[#003366] text-white px-4 py-2.5 rounded text-sm font-bold hover:bg-[#002244] transition-colors duration-150"> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line> </svg>
New Article
</a> <!-- User --> <div class="h-8 w-8 rounded-full bg-[#00A8E8]/10 border border-[#00A8E8]/20 flex items-center justify-center"> <span id="userInitial" class="text-[11px] font-black text-[#00A8E8]">${userInitial}</span> </div> </div> </div> </header> <!-- Page Content --> <div class="p-8 flex-grow"> ${renderSlot($$result, $$slots["default"])} </div> </main> </body> </html>`;
}, "C:/Users/User/Desktop/Blog/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
