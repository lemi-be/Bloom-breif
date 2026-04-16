import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_DJd8_lgm.mjs';
import { $ as $$AdminLayout } from './AdminLayout_B_NAgx4x.mjs';

const $$Editor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Article Editor" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1600px] mx-auto"> ${renderComponent($$result2, "App", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Desktop/Blog/src/components/editor/App.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/User/Desktop/Blog/src/pages/admin/editor.astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/admin/editor.astro";
const $$url = "/admin/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Editor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
