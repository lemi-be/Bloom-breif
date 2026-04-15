import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const IMAGEKIT_ENDPOINT = import.meta.env.PUBLIC_IMAGEKIT_URL_ENDPOINT || '';

/**
 * Generates an optimized ImageKit URL using transformation parameters.
 * Follows the SRS non-functional requirement for image optimization:
 * - WebP/AVIF format auto-selection
 * - Responsive width
 * - Quality optimization
 * - Lazy loading (applied at the HTML level)
 */
export function getOptimizedImageUrl(path, options = {}) {
  const {
    width = 1200,
    quality = 80,
    format = 'auto',
    focus = 'auto',
  } = options;

  const base = IMAGEKIT_ENDPOINT.endsWith('/') ? IMAGEKIT_ENDPOINT : `${IMAGEKIT_ENDPOINT}/`;
  const tr = `tr:w-${width},q-${quality},f-${format},fo-${focus}`;

  // If path is already a full ImageKit URL, inject transformations
  if (path.includes('ik.imagekit.io')) {
    const url = new URL(path);
    const pathParts = url.pathname.split('/');
    // Insert transformation after the account ID segment
    const insertAt = 2; // /accountId/tr:.../filename
    pathParts.splice(insertAt, 0, tr);
    url.pathname = pathParts.join('/');
    return url.toString();
  }
  
  // If we have a full Supabase URL, let the web proxy handle it or just use the URL
  // For standard ImageKit web proxy integration, usually it's base + tr + / + url
  if (path.startsWith('http')) {
    return `${base}${tr}/${path}`;
  }

  // Clean relative path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${tr}/${cleanPath}`;
}

export default function ImageUploadModal({ onInsert, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const uploadToImageKit = useCallback(async (file) => {
    setUploading(true);
    setError('');

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed.');
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Image must be smaller than 10MB.');
      }

      // Step 1: Securely fetch ImageKit upload signature from Supabase Edge Function
      const { data: authData, error: authError } = await supabase.functions.invoke('imagekit-auth', {
        method: 'POST'
      });

      if (authError || !authData) {
        throw new Error('Failed to fetch upload signature. Are you an admin?');
      }

      const { token, expire, signature } = authData;

      // Step 2: Upload directly to ImageKit's network, bypassing Supabase storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', `bloom-brief-${Date.now()}-${file.name.replace(/\s+/g, '-')}`);
      formData.append('publicKey', import.meta.env.PUBLIC_IMAGEKIT_PUBLIC_KEY);
      formData.append('signature', signature);
      formData.append('expire', expire);
      formData.append('token', token);
      formData.append('useUniqueFileName', 'true');

      const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      const optimizedUrl = getOptimizedImageUrl(data.url);
      
      setUploadedUrl(optimizedUrl);
      setPreview(data.url); // raw URL for preview
      setFileName(file.name);
    } catch (err) {
      setError(err.message || 'Upload failed. Check your ImageKit settings.');
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadToImageKit(file);
  }, [uploadToImageKit]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) uploadToImageKit(file);
  }, [uploadToImageKit]);

  const handleInsert = () => {
    if (!uploadedUrl) return;
    onInsert({ src: uploadedUrl, altText: altText.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Image</h2>
              <p className="text-xs text-slate-400">Optimized via ImageKit.io · WebP · Auto-resize</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Drop Zone */}
          {!uploadedUrl && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-emerald-400 bg-emerald-50 scale-[1.01]'
                  : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
                  <p className="text-sm font-semibold text-slate-600">Uploading to ImageKit...</p>
                  <p className="text-xs text-slate-400">Optimizing with WebP & auto-compression</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Upload className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Drop image here or click to browse</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP, AVIF · Max 10MB</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-700">Upload Failed</p>
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
                {error.includes('ImageKit') && (
                  <p className="text-xs text-red-400 mt-1">
                    Tip: Enable "Unsigned uploads" in your{' '}
                    <a href="https://imagekit.io/dashboard/settings/security" target="_blank" rel="noopener noreferrer" className="underline">
                      ImageKit Security settings
                    </a>{' '}
                    and set your PUBLIC_IMAGEKIT_PUBLIC_KEY in .env
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Preview */}
          {uploadedUrl && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                    <Check className="h-3 w-3" /> Uploaded
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Alt Text (Accessibility & SEO)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image for screen readers..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                  autoFocus
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Optimized URL</p>
                <p className="text-xs text-slate-500 font-mono break-all truncate">{uploadedUrl}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!uploadedUrl}
              className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition flex items-center justify-center gap-2 ${
                uploadedUrl
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Insert into Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
