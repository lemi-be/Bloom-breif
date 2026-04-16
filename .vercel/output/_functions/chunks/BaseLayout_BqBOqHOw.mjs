import { c as createComponent } from './astro-component_BggQPHv2.mjs';
import 'piccolore';
import { T as createRenderInstruction, B as maybeRenderHead, Q as renderTemplate, a3 as addAttribute, b8 as renderHead, b9 as renderSlot } from './sequence_bpEQWQ1D.mjs';
import { r as renderComponent } from './entrypoint_DiYqfmF9.mjs';
import 'clsx';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Command, Loader2, X, FileText, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$TopBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-primary text-white text-sm py-2 px-6 flex justify-between items-center hidden md:flex"> <div class="flex items-center space-x-4"> <span>contact@ethiopianhorticulture.com</span> <span>+251 911 123 456</span> </div> <div class="flex space-x-4"> <a href="#" class="hover:text-accent transition">LinkedIn</a> <a href="#" class="hover:text-accent transition">Telegram</a> <a href="#" class="hover:text-accent transition">Facebook</a> </div> </div>`;
}, "C:/Users/User/Desktop/Blog/src/components/shared/TopBar.astro", void 0);

const supabaseUrl = "https://pszozolmrnqnpvcfkbny.supabase.co";
const supabaseKey = "sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd";
const supabase = createBrowserClient(supabaseUrl, supabaseKey, {
  cookies: {
    get(key) {
      if (typeof document === "undefined") return "";
      const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${key}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
    },
    set(key, value, options) {
      if (typeof document === "undefined") return;
      let cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${options?.maxAge || 60 * 60 * 24 * 7}`;
      if (options?.domain) cookie += `; domain=${options.domain}`;
      if (options?.secure) cookie += "; secure";
      document.cookie = cookie;
    },
    remove(key, options) {
      if (typeof document === "undefined") return;
      document.cookie = `${key}=; path=/; max-age=0`;
    }
  }
});

function SearchModal({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  useEffect(() => {
    let active = true;
    if (isOpen && posts.length === 0) {
      const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("posts").select("id, slug, title_en, title_am, is_research, published_at").eq("draft", false).order("published_at", { ascending: false });
        if (!error && data && active) {
          setPosts(data);
        }
        if (active) setLoading(false);
      };
      fetchPosts();
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
    return () => {
      active = false;
    };
  }, [isOpen]);
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    return posts.filter((post) => {
      const titleEn = (post.title_en || "").toLowerCase();
      const titleAm = (post.title_am || "").toLowerCase();
      return titleEn.includes(lowerQuery) || titleAm.includes(lowerQuery);
    }).slice(0, 8);
  }, [query, posts]);
  const handleModalKeyDown = (e) => {
    if (!filteredPosts.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredPosts.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredPosts[selectedIndex];
      if (selected) navigateToPost(selected);
    }
  };
  const navigateToPost = (post) => {
    const route = post.is_research ? "research" : "articles";
    window.location.href = `/${lang}/${route}/${post.slug}`;
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "text-slate-500 hover:text-primary transition flex items-center gap-2",
        "aria-label": "Search",
        children: [
          /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 sm:w-6 sm:h-6" }),
          /* @__PURE__ */ jsxs("span", { className: "hidden lg:flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs font-bold font-sans text-slate-500", children: [
            /* @__PURE__ */ jsx(Command, { className: "w-3 h-3" }),
            " K"
          ] })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: handleBackdropClick,
        className: "fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pb-4",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col",
              onKeyDown: handleModalKeyDown,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-4 border-b border-slate-100", children: [
                  /* @__PURE__ */ jsx(Search, { className: "w-6 h-6 text-emerald-600 mr-3 shrink-0" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ref: inputRef,
                      type: "text",
                      value: query,
                      onChange: (e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                      },
                      placeholder: lang === "en" ? "Search articles and research..." : "ጽሑፎችን እና ጥናቶችን ይፈልጉ...",
                      className: "flex-1 bg-transparent text-lg font-medium text-slate-800 placeholder-slate-400 outline-none"
                    }
                  ),
                  loading && /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 text-slate-400 animate-spin ml-2 shrink-0" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setIsOpen(false),
                      className: "ml-2 p-1.5 hover:bg-slate-100 rounded-lg transition",
                      children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-slate-500" })
                    }
                  )
                ] }),
                query.trim() && /* @__PURE__ */ jsx("div", { className: "max-h-[60vh] sm:max-h-[400px] overflow-y-auto p-2", children: filteredPosts.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: filteredPosts.map((post, index) => {
                  const isSelected = index === selectedIndex;
                  const title = lang === "en" ? post.title_en || post.title_am : post.title_am || post.title_en;
                  const badge = post.is_research ? lang === "en" ? "Research" : "ጥናት" : lang === "en" ? "Article" : "ጽሑፍ";
                  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => navigateToPost(post),
                      onMouseEnter: () => setSelectedIndex(index),
                      className: `w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${isSelected ? "bg-emerald-50 border border-emerald-100" : "hover:bg-slate-50 border border-transparent"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 overflow-hidden", children: [
                          /* @__PURE__ */ jsx(FileText, { className: `w-5 h-5 shrink-0 ${isSelected ? "text-emerald-500" : "text-slate-400"}` }),
                          /* @__PURE__ */ jsx("span", { className: `truncate font-medium ${isSelected ? "text-emerald-900" : "text-slate-700"}`, children: title })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-4 shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-500 rounded-lg", children: badge })
                      ]
                    }
                  ) }, post.id);
                }) }) : /* @__PURE__ */ jsx("div", { className: "px-4 py-12 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-500 font-medium", children: [
                  lang === "en" ? "No results found for" : "ምንም ውጤት አልተገኘም",
                  " ",
                  /* @__PURE__ */ jsxs("span", { className: "font-bold text-slate-800", children: [
                    '"',
                    query,
                    '"'
                  ] })
                ] }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("kbd", { className: "bg-white px-2 rounded border border-slate-200", children: "↑↓" }),
                      " to navigate"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("kbd", { className: "bg-white px-2 rounded border border-slate-200", children: "Enter" }),
                      " to select"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("kbd", { className: "bg-white px-2 rounded border border-slate-200", children: "Esc" }),
                      " to close"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-300 ml-auto", children: "BLOOM BRIEF" })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { lang } = Astro2.props;
  const otherLang = lang === "en" ? "am" : "en";
  const otherLangName = lang === "en" ? "አማርኛ" : "English";
  const links = [
    { href: `/${lang}/`, text_en: "Home", text_am: "ዋና ገጽ" },
    { href: `/${lang}/articles/`, text_en: "Articles", text_am: "ጽሑፎች" },
    { href: `/${lang}/research/`, text_en: "Research", text_am: "ጥናት" },
    { href: `/${lang}/about/`, text_en: "About", text_am: "ስለኛ" }
  ];
  const currentPath = Astro2.url.pathname;
  const togglePath = currentPath.replace(`/${lang}/`, `/${otherLang}/`);
  return renderTemplate`${maybeRenderHead()}<header class="bg-white border-b border-gray-200 sticky top-0 z-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-20"> <div class="flex-shrink-0 flex items-center"> <a${addAttribute(`/${lang}/`, "href")} class="text-2xl font-heading font-bold text-primary flex items-center"> <span class="text-brand mr-2">❁</span>
Bloom Brief
</a> </div> <nav class="hidden md:flex space-x-8"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-gray-700 hover:text-accent font-medium px-3 py-2 rounded-md transition-colors"> ${lang === "en" ? link.text_en : link.text_am} </a>`)} </nav> <div class="flex items-center space-x-4"> ${renderComponent($$result, "SearchModal", SearchModal, { "client:load": true, "lang": lang, "client:component-hydration": "load", "client:component-path": "C:/Users/User/Desktop/Blog/src/components/shared/SearchModal.jsx", "client:component-export": "default" })} <a${addAttribute(togglePath, "href")} class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm font-bold text-primary"> ${otherLangName} </a> <!-- Auth Status Container --> <div id="auth-status-container" class="relative group ml-2"> <!-- Loading / default state --> <div class="w-8 h-8 rounded-full bg-gray-100 animate-pulse border border-gray-200"></div> </div> </div> </div> </div> </header> ${renderScript($$result, "C:/Users/User/Desktop/Blog/src/components/shared/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/Desktop/Blog/src/components/shared/Header.astro", void 0);

