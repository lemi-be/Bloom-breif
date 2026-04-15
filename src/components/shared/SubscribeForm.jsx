import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function SubscribeForm({ lang = 'en' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const labelsMap = {
    en: {
      placeholder: "Your email address",
      button: "Subscribe",
      successHeader: "You're in!",
      successSub: "Intelligence briefing incoming.",
      errorExists: "This email is already on the list.",
      errorGeneric: "Something went wrong. Please try again.",
      signingUp: "Joining..."
    },
    am: {
      placeholder: "የኢሜል አድራሻዎ",
      button: "ይመዝገቡ",
      successHeader: "ተመዝግበዋል!",
      successSub: "ወቅታዊ መረጃዎችን እንልክልዎታለን።",
      errorExists: "ይህ ኢሜይል አስቀድሞ ተመዝግቧል።",
      errorGeneric: "ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።",
      signingUp: "በመመዝገብ ላይ..."
    }
  };

  const labels = labelsMap[lang] || labelsMap.en;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: subError } = await supabase
        .from('subscribers')
        .insert([{ email, source: 'footer_form' }]);

      if (subError) {
        if (subError.code === '23505') {
          setError(labels.errorExists);
        } else {
          setError(labels.errorGeneric);
        }
        return;
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(labels.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl animate-in zoom-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider">{labels.successHeader}</h4>
            <p className="text-blue-200 text-xs font-medium">{labels.successSub}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubscribe} className="flex flex-col space-y-2 group">
        <div className="relative overflow-hidden rounded-lg">
          <input
            type="email"
            required
            placeholder={labels.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full bg-blue-900/50 border border-blue-800 rounded px-4 py-3 text-sm text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-blue-900 transition-all duration-300"
          />
          {loading && (
            <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="relative group bg-accent hover:bg-blue-400 text-white font-black py-3 rounded-lg transition-all duration-500 transform hover:scale-[1.02] text-xs uppercase tracking-widest overflow-hidden disabled:opacity-50"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 transition-transform -translate-x-full group-hover:translate-x-[200%] skew-x-[-20deg] duration-1000"></div>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? labels.signingUp : labels.button}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </form>
      
      {error && (
        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 text-[10px] text-blue-400 font-medium opacity-50 group-hover:opacity-100 transition-opacity">
        <Sparkles className="w-3 h-3" />
        <span>Join 2,400+ horticultural professionals.</span>
      </div>
    </div>
  );
}
