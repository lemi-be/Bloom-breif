# **Project Specification: Ethiopian Horticulture Platform**

## **1\. Overview**

A high-performance, bilingual (Amharic/English) personal blog and professional portfolio built with Astro, focusing on Ethiopian commercial flower and horticulture development.

## **2\. Authoring Workflow**

* **Editor**: Custom Admin Dashboard utilizing the **Lexical** Rich-Text Editor (React/Preact Island).  
* **Format**: Lexical JSON (stored in database) serialized to HTML for the public frontend.  
* **Content Management**: Database-driven CMS via Supabase (PostgreSQL), managed through a secure /admin route.

## **3\. Content Structure (Data Schema)**

Since the project uses Supabase rather than local Markdown files, content is structured as database records. The primary posts table schema is outlined below:

interface BlogPost {  
  id: string;                  // UUID  
  slug: string;                // URL-friendly identifier (e.g., "ethiopian-rose-exports-2024")  
  title\_en: string;            // English Title  
  title\_am: string;            // Amharic Title  
  content\_en: JSON;            // Lexical Editor state (English)  
  content\_am: JSON;            // Lexical Editor state (Amharic)  
  description\_en: string;      // Short summary for SEO/listing (English)  
  description\_am: string;      // Short summary for SEO/listing (Amharic)  
  cover\_image: string;         // Imagekit.io URL for post thumbnail  
  is\_research: boolean;        // Toggles display on the /research hub  
  external\_url?: string;       // Optional: Link to previously published external works  
  published\_at: Date;          // Publication timestamp  
  draft: boolean;              // Prevents display on public routes  
}

## **4\. Design & UI Requirements**

**Theme Concept**: "Everest/G14 Professional" – A structured, authoritative, and corporate aesthetic. It emphasizes trust through a boxed layout, clear service categorizations, and a strong primary brand color.

* **Layout & Structure**:  
  * **Global Elements**:  
    * **Top Bar**: A thin secondary navigation bar above the main header for contact info (phone/email) and social media icons (LinkedIn, Telegram, Facebook). This bar persists across all public pages to reinforce professional accessibility.  
    * **Header**: Classic corporate layout. Logo on the left, primary navigation links (Home, Articles, Research, About) in the center, and a high-contrast **Language Toggle** (EN/AM) and **Search Icon** on the right.  
    * **Footer**: Large, 4-column footer. Column 1: Short Author bio and profile image. Column 2: Quick Links (Sitemap). Column 3: Latest 3 Posts. Column 4: Contact details including a functional newsletter subscription form.  
  * **1\. Home Page**:  
    * **Hero Section**: Centered text box over an Ethiopian horticulture background. Bold H1 mission statement, expert summary, and dual CTA buttons: "View Articles" and "Contact for Consultancy."  
    * **Pillars Section**: 4 high-impact cards for **Promotion, Research, Consultancy, and Advocacy**. Each uses a unique brand icon and links to specific deep-dives.  
    * **Latest Articles Preview**: A 3-column grid of the most recent blog posts with "Boxed" styling.  
    * **Newsletter Ribbon**: A full-width, high-contrast call-to-action bar for email subscriptions.  
  * **2\. Articles Page (Blog Hub)**:  
    * **Archive Header**: Simple title and breadcrumb navigation.  
    * **Main Feed**: A 1-column (mobile) or 2-column (desktop) grid of article cards. Each card displays a category tag, title, excerpt, and "Read More" button.  
    * **Sidebar (Desktop only)**: Includes a "Trending Topics" tag cloud and a "Search" widget to supplement the header search.  
  * **3\. Research Hub**:  
    * **Technical Header**: Academic-style header emphasizing data-driven insights and Good Agricultural Practices (GAP).  
    * **Filtered Feed**: Displays only content marked as is\_research: true. Cards feature an "Academic" badge and a "Download Summary" option if applicable.  
    * **Categorization Tabs**: Tabs to filter between "Market Reports," "Logistics Research," and "Technology Trends."  
  * **4\. About & Consultancy Page**:  
    * **Profile Section**: Two-column layout with a professional author portrait on the left and a detailed personal bio on the right.  
    * **Credentials List**: A structured list of professional advocacy roles and academic achievements.  
    * **Consultancy Block**: A dedicated, boxed section outlining specific consultancy services offered, followed by a secure, built-in contact form.  