async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*").eq("draft", false).order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data;
}
async function getPostBySlug(slug) {
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error fetching post by slug:", error);
    }
    return null;
  }
  return data;
}

function SubscribeForm({ lang = "en" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const labelsMap = {
    en: {
      placeholder: "Your email address",
      button: "Subscribe",
      successHeader: "You're in!",
      successSub: "Intelligence briefing incoming.",
      errorExists: "This email is already on the list.",
      errorGeneric: "Something went wrong. Please try again.",
      signingUp: "Joining..."
    },
    am: {
      placeholder: "የኢሜል አድራሻዎ",
      button: "ይመዝገቡ",
      successHeader: "ተመዝግበዋል!",
      successSub: "ወቅታዊ መረጃዎችን እንልክልዎታለን።",
      errorExists: "ይህ ኢሜይል አስቀድሞ ተመዝግቧል።",
      errorGeneric: "ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።",
      signingUp: "በመመዝገብ ላይ..."
    }
  };
  const labels = labelsMap[lang] || labelsMap.en;
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: subError } = await supabase.from("subscribers").insert([{ email, source: "footer_form" }]);
      if (subError) {
        if (subError.code === "23505") {
          setError(labels.errorExists);
        } else {
          setError(labels.errorGeneric);
        }
        return;
      }
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(labels.errorGeneric);
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl animate-in zoom-in slide-in-from-bottom-2 duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-black text-sm uppercase tracking-wider", children: labels.successHeader }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-xs font-medium", children: labels.successSub })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubscribe, className: "flex flex-col space-y-2 group", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-lg", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            required: true,
            placeholder: labels.placeholder,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            disabled: loading,
            className: "w-full bg-blue-900/50 border border-blue-800 rounded px-4 py-3 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-blue-900 transition-all duration-300"
          }
        ),
        loading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-900/80 flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin text-accent" }) })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "relative group bg-accent hover:bg-blue-400 text-white font-black py-3 rounded-lg transition-all duration-500 transform hover:scale-[1.02] text-xs uppercase tracking-widest overflow-hidden disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-1/2 h-full bg-white/10 transition-transform -translate-x-full group-hover:translate-x-[200%] skew-x-[-20deg] duration-1000" }),
            /* @__PURE__ */ jsxs("span", { className: "relative flex items-center justify-center gap-2", children: [
              loading ? labels.signingUp : labels.button,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ] })
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-400 font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1", children: error }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] text-blue-400 font-medium opacity-50 group-hover:opacity-100 transition-opacity", children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsx("span", { children: "Join 2,400+ horticultural professionals." })
    ] })
  ] });
}

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const { lang } = Astro2.props;
  const latestPosts = (await getPosts()).slice(0, 3);
  const labels = {
    en: {
      bio: "Passionate advocate for the Ethiopian horticulture sector, providing technical research and professional consultancy services.",
      quickLinks: "Quick Links",
      recentPosts: "Recent Posts",
      contact: "Contact",
      subscribe: "Subscribe to our Newsletter",
      emailPlaceholder: "Your email address",
      rights: "All rights reserved. Bloom Brief."
    },
    am: {
      bio: "ለኢትዮጵያ የሆርቲካልቸር ዘርፍ ጥልቅ ጥናት እና ሙያዊ የምክር አገልግሎት የምሰጥ ባለሙያ።",
      quickLinks: "ፈጣን ሊንኮች",
      recentPosts: "የቅርብ ጊዜ ጽሑፎች",
      contact: "አግኙን",
      subscribe: "ለዜና መጽሔታችን ይመዝገቡ",
      emailPlaceholder: "የኢሜል አድራሻዎ",
      rights: "መብቱ በህግ የተጠበቀ ነው። Bloom Brief።"
    }
  }[lang];
  const links = [
    { href: `/${lang}/`, text_en: "Home", text_am: "ዋና ገጽ" },
    { href: `/${lang}/articles/`, text_en: "Articles", text_am: "ጽሑፎች" },
    { href: `/${lang}/research/`, text_en: "Research", text_am: "ጥናት" },
    { href: `/${lang}/about/`, text_en: "About", text_am: "ስለኛ" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary text-white pt-16 pb-8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"> <!-- Column 1: Bio --> <div> <div class="flex items-center mb-6"> <span class="text-2xl font-heading font-bold text-white">Bloom Brief</span> </div> <p class="text-blue-100 text-sm leading-relaxed mb-6 italic">
"${labels.bio}"
</p> <div class="flex space-x-4"> <!-- Social Icons Placeholder --> <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 hover:bg-accent transition">L</a> <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 hover:bg-accent transition">T</a> <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 hover:bg-accent transition">F</a> </div> </div> <!-- Column 2: Quick Links --> <div> <h3 class="text-lg font-heading font-bold mb-6 border-b border-blue-800 pb-2 inline-block">${labels.quickLinks}</h3> <ul class="space-y-3"> ${links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-blue-100 hover:text-accent transition-colors text-sm"> ${lang === "en" ? link.text_en : link.text_am} </a> </li>`)} </ul> </div> <!-- Column 3: Recent Posts --> <div> <h3 class="text-lg font-heading font-bold mb-6 border-b border-blue-800 pb-2 inline-block">${labels.recentPosts}</h3> <ul class="space-y-4"> ${latestPosts.map((post) => renderTemplate`<li> <a${addAttribute(`/${lang}/articles/${post.slug}`, "href")} class="group"> <span class="text-blue-100 group-hover:text-accent transition-colors text-sm line-clamp-2 leading-snug"> ${lang === "en" ? post.title_en : post.title_am} </span> <span class="text-xs text-blue-300 block mt-1"> ${new Date(post.published_at).toLocaleDateString(lang === "en" ? "en-US" : "am-ET")} </span> </a> </li>`)} </ul> </div> <!-- Column 4: Contact & Newsletter --> <div> <h3 class="text-lg font-heading font-bold mb-6 border-b border-blue-800 pb-2 inline-block">${labels.contact}</h3> <p class="text-blue-100 text-sm mb-4">Addis Ababa, Ethiopia</p> <p class="text-blue-100 text-sm mb-6">contact@ethiopianhorticulture.com</p> <h4 class="text-sm font-bold uppercase tracking-wider text-accent mb-4">${labels.subscribe}</h4> ${renderComponent($$result, "SubscribeForm", SubscribeForm, { "client:load": true, "lang": lang, "client:component-hydration": "load", "client:component-path": "C:/Users/User/Desktop/Blog/src/components/shared/SubscribeForm", "client:component-export": "default" })} </div> </div> <div class="border-t border-blue-900 pt-8 text-center text-xs text-blue-300"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${labels.rights}</p> </div> </div> </footer>`;
}, "C:/Users/User/Desktop/Blog/src/components/shared/Footer.astro", void 0);

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

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { lang, title, description, image } = Astro2.props;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "image": image, "url": Astro2.url.href })}<!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800&family=Noto+Sans+Ethiopic:wght@400;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gray-50 flex flex-col min-h-screen"> ${renderComponent($$result, "TopBar", $$TopBar, {})} ${renderComponent($$result, "Header", $$Header, { "lang": lang })} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": lang })} </body></html>`;
}, "C:/Users/User/Desktop/Blog/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, getPostBySlug as g, renderScript as r };
