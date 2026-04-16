import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead, a3 as addAttribute } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_DJd8_lgm.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B_NAgx4x.mjs';
import { b as getSubscribers } from './dataService_BiMXrbA5.mjs';

const $$Subscribers = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Subscribers;
  const subscribers = await getSubscribers(Astro2.locals.supabase) || [];
  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const newThisWeek = subscribers.filter((s) => {
    const date = new Date(s.created_at);
    const weekAgo = /* @__PURE__ */ new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date > weekAgo;
  }).length;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Audience Insights" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="grid grid-cols-3 gap-4 mb-8"> <div class="stat-card-blue rounded p-5"> <p class="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-2">Total Audience</p> <p class="text-3xl font-heading font-black">${subscribers.length}</p> </div> <div class="stat-card-green rounded p-5"> <p class="text-green-200 text-[10px] font-black uppercase tracking-widest mb-2">Active</p> <p class="text-3xl font-heading font-black">${activeCount}</p> </div> <div class="stat-card-gold rounded p-5"> <p class="text-amber-200 text-[10px] font-black uppercase tracking-widest mb-2">New This Week</p> <p class="text-3xl font-heading font-black">+${newThisWeek}</p> </div> </div>  <div class="admin-card"> <div class="flex justify-between items-center mb-5 pb-4 border-b border-gray-100"> <div> <h2 class="text-sm font-heading font-extrabold text-gray-900 uppercase tracking-wider">Newsletter Subscribers</h2> <p class="text-xs text-gray-400 font-medium mt-0.5">All leads captured through the platform's newsletter funnels</p> </div> <button class="px-3 py-2 border border-gray-200 rounded text-xs font-black text-gray-500 hover:bg-gray-50 transition uppercase tracking-widest">Export CSV</button> </div> <div class="overflow-x-auto admin-table"> <table class="w-full text-left"> <thead> <tr class="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100"> <th class="pb-3">Email Address</th> <th class="pb-3 text-center">Status</th> <th class="pb-3 text-center">Source</th> <th class="pb-3">Joined</th> <th class="pb-3 text-right">Actions</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${subscribers.length === 0 ? renderTemplate`<tr> <td colspan="5" class="py-16 text-center"> <p class="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">No Subscribers Yet</p> <p class="text-xs text-gray-400">Leads captured via the footer newsletter form will appear here.</p> </td> </tr>` : subscribers.map((sub) => renderTemplate`<tr> <td class="py-4"> <div class="flex items-center gap-3"> <div class="w-8 h-8 rounded bg-[#003366] flex items-center justify-center font-black text-white text-xs uppercase flex-shrink-0"> ${sub.email?.[0]} </div> <p class="text-gray-900 font-semibold text-sm">${sub.email}</p> </div> </td> <td class="py-4 text-center"> <span${addAttribute(`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${sub.status === "active" ? "badge-live" : "bg-red-50 text-red-700 border border-red-200"}`, "class")}> ${sub.status} </span> </td> <td class="py-4 text-center"> <span class="text-[10px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded uppercase font-black tracking-widest"> ${sub.source?.replace(/_/g, " ") || "direct"} </span> </td> <td class="py-4 text-sm text-gray-500 font-medium"> ${new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} </td> <td class="py-4 text-right"> <div class="flex justify-end gap-2"> <button class="px-3 py-1.5 border border-red-100 rounded text-[11px] font-black text-red-500 hover:bg-red-50 transition uppercase tracking-widest">Remove</button> </div> </td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "C:/Users/User/Desktop/Blog/src/pages/admin/subscribers.astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/admin/subscribers.astro";
const $$url = "/admin/subscribers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subscribers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
