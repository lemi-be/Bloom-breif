# **Software Requirements Specification (SRS)**

## **Project: Ethiopian Flower & Horticulture Development Platform (Personal Blog)**

### **1\. Introduction**

#### **1.1 Purpose**

This document outlines the functional and non-functional requirements for a bilingual (Amharic/English) **personal blog and professional portfolio** platform. It is designed to host the individual writings, research, and consultancy services of the owner, focusing on the Ethiopian commercial flower and horticulture sector.

#### **1.2 Document Conventions**

* **Priority:** Requirements are ranked from High (Critical) to Low (Optional).  
* **Notation:** Technical terms or security protocols are expressed in LaTeX-style syntax (e.g., ![][image1]).

### **2\. Project Overview**

#### **2.1 Objectives**

The platform serves as a personal digital stage for:

* **Thought Leadership:** Promoting the Ethiopian horticulture sector through the owner's perspective.  
* **Knowledge Sharing:** Disseminating the owner's original research on market conditions, logistics, and technology.  
* **Professional Advocacy:** Reporting on Good Agricultural Practices (GAP) and social responsibility within the industry.  
* **Consultancy:** Providing a direct channel for the owner's professional consultancy services.

#### **2.2 User Roles**

* **The Author (Owner/Admin):** Full control over content creation, personal branding, and site settings.  
* **Visitor:** Readers, potential clients, and industry stakeholders seeking the author's insights.  
* **Subscriber:** Users following the author's work for updates and newsletters.

### **3\. Functional Requirements**

#### **3.1 Public-Facing Page Structure (Personal Brand Focused)**

* **R3.1.1 Home:**  
  * **Hero Section:** High-quality, authentic Ethiopian horticulture imagery overlaid with the Author's mission statement.  
  * **Call-to-action:** A section for promoting the newsletter.  
  * **Featured Works:** Highlighted articles and latest research snippets.  
* **R3.1.2 Articles:**  
  * **Listing Page:** Chronological feed of the author's writings with category filters.  
  * **Dynamic Routing:** Static or SSR-based URLs (e.g., /blog/\[slug\]) for SEO-friendly individual posts.  
* **R3.1.3 Research:**  
  * **Academic Focus:** A dedicated area for articles that focus on formal papers and technical analyses authored by the owner.  
* **R3.1.4 About:**  
  * **Professional Bio:** Detailed background of the author, credentials, and published history.  
  * **Consultancy Services:** A section detailing the specific areas of expertise offered.  
  * **Direct Contact:** Address, email, phone, and a secure contact form.  
* **R3.1.5 Search (Global):**  
  * **Availability:** Accessible via the header/navigation on all public pages.  
  * **Real-time Results:** As the user types, a dropdown or modal shall display matching results.  
  * **Bilingual Matching:** Capability to search through both Amharic and English titles and descriptions.  
  * **Debouncing:** Input processing shall be debounced (e.g., 300ms) to ensure smooth UI performance.

#### **3.2 Admin Dashboard Structure (Personal Admin)**

The administrative backend shall be organized into the following pages and functional modules:

* **R3.2.1 Dashboard Overview (Home):**  
  * Display high-level analytics (page views, top articles).  
  * Quick links to draft a new post or view recent comments.  
* **R3.2.2 Content Manager (Articles & Research):**  
  * **List View:** Table of all posts with status (Draft/Published) and language indicators.  
  * **Lexical Rich-Text Editor:** Implementation of the **Lexical** editor framework integrated as a React or Preact island within the Astro admin layout.  
    * **Bilingual Support:** Side-by-side or tabbed Lexical instances for Amharic and English.  
    * **Plugins:** Support for tables, images, links, and auto-link features.  
    * **Serialization:** Output content as JSON for highly structured storage and HTML for public rendering.  
  * **Classification:** Toggle to mark a post as "Research" or a standard "Article."  
  * **Archive Tool:** Fields to input external URLs for previously published works to be indexed on the site.  
* **R3.2.3 Media Library:**  
  * Upload and manage authentic Ethiopian horticulture imagery.  
  * Automatic optimization and CDN integration (Imagekit.io).  
* **R3.2.4 Engagement & Feedback:**  
  * **Comment Moderation:** Approve, delete, or reply to reader feedback.  
  * **Subscriber List:** View and export the list of newsletter subscribers.  
* **R3.2.5 Profile & Portfolio Settings:**  
  * Edit personal bio, update profile photo, and manage consultancy service descriptions.  
  * Update contact information (Address, Email, Phone).

#### **3.3 User Engagement**

* **R3.3.1 Subscription:** Integration with newsletter services (e.g., Mailchimp or ConvertKit) for the author's audience.  
* **R3.3.2 Social Sharing:** Personalized sharing links for the author’s LinkedIn, Telegram, and Facebook profiles.  
* **R3.3.3 Reader Feedback:** A moderated comment section to facilitate direct dialogue between the author and the audience.

#### **3.4 Language Support**

