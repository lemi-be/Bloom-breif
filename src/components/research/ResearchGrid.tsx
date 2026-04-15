import React, { useState } from 'react';
import type { BlogPost } from '../../types/database';
import ResearchCard from './ResearchCard';

interface Props {
  posts: BlogPost[];
  lang: string;
}

const CATEGORIES = [
  { id: 'all', en: 'All Research', am: 'ሁሉም ጥናቶች' },
  { id: 'logistics', en: 'Logistics', am: 'ሎጂስቲክስ' },
  { id: 'market', en: 'Market Trends', am: 'የገበያ አዝማሚያዎች' },
  { id: 'gap', en: 'GAP (Agriculture)', am: 'ጥሩ የግብርና አሰራር' },
  { id: 'sustainability', en: 'Sustainability', am: 'ዘላቂነት' },
];

const ResearchGrid: React.FC<Props> = ({ posts, lang }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // For this demo, we'll simulate category matching since the DB might not have many categories yet
  // In a real app, this would check a 'category' or 'tags' field
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => {
        const slug = post.slug.toLowerCase();
        // Simple keyword check for demonstration purposes
        if (activeCategory === 'logistics' && (slug.includes('logistics') || slug.includes('market'))) return true;
        if (activeCategory === 'sustainability' && slug.includes('sustainable')) return true;
        return false;
      });

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 pb-8 border-b border-gray-100">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
              activeCategory === cat.id 
                ? 'bg-primary border-primary text-white shadow-lg' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
            }`}
          >
            {lang === 'en' ? cat.en : cat.am}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <ResearchCard key={post.id} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium italic">
            {lang === 'en' 
              ? "No technical reports found in this category yet." 
              : "በዚህ ምድብ ውስጥ እስካሁን ምንም ቴክኒካዊ ሪፖርቶች አልተገኙም።"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResearchGrid;
