# **Project Idea: Ethiopian Horticulture Platform**

I want to build a high-performance, bilingual (Amharic/English) digital platform that serves as a professional authority and consultancy hub for the Ethiopian commercial flower and horticulture sector.

## **Features**

### **Bilingual Content Management**

The platform must support English and Amharic natively. It is not just about translation; it is about providing a professional stage for the author's research and reports in the scripts used by both international stakeholders and local industry leaders.

### **Research & Technical Hub**

A dedicated section for high-level research papers, market analyses, and reports on Good Agricultural Practices (GAP). This content is distinguished from regular blog posts by a specific is\_research flag and an academic-style UI.

### **Professional Consultancy Portal**

The site acts as a portfolio for the author's consultancy services. It includes a structured "About" section that details specific professional expertise, advocacy roles, and a secure contact channel for potential clients.

### **Custom Lexical Editor**

A specialized administrative backend. Instead of using standard Markdown, the author uses a React-based Lexical editor that supports complex formatting and a side-by-side bilingual writing workflow.

### **Real-Time Bilingual Search**

A client-side search feature that allows users to find information across both languages simultaneously, with debounced input to maintain high performance.

## **UI / User Journey**

The user journey follows the "Everest/G14" professional aesthetic:

* **Arrival**: The user lands on a structured "Boxed" layout with a prominent Top Bar showing contact info and social links (LinkedIn, Telegram).  
* **Navigation**: A high-contrast header allows the user to switch between English and Amharic instantly. The typography shifts from Montserrat (Latin) to Noto Sans Ethiopic seamlessly.  
* **Engagement**:  
  * The homepage features "The Four Pillars": Promotion, Research, Consultancy, and Advocacy.  
  * Users can browse the latest industry news in the Articles feed or dive into technical data in the Research Hub.  
* **Conversion**: A persistent newsletter ribbon and a detailed consultancy contact form encourage professional networking.

## **Admin Experience**

* **Secure Login**: Access via Supabase Auth with MFA.  
* **Bilingual Composition**: The author writes in two parallel Lexical editor instances (EN/AM) to ensure content parity.  
* **Media Workflow**: Images are uploaded directly to Imagekit.io and managed through a central media dashboard.

## **Implementation**

* **Framework**: Astro 4.x (Hybrid Rendering).  
* **Styling**: Tailwind CSS \+ "Everest" Theme (Deep Blue \#003366, Sky Blue \#00A8E8).  
* **Database**: Supabase (PostgreSQL) for structured content storage.  
* **Editor**: React-based Lexical Island.  
* **Infrastructure**: Imagekit.io for real-time image optimization; Vercel/GitHub Actions for deployment.