* **R3.4.1 Native Localization:** Use of Astro's native i18n routing for seamless English and Amharic sub-paths (e.g., /en/blog and /am/blog).  
* **R3.4.2 Typography:** Specific font pairings for Ethiopic and Latin scripts to ensure high readability.

### **4\. Non-Functional Requirements**

#### **4.1 Security & Protection**

* **R4.1.1 Personal Data Safety:** Forced ![][image2] via ![][image1] to protect visitor data and author credentials.  
* **R4.1.2 Integrity:** WAF implementation to prevent unauthorized content modification.  
* **R4.1.3 Account Security:** Mandatory MFA for the author's administrative login.

#### **4.2 Visuals & UX**

* **R4.2.1 Authentic Identity:** Use of personal professional photography and authentic Ethiopian farm visuals.  
* **R4.2.2 Responsive Design:** A consistent reading experience across mobile, tablet, and desktop.

#### **4.3 Performance & Media Optimization**

* **R4.3.1 Loading Speed:** Use of Astro’s partial hydration to ship zero JS for content pages, targeting ![][image3] LCP (Largest Contentful Paint).  
* **R4.3.2 Image Optimization Pipeline:** Leverage Astro's built-in \<Image /\> component alongside Imagekit.io:  
  * **Format Conversion:** Automatic conversion to WebP/AVIF.  
  * **Adaptive Resizing:** Responsive image sets served based on viewport size.  
  * **Lossy Compression:** Professional grade visually-lossless compression.  
  * **Lazy Loading:** Native browser lazy-loading for off-screen assets.  
  * **Metadata Stripping:** Removal of EXIF data to minimize file weight.

### **5\. Technical Stack**

* **Frontend Framework:** **Astro** (for performance-first static/hybrid site generation).  
* **Editor:** **Lexical** (implemented as a client-side island).  
* **Styling:** Tailwind CSS.  
* **Backend/Auth:** Supabase (PostgreSQL, Auth, and Edge Functions).  
* **Asset Optimization:** Imagekit.io & Astro Assets.

### **6\. Summary of Key Deliverables**

