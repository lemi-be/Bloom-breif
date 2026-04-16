import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { a3 as addAttribute, Q as renderTemplate } from './sequence_bpEQWQ1D.mjs';
import 'clsx';

const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description = "Bloom Brief | Professional insights, technical research, and designated consultancy for the commercial flower and horticulture sector in Ethiopia.",
    image = "/hero.png",
    // Default image path in public directory
    url = "https://bloombrief.ethiopianhorticulture.com",
    type = "website"
  } = Astro2.props;
  const imageUrl = image.startsWith("http") ? image : `${url}${image}`;
  return renderTemplate`<!-- Core Meta --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="title"${addAttribute(title, "content")}><meta name="robots" content="index, follow"><meta name="author" content="Bloom Brief"><!-- Open Graph / LinkedIn / Facebook / WhatsApp --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(imageUrl, "content")}><meta property="og:site_name" content="Bloom Brief"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(imageUrl, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(url, "href")}>`;
}, "C:/Users/User/Desktop/Blog/src/components/shared/SEO.astro", void 0);

export { $$SEO as $ };
