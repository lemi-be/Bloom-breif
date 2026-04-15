import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, FileText, Loader2, Command } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SearchModal({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Shortcut key listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Fetch posts when modal opens
  useEffect(() => {
    let active = true;
    if (isOpen && posts.length === 0) {
      const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('id, slug, title_en, title_am, is_research, published_at')
          .eq('draft', false)
          .order('published_at', { ascending: false });

        if (!error && data && active) {
          setPosts(data);
        }
        if (active) setLoading(false);
      };
      fetchPosts();
    }
    
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
    
    return () => { active = false; };
  }, [isOpen]); // We intentionaly only retrigger when isOpen changes to avoid excessive fetches.

  // Fuzzy Search Logic
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    return posts.filter((post) => {
      const titleEn = (post.title_en || '').toLowerCase();
      const titleAm = (post.title_am || '').toLowerCase();
      // Returns true if query matches English OR Amharic title
      return titleEn.includes(lowerQuery) || titleAm.includes(lowerQuery);
    }).slice(0, 8); // Limit to top 8
  }, [query, posts]);

  // Keyboard navigation within the modal
  const handleModalKeyDown = (e) => {
    if (!filteredPosts.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredPosts.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredPosts[selectedIndex];
      if (selected) navigateToPost(selected);
    }
  };

  const navigateToPost = (post) => {
    const route = post.is_research ? 'research' : 'articles';
    window.location.href = `/${lang}/${route}/${post.slug}`;
  };

  // Close when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-slate-500 hover:text-primary transition flex items-center gap-2" 
        aria-label="Search"
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden lg:flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs font-bold font-sans text-slate-500">
          <Command className="w-3 h-3" /> K
        </span>
      </button>

      {isOpen && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pb-4"
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onKeyDown={handleModalKeyDown}
          >
            {/* Search Input Box */}
            <div className="flex items-center px-4 py-4 border-b border-slate-100">
              <Search className="w-6 h-6 text-emerald-600 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={lang === 'en' ? 'Search articles and research...' : 'ጽሑፎችን እና ጥናቶችን ይፈልጉ...'}
                className="flex-1 bg-transparent text-lg font-medium text-slate-800 placeholder-slate-400 outline-none"
              />
              {loading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin ml-2 shrink-0" />}
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-2 p-1.5 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Results Area */}
            {query.trim() && (
              <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto p-2">
                {filteredPosts.length > 0 ? (
                  <ul className="space-y-1">
                    {filteredPosts.map((post, index) => {
                      const isSelected = index === selectedIndex;
                      const title = lang === 'en' ? (post.title_en || post.title_am) : (post.title_am || post.title_en);
                      const badge = post.is_research 
                        ? (lang === 'en' ? 'Research' : 'ጥናት') 
                        : (lang === 'en' ? 'Article' : 'ጽሑፍ');
                        
                      return (
                        <li key={post.id}>
                          <button
                            onClick={() => navigateToPost(post)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                              isSelected ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <FileText className={`w-5 h-5 shrink-0 ${isSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
                              <span className={`truncate font-medium ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>
                                {title}
                              </span>
                            </div>
                            <span className="ml-4 shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-500 rounded-lg">
                              {badge}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <p className="text-slate-500 font-medium">
                      {lang === 'en' ? 'No results found for' : 'ምንም ውጤት አልተገኘም'} <span className="font-bold text-slate-800">"{query}"</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1"><kbd className="bg-white px-2 rounded border border-slate-200">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-white px-2 rounded border border-slate-200">Enter</kbd> to select</span>
                <span className="flex items-center gap-1"><kbd className="bg-white px-2 rounded border border-slate-200">Esc</kbd> to close</span>
              </div>
              <span className="text-xs font-bold text-slate-300 ml-auto">BLOOM BRIEF</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
