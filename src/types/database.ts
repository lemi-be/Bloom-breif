export interface BlogPost {
  id: string;                  // UUID
  slug: string;                // URL-friendly identifier
  title_en: string;            // English Title
  title_am: string;            // Amharic Title
  content_en: any;             // Lexical Editor state (English)
  content_am: any;             // Lexical Editor state (Amharic)
  description_en: string;      // Short summary for SEO/listing (English)
  description_am: string;      // Short summary for SEO/listing (Amharic)
  cover_image: string;         // Imagekit.io URL for post thumbnail
  is_research: boolean;        // Toggles display on the /research hub
  subscribers_only: boolean;   // If true, full content is gated behind login
  external_url?: string;       // Optional link to previously published works
  published_at: Date;          // Publication timestamp
  draft: boolean;              // Prevents display on public routes
}