1. **Personal Brand Portal:** A bilingual, high-performance Astro-based website.  
2. **Integrated Blog & Research Hub:** SEO-optimized content management with i18n routing.  
3. **Lexical-Powered Admin:** A specialized editor for the author to manage their digital presence securely.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAZCAYAAACM9limAAADoklEQVR4Xu1XS2sUQRCeJIui+AjKitnd7MzuRiNBBQUfBxU9SAQRI4oQPQn7B0xOIQTxEVEQvQVBIpiDiLmIgpqDEAgERMxBgpdcAh79EfH7dquHnrJ7s2xCBJkPipmuqu56dHfVTBCkSJHif0FfX9+mfD6/22K15XK5rdb4nyETRdFIk3Srp6dnhz25VCqdCcNwVOuWy+Wdtp5GpVLZUywWH2LuIp4zmPMe70dA50D3tL4HbUhqAc92LWgEJp6bwU3RshhwqgxHFkDjJii8/wItgYbF0XHR+dLd3Z2z52NcEZ0V0DzoKscQZWw9DejMwtbtQqGwhWO8nyAPtIz3Qa2vAb0S6AnoozpxXtAW9Ec5B3HfoS3Qfb3ZARib4cSjBBO7IEEO2UwsdAr0zJVl7gDnYK1+LXMBulXoHtB82qDT8CurZRYyCHAX50P3O+hTs4mhLv2EnWsciz2Ov2LNfbGinJbEse3t7d3uChLjszpZBpBFdNIVrIYk8YUreDoqG9WhZRotJmaasYGqHJvE/OU7GBdBV2JGEBucY7CKPwgasHkGUT1pU0yqlmkwCAZD2xi22TLaRM06bPN8aCUx1MPJOBRITeLJYWLwfLNaTaTB/maDNID+EGhU813gVeSVhP5v0GvQDTib13qroZXEaGCNV2G9lrIm+gHFTihNMzla5gN3GXPmEne0CWDOA9Aid0xoCafluNbzYQ2J6cCco0wGNugznjdZa7VSAsYYg9UyH6L6NVrxnLB24SeujAUW+i44eF2S09SpI9aQmBhY40JYP7kT2Wx2m5bHgOJAgyCdCOvXaEXzCbTygxJsrZiy8Lq6GsE12EI134f1SAwbAGzOyKbUCrIL3L0xX5AuSAeb8szhesNIzmnDYBLZCWwlA3HO2fVcaCUxvKr87jJjbhT8eS62J2zdGJHUF0+QTmBOrb7QQYeMjr/kNwfHpk03SMwy5pzUfB9aSYwkIO64xifymSClHitUZeJbLXeBdxLrP5Y55lsoI8fzEgPF7hwz+pHUItC8tMwa+DUK2V3QXsNrBkwi1voJmkWr3a/lvJahShrG38A/H0jNi6TGgPcuYZ+7CcEHcVgTu1NnrGwB/B8OfU2Jlh9KS8fcy3gu4Dkizs+CJu31G8H6DkrY447bP5+yEWN2xwnrvyv8tXkK+WBYb9WToC6js+FgIQ7k/0lOCb+X+I9Fp3xda91B26w1tI+TVgw20HaKFClSpEiRYt3wB/eUJ9/WVa2hAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAZCAYAAACFHfjcAAAD1UlEQVR4Xu1XzUtUURR/VkSfVIRNft6no1hSRtCX9IEuwoVEtRGKwE0LlyURlJkYUbmqNhFIC10U5K4gkzQEKWiRixAR3My+/ofp95t37sx9591xrGW9Hxzm3nN+955z7sd5d4IgRYoU/zPa29s319XV7XVUVbW1tducfgnGmG7IgzAM77gCXWdjY+N5rac0NTV12PHg3NZ2nwivX+t9At+D9fX1rZxf+kOQN5jjI9tq3r5SNhGy2ew+6B+Bu4TfGfDeoX3U5qr5BTQ0NGQtATILuYxEz2HwbmXLQ3qtTYZXQfcT8toJjMGS+xbtC/gdpB3yC/IZupcO975wX6DfQ74EnWefDkzc/7T0rXBuJnvaSYlj5jH+JhZzK/ton6QOkkP7isuNgccFpHHr3AWThm2KgXhsp/CzydWB9x2yAFtodTL/NAJ+7FC5CWc5N31YHY8y+hN2PMdy8ei/THwHTLQZnezj9zp1moc5zsD2oaWlpVrbiqBTCT4xgTgqJKdMVbDdUDoGkodMtrW17bQ6BLEHui88TS4X4wcgT9DcaHUMFLrnoSwOFqsWY+cwxzd7XVyA1wX7MuY+YjfUlywXQvtKQCbLu8E7tkuS3Lirb25u3mWS941XhdxBV4kEOriQCDZjdXanOb/itkI3ykLHvpwa7nhscQX0dwv8CcbD02Si69NLm0sEJ3RrmxcMnAkEajD70A/7kvOBgZIbeo6wht1p7qS2ucBcA+J/SNuQeD30s9xt9rl4aD81UrcgV7GwdXqcF1wpE12LHyZeiLqh68fvithDPVYjjE6Pb+cSMKXFL39UgwJvThKbZyGGzKC9CvmE9rVMJrPdM+YhZInzi6xiwU9oXgyhXAvIpMdWvBZlv78l2NNT8eS4BVDbNEy0CLGCuk4wnhr46ZMcEicqBgYuxGGPbd3XgoFKwBWvBU8XuAuQZW3ToP+wUpELosW1dUWDc2BBRrS+CLnTk+IskQATE1uXtmmE8nVhktqm4RTAKW1zIV8B+o8VVB+4WbZWaHAO2rW+CGdnmEDi00k97etJjsHS4Z/UB9npspCCugg5qG0u7GdzjYXIhdGbxw8YxySgMcgW11ZdXb1DVvJeoB5NChtQmVvAe09+sDaXyR2TBV4pFzjBYw7OXcT1rFJ9Ckt17itiOWz1fFnCNgrZ7/KLQDCHwugrwcFFoXPYjqOd0zbjqSGY44qHVxCeEJdrov8LCR4kR5+Wx3cEH08eHp/hsc2yMNEJ43+Qi/hdDKPn+4iJntWvNP+fBTc2kJMop6DHRE+AmiD5NkqRIkWKFClS/D1+A5ljYXNHBCijAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAABn0lEQVR4Xu2VvUvDUBTFX4r4geInpWCafmaQCoI4CS4Ojh1cHFxUXIRugoiDCP4Dgjg4KYgI4qYgCkpX3f0f/DP0d6GR5yWY2KYIkgOH25dzct9pbvNqTIoU/xCu607kcrlBff3PUSwWN+FboVBY0FrS6Mnn875ULSg4lUplREioU8J9dDWcjIUNHtlo1USH+0JXw8nvheY7sMlTG9B6FH4RTqYyns1mh7QQCpruwyca133f79N6HMQJh95Af6Uew/uwgA6GacQzeMnnOW1oB1HhPM+bLJVK68Ea3y5csiwmI4EkmARk7dhiJ4gKR7Ap9BfqGmN1qf3G3p8bxzBctN7ExIIJosLJCEUPSLhb7ZEmeqQZ7WkHUeEEBNqSUPjexVur1Xq1R+DI08NwAm9MAgF/Clcul2fQtoN1tVr1WN8RdNT2hSI4Rmj8AOtajwPuv2qNbNlY56OMk57nXD+0vIvwOVjHgpz03NTgG23E/Y9k44NWqG+UFyDwsJ6HTa7tUS+o19RZu09ssOEKPOLMG9ZaB8jIhMLOthQpUqRIAJ+nxGhhWOkqbgAAAABJRU5ErkJggg==>