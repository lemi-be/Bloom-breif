import React, { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent } from '../../lib/dataService';
import { Loader2, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsEditor() {
  const [content, setContent] = useState({
    introText_en: '',
    introText_am: ''
  });
  const [status, setStatus] = useState('loading'); // loading, idle, saving, success, error
  
  useEffect(() => {
    let mounted = true;
    async function fetchContent() {
      const data = await getSiteContent('about_page');
      if (mounted) {
        if (data) {
          setContent(data);
        }
        setStatus('idle');
      }
    }
    fetchContent();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setStatus('saving');
    const { error } = await updateSiteContent('about_page', content);
    
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="admin-card max-w-4xl">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-gray-900">About Page Content</h2>
          <p className="text-sm text-gray-500 mt-1">Update the introductory biography text displayed on the public About page.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={status === 'saving'}
          className="bg-primary hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold shadow transition flex items-center gap-2 disabled:opacity-50"
        >
          {status === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 flex items-center gap-3 rounded-lg text-sm font-medium border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Live site updated successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 flex items-center gap-3 rounded-lg text-sm font-medium border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          Failed to save changes. Please try again.
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center justify-between">
            English Introduction
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-mono">introText_en</span>
          </label>
          <textarea
            name="introText_en"
            value={content.introText_en || ''}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition resize-y font-sans leading-relaxed"
            placeholder="English biography text..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center justify-between">
            Amharic Introduction
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-mono">introText_am</span>
          </label>
          <textarea
            name="introText_am"
            value={content.introText_am || ''}
            onChange={handleChange}
            rows="6"
            dir="auto"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition resize-y font-sans leading-relaxed text-lg"
            placeholder="Amharic biography text..."
          />
        </div>
      </div>
    </div>
  );
}
