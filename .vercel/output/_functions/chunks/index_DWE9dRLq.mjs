import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_DJd8_lgm.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B_NAgx4x.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Platform Settings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl"> <h3 class="text-blue-800 font-bold mb-2">Dynamic Content Manager</h3> <p class="text-blue-600 text-sm leading-relaxed">
Changes made here are instantly pushed to your global database and will immediately reflect on the live public website. Please ensure all text is thoroughly proofread before saving.
</p> </div> <!-- We use client:only="react" to avoid SSR mismatch on the textareas since they fetch after load --> ${renderComponent($$result2, "SettingsEditor", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Desktop/Blog/src/components/admin/SettingsEditor.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/User/Desktop/Blog/src/pages/admin/settings/index.astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/admin/settings/index.astro";
const $$url = "/admin/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
