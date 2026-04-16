import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import './sequence_bpEQWQ1D.mjs';
import 'clsx';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const acceptLanguage = Astro2.request.headers.get("accept-language") || "";
  const prefersAmharic = acceptLanguage.toLowerCase().includes("am") || acceptLanguage.toLowerCase().includes("et");
  const defaultLang = prefersAmharic ? "am" : "en";
  return Astro2.redirect(`/${defaultLang}/`);
}, "C:/Users/User/Desktop/Blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
