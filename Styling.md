# **Styling & Design System**

This document outlines the design decisions, CSS variables, and layout systems for the Ethiopian Horticulture Platform. It is strictly aligned with the "Everest/G14 Professional" theme requirements defined in the SRS and Project Specification.

## **1\. Typography & Script Handling**

The platform employs a dual-script typography system to ensure professional authority across both English and Amharic content.

### **Latin Script (English)**

* **Primary Headings**: [Montserrat](https://fonts.google.com/specimen/Montserrat)  
  * **Style**: ExtraBold (700-800).  
  * **Usage**: H1, H2, H3, and Page Titles.  
  * **Purpose**: To convey a corporate, authoritative, and trustworthy consultant persona.  
* **Body & Interface**: [Inter](https://fonts.google.com/specimen/Inter)  
  * **Style**: Regular (400).  
  * **Usage**: Standard paragraphs, metadata, and navigation links.

### **Ethiopic Script (Amharic)**

* **Global Amharic Font**: [Noto Sans Ethiopic](https://fonts.google.com/specimen/Noto+Sans+Ethiopic)  
  * **Usage**: Applied to all \[lang="am"\] elements.  
  * **Readability Note**: Line-height is increased by 10% specifically for Ethiopic characters to accommodate vertical diacritics.

### **CSS Variables**

:root {  
    \--font-heading: 'Montserrat', sans-serif;  
    \--font-body: 'Inter', sans-serif;  
    \--font-amharic: 'Noto Sans Ethiopic', sans-serif;  
      
    \--weight-heading: 700;  
    \--weight-body: 400;  
      
    /\* Specific scaling for readability \*/  
    \--leading-standard: 1.6;  
    \--leading-ethiopic: 1.8;  
}

## **2\. Color Palette (Everest/G14 Theme)**

The palette is designed to reflect the commercial flower and horticulture industry while maintaining a high-end corporate feel.

| Variable | Name | Hex Code | Usage |
| :---- | :---- | :---- | :---- |
| \--color-primary | Deep Corporate Blue | \#003366 | Top Bar, Headers, Footers, Primary Buttons. |
| \--color-accent | Sky Blue | \#00A8E8 | Icons, Hover states, Links, Search highlights. |
| \--color-brand | Botanical Green | \#1B4332 | Horticulture specific badges, "Success" states. |
| \--color-highlight | Vibrant Gold | \#FFB703 | Secondary CTAs, Important alerts, Starred items. |
| \--color-bg-main | Pure White | \#FFFFFF | Primary content backgrounds. |
| \--color-bg-alt | Cool Ice Gray | \#F4F7F9 | Alternating section stripes, Sidebar widgets. |
| \--color-text | Midnight Charcoal | \#111827 | Primary headings and text. |
| \--color-text-muted | Slate Gray | \#4B5563 | Excerpts, dates, and secondary labels. |

## **3\. Core Layout Components**

### **A. The Top Bar (SRS R4.1.1 Alignment)**

A persistent thin bar positioned above the main navigation.

* **Background**: \--color-primary.  
* **Content**: White text contact details (Left) and Social Media Icons (Right).  
* **Behavior**: Remains visible on mobile but may hide on scroll depending on UX testing.

### **B. Header & Navigation**

* **Style**: Solid white background with a subtle border-bottom.  
* **Logo**: High-contrast brand logo on the left.  
* **Toggles**: Prominent Language Toggle (EN/AM) and Search Icon (triggers bilingual modal).

### **C. Hero Section (Project Spec Alignment)**

* **Visual**: Authentic Ethiopian farm imagery with a professional dark overlay.  
* **Box**: White semi-transparent or solid box containing centered H1 and dual square-edged CTA buttons.

### **D. Pillar Cards (The Four Pillars)**

* **Grid**: 4-column layout on desktop, 1-column on mobile.  
* **Style**: White "Boxed" layout with a top-border of 4px in \--color-primary.  
* **Icons**: Centered SVG icons in \--color-accent.

## **4\. Grid & Responsiveness**

The platform uses a mobile-first Tailwind-based grid system.

* **Max Width**: 1280px (max-w-7xl).  
* **Desktop Layout**:  
  * Articles/Blog: 75% Content / 25% Sidebar.  
  * Research Hub: Full-width 3-column grid.  
* **Mobile Adaptations**:  
  * Padding: Reduced to 1rem (16px) to maximize screen real estate.  
  * Touch Targets: All interactive elements (Search, Toggle, Buttons) maintain a minimum of 44x44px.

## **5\. Media & Asset Standards**

* **Aspect Ratios**: Article thumbnails enforced at 4:3. Hero images at 21:9.  
* **Optimization**: Handled via Imagekit.io; CSS utilizes aspect-ratio to prevent Layout Shift (CLS).  
* **Authenticity**: CSS filters (grayscale/sepia) are forbidden to preserve the natural colors of the horticulture imagery.

## **6\. Admin Interface (Lexical Integration)**

* **Editor Environment**: A clean, distraction-free "Paper" layout (max-w-4xl).  
* **Bilingual View**: Side-by-side Lexical instances on desktop for simultaneous Amharic/English entry.  
* **Typography**: Matches public site to ensure "What You See Is What You Get" (WYSIWYG) for script-specific line heights.