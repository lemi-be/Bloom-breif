# **Ethiopian Horticulture Platform Architecture**

## **1\. Technical Overview**

This platform is a high-performance, bilingual personal blog and professional portfolio built with **Astro**. It prioritizes static content for readers while providing a dynamic, authenticated experience for the author.

### **Core Stack**

* **Framework**: [Astro v4+](https://astro.build/)  
* **Architecture**: Islands Architecture (Partial Hydration)  
* **Styling**: Tailwind CSS  
* **Database & Auth**: [Supabase](https://supabase.com/)  
* **Editor**: [Lexical](https://lexical.dev/)  
* **Images**: [Imagekit.io](https://imagekit.io/) for real-time optimization

## **2\. Project Structure**

/  
├── public/                 \# Static assets (favicons, fonts)  
├── src/  
│   ├── components/         \# UI Islands & Building Blocks  
│   │   ├── admin/          \# Lexical Editor & Dashboard islands  
│   │   ├── shared/         \# Header, Footer, LanguageToggle.astro  
│   │   ├── search/         \# Client-side Search component (Island)  
│   │   └── blog/           \# Article cards, Research filters  
│   ├── content/            \# Local markdown/schema definitions  
│   │   └── config.ts       \# Zod schemas for Blog and Research  
│   ├── layouts/            \# Page shells (BaseLayout.astro, AdminLayout.astro)  
│   ├── lib/                \# Shared utilities  
│   │   ├── supabase.ts     \# Client initialization  
│   │   └── lexical/        \# Custom Lexical plugins  
│   ├── pages/              \# File-based routing  
│   │   ├── \[lang\]/         \# Bilingual routing (en/am)  
│   │   │   ├── index.astro  
│   │   │   ├── articles/  
│   │   │   └── research/  
│   │   ├── admin/          \# Dashboard (Protected Routes)  
│   │   └── api/            \# Search index generation & Edge functions  
│   └── styles/             \# Global CSS and Ethiopic fonts  
├── astro.config.mjs        \# Astro i18n & SSR configuration  
└── supabase/               \# Migrations and RLS policies

## **3\. Key Architectural Patterns**

### **A. Bilingual Routing (i18n)**

The site utilizes Astro's native i18n routing.

* **Public Content**: Prefixed by language code (e.g., /am/blog/\[slug\]).  
* **Data Fetching**: The getCollection API or Supabase queries are filtered based on the \[lang\] parameter.

### **B. Search Implementation**

To maintain performance while providing real-time search:

* **Search Island**: A lightweight client-side component hydrated on the client (client:idle).  
* **Search Index**: A JSON index is generated at build time (or fetched from a Supabase Edge Function for real-time updates) containing titles, slugs, and descriptions in both languages.  
* **Fuzzy Matching**: Uses a lightweight library or vanilla JS to filter results locally based on user input.

### **C. Admin "Islands"**

The public site ships **Zero JavaScript** by default. High-interactivity features like the **Lexical Editor** are isolated to the /admin routes as React/Preact islands.

## **4\. Data Flow**

1. **Authoring**: The Author writes in the Lexical editor.  
2. **Storage**: Content is stored as JSON in Supabase.  
3. **Rendering**:  
   * Static pages are generated for the public.  
   * On-demand rendering (SSR) is used for the admin dashboard.  
   * Search results are populated via a local index or API call.

## **5\. Security & Performance**

* **Security**: MFA for Admin, RLS for Database access, and ![][image1].  
* **Optimization**: Imagekit.io for responsive images and Astro's Zero-JS baseline for ultra-fast LCP.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAZCAYAAACM9limAAADoklEQVR4Xu1XS2sUQRCeJIui+AjKitnd7MzuRiNBBQUfBxU9SAQRI4oQPQn7B0xOIQTxEVEQvQVBIpiDiLmIgpqDEAgERMxBgpdcAh79EfH7dquHnrJ7s2xCBJkPipmuqu56dHfVTBCkSJHif0FfX9+mfD6/22K15XK5rdb4nyETRdFIk3Srp6dnhz25VCqdCcNwVOuWy+Wdtp5GpVLZUywWH2LuIp4zmPMe70dA50D3tL4HbUhqAc92LWgEJp6bwU3RshhwqgxHFkDjJii8/wItgYbF0XHR+dLd3Z2z52NcEZ0V0DzoKscQZWw9DejMwtbtQqGwhWO8nyAPtIz3Qa2vAb0S6AnoozpxXtAW9Ec5B3HfoS3Qfb3ZARib4cSjBBO7IEEO2UwsdAr0zJVl7gDnYK1+LXMBulXoHtB82qDT8CurZRYyCHAX50P3O+hTs4mhLv2EnWsciz2Ov2LNfbGinJbEse3t7d3uChLjszpZBpBFdNIVrIYk8YUreDoqG9WhZRotJmaasYGqHJvE/OU7GBdBV2JGEBucY7CKPwgasHkGUT1pU0yqlmkwCAZD2xi22TLaRM06bPN8aCUx1MPJOBRITeLJYWLwfLNaTaTB/maDNID+EGhU813gVeSVhP5v0GvQDTib13qroZXEaGCNV2G9lrIm+gHFTihNMzla5gN3GXPmEne0CWDOA9Aid0xoCafluNbzYQ2J6cCco0wGNugznjdZa7VSAsYYg9UyH6L6NVrxnLB24SeujAUW+i44eF2S09SpI9aQmBhY40JYP7kT2Wx2m5bHgOJAgyCdCOvXaEXzCbTygxJsrZiy8Lq6GsE12EI134f1SAwbAGzOyKbUCrIL3L0xX5AuSAeb8szhesNIzmnDYBLZCWwlA3HO2fVcaCUxvKr87jJjbhT8eS62J2zdGJHUF0+QTmBOrb7QQYeMjr/kNwfHpk03SMwy5pzUfB9aSYwkIO64xifymSClHitUZeJbLXeBdxLrP5Y55lsoI8fzEgPF7hwz+pHUItC8tMwa+DUK2V3QXsNrBkwi1voJmkWr3a/lvJahShrG38A/H0jNi6TGgPcuYZ+7CcEHcVgTu1NnrGwB/B8OfU2Jlh9KS8fcy3gu4Dkizs+CJu31G8H6DkrY447bP5+yEWN2xwnrvyv8tXkK+WBYb9WToC6js+FgIQ7k/0lOCb+X+I9Fp3xda91B26w1tI+TVgw20HaKFClSpEiRYt3wB/eUJ9/WVa2hAAAAAElFTkSuQmCC>