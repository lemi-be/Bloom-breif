# **Project Blueprint Breakdown: Ethiopian Horticulture Platform**

## **Chunk 1: Foundation & Bilingual Routing**

**Goal**: Establish the Astro 4.x environment and the core i18n logic.

* **Astro & Tailwind Setup**: Initialize project with strict TypeScript.  
* **Supabase Integration**: Define database contracts and client initialization.  
* **Bilingual Middleware**: Implement folder-based routing (/en, /am) and language detection.

## **Chunk 2: The "Everest" Design System**

**Goal**: Build the professional, authoritative UI shell.

* **Design Tokens**: Configure Tailwind with the Everest palette and dual-script typography (Montserrat & Noto Sans Ethiopic).  
* **Core Layout**: Build the persistent Top Bar, Header (with Toggle), and 4-column Footer.  
* **The "Four Pillars"**: Create the high-impact homepage structure.

## **Chunk 3: Content Hubs (Public)**

**Goal**: Implement the data-driven blog and research archive.

* **Data Service**: Build the Supabase fetcher for Articles and Research.  
* **Card System**: Implement "Boxed" cards with Imagekit.io optimization.  
* **Research Hub**: Build the academic-style feed with client-side category filtering.

## **Chunk 4: Admin & Lexical Editor**

**Goal**: Create a secure, high-end authoring experience.

* **Admin Shell**: Setup Supabase Auth and protected dashboard routes.  
* **Lexical Island**: Build the React-based rich-text editor for Astro.  
* **Bilingual Workflow**: Implement the side-by-side editing interface and Supabase persistence.

## **Chunk 5: Search & Polish**

**Goal**: Finalize user engagement features and SEO.

* **Bilingual Search**: Implement the client-side search modal (cross-language results).  
* **Consultancy Funnel**: Build the secure contact form and professional bio sections.  
* **SEO & Performance**: Dynamic OpenGraph tags and Imagekit performance audit.

# **Prompt Series**

**Prompt 1: Foundation & i18n Middleware**

Create the project scaffold:

1. Initialize Astro 4.x (Empty template) \+ Tailwind CSS.  
2. Setup src/middleware.ts to redirect / to detected browser language prefix (/en or /am).  
3. Create a BaseLayout.astro that accepts a lang prop and sets \<html lang="..."\>.  
4. Verify by creating index.astro in pages/\[lang\]/ showing "Welcome" in the correct language.

**Prompt 2: Database Contracts & Supabase**

Define the data layer:

1. Create src/lib/supabase.ts and initialize the client.  
2. Define interface BlogPost in src/types/database.ts including:  
   * title\_en/am, content\_en/am (JSON), is\_research (boolean), slug.  
3. Create a mock getPosts function in src/lib/dataService.ts.  
4. Test: Log a mock post to the console from the homepage.

**Prompt 3: "Everest" UI Shell**

Implement the design system:

1. Update tailwind.config.mjs with colors: Primary (\#003366), Accent (\#00A8E8).  
2. Configure fonts: Montserrat (Headings), Inter (Body), Noto Sans Ethiopic (Amharic).  
3. Build Header.astro with a functional Language Toggle that swaps the URL prefix.  
4. Build TopBar.astro (Contact/Socials).  
5. Test: Ensure switching from /en/about to /am/about works and changes typography.

**Prompt 4: Card System & Articles Feed**

Build the content listing:

1. Create PostCard.astro: "Boxed" style, 4:3 image, primary blue top-border.  
2. Use Imagekit.io URL patterns for thumbnails.  
3. Build pages/\[lang\]/articles/index.astro using a 2-column grid.  
4. Test: Verify cards display localized titles and descriptions based on the URL.

**Prompt 5: Research Hub & Filtering**

Build the technical archive:

1. Create pages/\[lang\]/research/index.astro.  
2. Add a vanilla JS "Tabs" component to filter posts by category (Logistics, Market, Tech).  
3. Apply an "Academic" badge to cards in this section.  
4. Test: Clicking a tab hides non-matching research cards without a page reload.

**Prompt 6: Lexical Editor (React Island)**

Build the editor foundation:

1. Create a React component src/components/editor/LexicalEditor.tsx.  
2. Implement basic rich-text features (Bold, Italic, Lists).  
3. Create an "Export" button that logs the Lexical JSON state.  
4. Hydrate in a route /admin/editor using client:load.  
5. Test: Ensure formatting works and JSON output is valid.

**Prompt 7: Admin Dashboard & Auth**

Secure the backend:

1. Setup Supabase Auth login page at /admin/login.  
2. Create /admin/dashboard showing a list of posts with "Edit" buttons.  
3. Protect routes via middleware or a layout check.  
4. Test: Unauthenticated users should be redirected to login.

**Prompt 8: Bilingual Authoring Workflow**

Integrate the full editor:

1. Update the editor page to show two LexicalEditor instances side-by-side (EN / AM).  
2. Add fields for Slug, Cover Image URL, and is\_research toggle.  
3. Implement a Save function that upserts to the Supabase posts table.  
4. Test: Create a post in English and Amharic and verify it appears in the public feed.

**Prompt 9: Bilingual Search Island**

Build the search feature:

1. Create a SearchModal.tsx React component.  
2. Fetch all post titles/slugs on load (or via API).  
3. Implement a fuzzy search that scans both title\_en and title\_am.  
4. Trigger via a search icon in the Header.  
5. Test: Verify searching "Rose" or "ሮዝ" returns the correct post.

**Prompt 10: Final SEO & Consultancy Integration**

Polish and launch:

1. Build the Consultancy contact form on the /about page.  
2. Create an SEO.astro component that generates Meta/OG tags based on post data.  
3. Replace all remaining mock data with live Supabase fetches.  
4. Test: Perform a Lighthouse audit to ensure \<1s LCP and valid SEO tags.