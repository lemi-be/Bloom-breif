import React from 'react';
import type { BlogPost } from '../../types/database';
import { getOptimizedUrl } from '../../lib/imagekit';

interface Props {
  post: BlogPost;
  lang: string;
}

const ResearchCard: React.FC<Props> = ({ post, lang }) => {
  const title = lang === 'en' ? post.title_en : post.title_am;
  const description = lang === 'en' ? post.description_en : post.description_am;
  const imageUrl = post.cover_image || 'default.jpg';

  // We use the isomorphic utility to get the optimized ImageKit URL
  const optimizedUrl = getOptimizedUrl(imageUrl, {
    width: 600,
    height: 450, // 4:3 aspect ratio
    quality: 80,
    focus: 'auto',
    format: 'auto'
  });

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border-t-4 border-brand transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col h-full">
      <a href={`/${lang}/articles/${post.slug}/`} className="block aspect-[4/3] overflow-hidden bg-gray-200">
        <img 
          src={optimizedUrl} 
          alt={title} 
          loading="lazy" 
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </a>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 leading-tight">
          <a href={`/${lang}/articles/${post.slug}/`} className="hover:text-primary transition">{title}</a>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto">
          <a href={`/${lang}/articles/${post.slug}/`} className="inline-flex items-center text-sm font-semibold text-accent hover:text-primary transition">
            {lang === 'en' ? 'Read Technical Report' : 'ቴክኒካዊ ሪፖርቱን ያንብቡ'} 
            <svg className={`ml-1 w-4 h-4 ${lang === 'am' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ResearchCard;