* **Typography**:  
  * **Headings**: Strong, professional Serif or thick Sans-Serif (e.g., Playfair Display or Montserrat) for a traditional consulting feel.  
  * **Body**: Highly legible Sans-Serif (e.g., Open Sans or Inter) for both English and Amharic.  
  * **Hierarchy**: Large, clear font sizes for mobile to ensure the Author’s message is easily digestible.  
* **Color Palette**:  
  * **Primary**: Deep Professional Blue (\#003366) or Forest Green (\#1B4332) for headers, footers, and primary buttons.  
  * **Secondary/Accent**: Bright Sky Blue (\#00A8E8) or vibrant Gold (\#FFB703) for icons and hover states.  
  * **Backgrounds**: Pure White (\#FFFFFF) for main content and Light Cool Gray (\#F4F7F9) for secondary sections.  
* **Media Optimization**:  
  * **Authenticity**: All imagery must be specific to Ethiopian horticulture.  
  * **Processing**: Real-time optimization via **Imagekit.io**. Hero images should be high-resolution but compressed to WebP/AVIF to maintain ![][image1] loading times.  
  * **Consistency**: Square or 4:3 aspect ratios for article thumbnails to match the structured "Everest" look.

## **5\. Deployment & Infrastructure**

* **Frontend Hosting**: Vercel (configured for Astro SSR/Hybrid mode to support API routes and the admin dashboard).  
* **Backend/Auth**: Supabase (PostgreSQL database, GoTrue Auth for MFA, Storage).  
* **Media CDN**: Imagekit.io integrated with Astro's \<Image /\> component.  
* **CI/CD**: GitHub Actions for automated testing and deployment on main branch commits.

## **6\. Site Structure (Expanded)**

### **Public Routes (Bilingual: /en/\* and /am/\*)**

* **/ (Home)**: Hero section, 4-card service features, latest articles, and author intro.  
* **/articles**: Chronological blog feed with a sidebar for "Latest Research" and "Tags."  
* **/research**: A technical listing of papers and market analyses.  
* **/about**: Deep-dive professional bio, CV download, and consultancy service details.

### **Protected Routes (Admin Dashboard)**

* **/admin/login**: Secure login with MFA.  
* **/admin**: Overview of site performance and content status.  
* **/admin/editor**: **Lexical** editor island optimized for long-form research and blog posts.  
* **/admin/media**: Image management via Imagekit.io integration.  
* **/admin/settings**: Management of personal branding, consultancy text, and contact info.

## **7\. Specialized Features**

### **Client-Side Search**

* **Implementation**: Astro Island hydrated on client:idle.  
* **Functionality**: A global search modal that returns results from both English and Amharic content simultaneously.

### **Language Toggle (i18n)**

* **Implementation**: Astro's folder-based i18n routing.  
* **Behavior**: Instantly swaps between /en/ and /am/ paths. All UI labels (Buttons, Headings, Footer) must be strictly localized.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAABn0lEQVR4Xu2VvUvDUBTFX4r4geInpWCafmaQCoI4CS4Ojh1cHFxUXIRugoiDCP4Dgjg4KYgI4qYgCkpX3f0f/DP0d6GR5yWY2KYIkgOH25dzct9pbvNqTIoU/xCu607kcrlBff3PUSwWN+FboVBY0FrS6Mnn875ULSg4lUplREioU8J9dDWcjIUNHtlo1USH+0JXw8nvheY7sMlTG9B6FH4RTqYyns1mh7QQCpruwyca133f79N6HMQJh95Af6Uew/uwgA6GacQzeMnnOW1oB1HhPM+bLJVK68Ea3y5csiwmI4EkmARk7dhiJ4gKR7Ap9BfqGmN1qf3G3p8bxzBctN7ExIIJosLJCEUPSLhb7ZEmeqQZ7WkHUeEEBNqSUPjexVur1Xq1R+DI08NwAm9MAgF/Clcul2fQtoN1tVr1WN8RdNT2hSI4Rmj8AOtajwPuv2qNbNlY56OMk57nXD+0vIvwOVjHgpz03NTgG23E/Y9k44NWqG+UFyDwsJ6HTa7tUS+o19RZu09ssOEKPOLMG9ZaB8jIhMLOthQpUqRIAJ+nxGhhWOkqbgAAAABJRU5ErkJggg==>