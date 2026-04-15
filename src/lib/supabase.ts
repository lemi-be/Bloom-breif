import { createBrowserClient } from '@supabase/ssr';

// Supabase credentials will be populated from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://pszozolmrnqnpvcfkbny.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd';

export const supabase = createBrowserClient(supabaseUrl, supabaseKey, {
  cookies: {
    get(key) {
      if (typeof document === 'undefined') return '';
      const cookie = document.cookie.split('; ').find((row) => row.startsWith(`${key}=`));
      return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
    },
    set(key, value, options) {
      if (typeof document === 'undefined') return;
      let cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${options?.maxAge || 60 * 60 * 24 * 7}`;
      if (options?.domain) cookie += `; domain=${options.domain}`;
      if (options?.secure) cookie += '; secure';
      document.cookie = cookie;
    },
    remove(key, options) {
      if (typeof document === 'undefined') return;
      document.cookie = `${key}=; path=/; max-age=0`;
    },
  },
});



