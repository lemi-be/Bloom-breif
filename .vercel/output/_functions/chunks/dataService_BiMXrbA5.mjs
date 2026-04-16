import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = "https://pszozolmrnqnpvcfkbny.supabase.co";
const supabaseKey = "sb_publishable_PFDvopQ2KHVm5e9xCiUZCg_7euujotd";
const supabase = createBrowserClient(supabaseUrl, supabaseKey, {
  cookies: {
    get(key) {
      if (typeof document === "undefined") return "";
      const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${key}=`));
      return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
    },
    set(key, value, options) {
      if (typeof document === "undefined") return;
      let cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${options?.maxAge || 60 * 60 * 24 * 7}`;
      if (options?.domain) cookie += `; domain=${options.domain}`;
      if (options?.secure) cookie += "; secure";
      document.cookie = cookie;
    },
    remove(key, options) {
      if (typeof document === "undefined") return;
      document.cookie = `${key}=; path=/; max-age=0`;
    }
  }
});

async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*").eq("draft", false).order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data;
}
async function getAdminPosts(client = supabase) {
  const { data, error } = await client.from("posts").select("*").order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching admin posts:", error);
    return [];
  }
  return data;
}
async function getAdminResearchPosts(client = supabase) {
  const { data, error } = await client.from("posts").select("*").eq("is_research", true).order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching admin research posts:", error);
    return [];
  }
  return data;
}
async function getSubscribers(client = supabase) {
  const { data, error } = await client.from("subscribers").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
  return data;
}
async function getPostBySlug(slug) {
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error fetching post by slug:", error);
    }
    return null;
  }
  return data;
}
async function getUserProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  return data;
}

export { getAdminResearchPosts as a, getSubscribers as b, getUserProfile as c, getPostBySlug as d, getPosts as e, getAdminPosts as g, supabase as s };
