import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { B as maybeRenderHead, a3 as addAttribute, Q as renderTemplate, b7 as unescapeHTML } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_CsMLnXWo.mjs';
import { g as getPostBySlug, $ as $$BaseLayout, r as renderScript } from './BaseLayout_g37VBgAI.mjs';
import 'clsx';

const ENDPOINT = "https://ik.imagekit.io/bvamf2oxo";
function getOptimizedUrl(src, options = {}) {
  if (src.startsWith("http") && !src.includes("ik.imagekit.io")) {
    return src;
  }
  const path = src.includes("ik.imagekit.io") ? src.split("/").pop() || "" : src.startsWith("/") ? src.substring(1) : src;
  const transformations = [];
  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  const format = options.format || "auto";
  transformations.push(`f-${format}`);
  if (options.blur) transformations.push(`bl-${options.blur}`);
  if (options.focus) transformations.push(`fo-${options.focus}`);
  const trString = transformations.length > 0 ? `tr:${transformations.join(",")}/` : "";
  const baseUrl = ENDPOINT.endsWith("/") ? ENDPOINT : `${ENDPOINT}/`;
  return `${baseUrl}${trString}${path}`;
}

const $$OptimizedImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OptimizedImage;
  const {
    src,
    alt,
    width,
    height,
    aspectRatio = "4:3",
    class: className,
    loading = "lazy",
    quality = 80
  } = Astro2.props;
  let finalWidth = width || 800;
  let finalHeight = height;
  if (!finalHeight) {
    if (aspectRatio === "21:9") finalHeight = Math.round(finalWidth * (9 / 21));
    else if (aspectRatio === "4:3") finalHeight = Math.round(finalWidth * (3 / 4));
    else if (aspectRatio === "1:1") finalHeight = finalWidth;
    else if (aspectRatio === "16:9") finalHeight = Math.round(finalWidth * (9 / 16));
  }
  const optimizedUrl = getOptimizedUrl(src, {
    width: finalWidth,
    height: finalHeight,
    quality,
    focus: "auto",
    format: "auto"
  });
  const aspectClass = {
    "21:9": "aspect-[21/9]",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "16:9": "aspect-video"
  }[aspectRatio];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${aspectClass} overflow-hidden ${className || ""}`, "class")}> <img${addAttribute(optimizedUrl, "src")}${addAttribute(alt, "alt")}${addAttribute(loading, "loading")}${addAttribute(finalWidth, "width")}${addAttribute(finalHeight, "height")} class="w-full h-full object-cover"> </div>`;
}, "C:/Users/User/Desktop/Blog/src/components/shared/OptimizedImage.astro", void 0);

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function renderText(node) {
  let text = escapeHtml(node.text || "");
  const format = typeof node.format === "number" ? node.format : 0;
  if (format & 16) text = `<code class="inline-code">${text}</code>`;
  if (format & 4) text = `<s>${text}</s>`;
  if (format & 8) text = `<u>${text}</u>`;
  if (format & 2) text = `<em>${text}</em>`;
  if (format & 1) text = `<strong>${text}</strong>`;
  return text;
}
function renderChildren(children = []) {
  return children.map(renderNode).join("");
}
function renderNode(node) {
  switch (node.type) {
    case "root":
      return renderChildren(node.children);
    case "paragraph": {
      const inner = renderChildren(node.children);
      if (!inner.trim()) return "<br>";
      return `<p>${inner}</p>`;
    }
    case "heading": {
      const tag = node.tag || "h2";
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }
    case "text":
      return renderText(node);
    case "linebreak":
      return "<br>";
    case "quote":
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;
    case "code":
      return `<pre><code>${renderChildren(node.children)}</code></pre>`;
    case "code-highlight":
      return escapeHtml(node.text || "");
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }
    case "listitem":
      return `<li>${renderChildren(node.children)}</li>`;
    case "link": {
      const href = escapeHtml(node.url || "#");
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${renderChildren(node.children)}</a>`;
    }
    case "autolink": {
      const href = escapeHtml(node.url || "#");
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${renderChildren(node.children)}</a>`;
    }
    case "image": {
      const src = escapeHtml(node.src || "");
      const alt = escapeHtml(node.altText || "");
      return `<figure class="article-figure"><img src="${src}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`;
    }
    default:
      if (node.children) return renderChildren(node.children);
      if (node.text) return escapeHtml(node.text);
      return "";
  }
}
function lexicalToHtml(content) {
  if (!content) return "";
  try {
    const state = typeof content === "string" ? JSON.parse(content) : content;
    const root = state?.root;
    if (!root) return "";
    return renderNode(root);
  } catch (err) {
    console.error("[lexicalToHtml] Failed to render content:", err);
    return "";
  }
}

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { lang, slug } = Astro2.params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return Astro2.redirect(`/${lang}/404`);
  }
  const title = lang === "en" ? post.title_en : post.title_am;
  const description = lang === "en" ? post.description_en : post.description_am;
  const imageUrl = post.cover_image || "default.jpg";
  const rawContent = lang === "en" ? post.content_en : post.content_am;
  const contentHtml = lexicalToHtml(rawContent);
  const isGated = post.subscribers_only === true;
  const gateLabel = lang === "en" ? { title: "Subscriber Access Required", body: "This article is exclusively available to Bloom Brief subscribers. Join to unlock this and all gated research.", cta: "Log In to Read", join: "Subscribe Free"} : { title: "የደንበኝነት ምዝገባ ያስፈልጋል", body: "ይህ ጽሑፍ ለ Bloom Brief ደንበኞች ብቻ ነው። ይህን እና ሁሉም ተቆልፈው ምርምሮችን ለማንበብ ይቀላቀሉ።", cta: "ለማንበብ ይግቡ", join: "በነጻ ይመዝገቡ"};
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": `${title} | Bloom Brief`, "description": description, "image": imageUrl }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="relative"> <!-- Article Hero --> <header class="bg-gray-900 text-white pt-32 pb-16"> <div class="max-w-4xl mx-auto px-4 relative z-10"> <a${addAttribute(`/${lang}/articles/`, "href")} class="inline-flex items-center text-accent hover:text-white transition mb-8 group"> <svg class="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7"></path></svg> ${lang === "en" ? "Back to Articles" : "ወደ ጽሑፎች ይመለሱ"} </a> <div class="flex items-center gap-3 mb-6"> ${post.is_research && renderTemplate`<span class="px-3 py-1 bg-brand text-white text-xs font-bold rounded uppercase tracking-widest"> ${lang === "en" ? "Technical Research" : "ቴክኒካዊ ጥናት"} </span>`} ${isGated && renderTemplate`<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#b45309] text-white text-xs font-bold rounded uppercase tracking-widest"> <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg> ${lang === "en" ? "Subscribers Only" : "ለደንበኞች ብቻ"} </span>`} </div> <h1 class="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight"> ${title} </h1> <div class="flex items-center gap-6 text-sm text-gray-400"> <div class="flex items-center gap-2"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${new Date(post.published_at).toLocaleDateString(lang === "en" ? "en-US" : "am-ET")} </div> <div class="flex items-center gap-2"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>
5 min read
</div> </div> </div> </header> <div class="max-w-4xl mx-auto px-4 -mt-10 mb-16 relative z-20"> ${renderComponent($$result2, "OptimizedImage", $$OptimizedImage, { "src": imageUrl, "alt": title, "aspectRatio": "21:9", "width": 1200, "class": "rounded-xl shadow-2xl border-4 border-white" })} </div> <div class="max-w-3xl mx-auto px-4 py-8"> <!-- Lead paragraph — always visible --> <p class="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-12 italic border-l-4 border-accent pl-6"> ${description} </p> ${isGated ? (
    /* Subscriber gate: render a blurred preview + overlay */
    renderTemplate`<div class="relative"> <!-- Blurred preview (first ~300px of content) --> <div class="pointer-events-none select-none" aria-hidden="true" style="max-height:280px;overflow:hidden;mask-image:linear-gradient(to bottom,rgba(0,0,0,1) 30%,rgba(0,0,0,0));-webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,1) 30%,rgba(0,0,0,0));"> ${contentHtml ? renderTemplate`<div class="article-prose opacity-40 blur-[3px]">${unescapeHTML(contentHtml)}</div>` : renderTemplate`<div class="space-y-3"> <div class="h-4 bg-gray-200 rounded w-full"></div> <div class="h-4 bg-gray-200 rounded w-5/6"></div> <div class="h-4 bg-gray-200 rounded w-4/6"></div> </div>`} </div> <!-- Gate overlay — hidden by JS once auth is confirmed --> <div id="content-gate" class="mt-8 border border-[#003366]/20 rounded-xl overflow-hidden"> <div class="bg-[#003366] px-8 py-10 text-white text-center"> <div class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-5"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg> </div> <h2 class="text-xl font-heading font-extrabold mb-3">${gateLabel.title}</h2> <p class="text-blue-200 text-sm leading-relaxed max-w-sm mx-auto mb-8">${gateLabel.body}</p> <div class="flex flex-col sm:flex-row gap-3 justify-center"> <a href="/login" class="px-8 py-3 bg-[#00A8E8] text-white font-black text-sm uppercase tracking-widest rounded hover:bg-white hover:text-[#003366] transition-colors duration-200"> ${gateLabel.cta} </a> <a href="/login" class="px-8 py-3 border border-white/30 text-white font-black text-sm uppercase tracking-widest rounded hover:bg-white/10 transition-colors duration-200"> ${gateLabel.join} </a> </div> </div> </div> <!-- Full content — hidden by default, revealed by JS for subscribers --> <div id="subscriber-content" class="hidden"> ${contentHtml ? renderTemplate`<div class="article-prose">${unescapeHTML(contentHtml)}</div>` : renderTemplate`<div class="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-lg text-center my-8"> <p class="text-gray-400 italic"> ${lang === "en" ? "Full content coming soon." : "ሙሉ ይዘት በቅርቡ ይመጣል።"} </p> </div>`} </div> </div>`
  ) : (
    /* Open article — render directly */
    contentHtml ? renderTemplate`<div class="article-prose">${unescapeHTML(contentHtml)}</div>` : renderTemplate`<div class="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-lg text-center my-8"> <p class="text-gray-400 italic"> ${lang === "en" ? "Full content coming soon." : "ሙሉ ይዘት በቅርቡ ይመጣል።"} </p> </div>`
  )} </div> <!-- Newsletter section --> <section class="max-w-4xl mx-auto px-4 py-16 mb-24 border-t border-gray-100"> <div id="newsletter-cta" class="bg-primary rounded-xl p-8 md:p-12 text-white text-center"> <h3 class="text-2xl font-heading font-bold mb-4"> ${lang === "en" ? "Enjoyed this insight?" : "ይህንን ብልህነት ወደዱት?"} </h3> <p class="text-blue-100 mb-8"> ${lang === "en" ? "Join 2,000+ industry leaders receiving our weekly technical briefings." : "የሳምንታዊ ቴክኒካዊ መግለጫዎቻችንን የሚቀበሉ 2,000+ የኢንዱስትሪ መሪዎችን ይቀላቀሉ።"} </p> <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"> <input type="email" placeholder="email@example.com" class="flex-grow px-6 py-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"> <button class="bg-white text-primary font-bold px-8 py-3 rounded hover:bg-gray-100 transition"> ${lang === "en" ? "Join" : "ይቀላቀሉ"} </button> </div> </div> </section> </article> ` })} ${isGated && renderTemplate`${renderScript($$result, "C:/Users/User/Desktop/Blog/src/pages/[lang]/articles/[slug].astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Users/User/Desktop/Blog/src/pages/[lang]/articles/[slug].astro", void 0);

const $$file = "C:/Users/User/Desktop/Blog/src/pages/[lang]/articles/[slug].astro";
const $$url = "/[lang]/articles/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
