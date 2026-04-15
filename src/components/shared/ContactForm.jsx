import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm({ lang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const content = {
    en: {
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Consultancy Enquiry',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we collaborate?',
      buttonText: 'Send Message',
      submittingText: 'Sending...',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for reaching out. I will get back to you shortly.',
      errorTitle: 'Something went wrong',
      errorGeneric: 'Failed to send message. Please try again later.'
    },
    am: {
      nameLabel: 'ስም',
      namePlaceholder: 'አበበ ክበበው',
      emailLabel: 'ኢሜል',
      emailPlaceholder: 'abebe@example.com',
      subjectLabel: 'ርዕስ',
      subjectPlaceholder: 'የምክር አገልግሎት ጥያቄ',
      messageLabel: 'መልዕክት',
      messagePlaceholder: 'እንዴት አብረን ልንሰራ እንችላለን?',
      buttonText: 'መልዕክት ይላኩ',
      submittingText: 'በመላክ ላይ...',
      successTitle: 'መልዕክት ተልኳል!',
      successDesc: 'ስለተገናኙን እናመሰግናለን። በቅርቡ እንመልስለዎታለን።',
      errorTitle: 'ችግር ተፈጥሯል',
      errorGeneric: 'መልዕክት መላክ አልተቻለም። እባክዎ ቆየት ብለው ይሞክሩ።'
    }
  }[lang];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage(lang === 'en' ? 'Please fill out all required fields.' : 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ::');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
      setErrorMessage(content.errorGeneric);
    }
  };

  if (status === 'success') {
    return (
      <div class="bg-emerald-50 border border-emerald-100 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <CheckCircle2 class="w-16 h-16 text-emerald-500 mb-6" />
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{content.successTitle}</h3>
        <p class="text-gray-600 mb-8 max-w-sm">{content.successDesc}</p>
        <button 
          onClick={() => setStatus('idle')}
          class="px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded transition"
        >
          {lang === 'en' ? 'Send another message' : 'ሌላ መልዕክት ይላኩ'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="bg-white p-8 rounded-xl shadow-xl space-y-6 border border-gray-50 h-full relative">
      
      {status === 'error' && (
        <div class="p-4 bg-red-50 text-red-700 flex items-start gap-3 rounded-lg text-sm font-medium">
          <AlertCircle class="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p class="font-bold">{content.errorTitle}</p>
            <p class="opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
            {content.nameLabel} <span class="text-red-400 saturate-200">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            class="w-full px-4 py-3 rounded bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition" 
            placeholder={content.namePlaceholder} 
            disabled={status === 'submitting'}
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
            {content.emailLabel}
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            class="w-full px-4 py-3 rounded bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition" 
            placeholder={content.emailPlaceholder} 
            disabled={status === 'submitting'}
          />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
          {content.subjectLabel} <span class="text-red-400 saturate-200">*</span>
        </label>
        <input 
          type="text" 
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          class="w-full px-4 py-3 rounded bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition" 
          placeholder={content.subjectPlaceholder} 
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
          {content.messageLabel} <span class="text-red-400 saturate-200">*</span>
        </label>
        <textarea 
          rows="5" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          class="w-full px-4 py-3 rounded bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition resize-none" 
          placeholder={content.messagePlaceholder}
          disabled={status === 'submitting'}
        ></textarea>
      </div>
      <button 
        type="submit"
        disabled={status === 'submitting'}
        class="w-full py-4 bg-primary hover:bg-black text-white font-bold rounded shadow-lg transition duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 class="w-5 h-5 animate-spin" />
            {content.submittingText}
          </>
        ) : (
          <>
            <Send class="w-5 h-5" />
            {content.buttonText}
          </>
        )}
      </button>
    </form>
  );
}
