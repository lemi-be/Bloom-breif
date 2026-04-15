import type { BlogPost } from '../types/database';
import { supabase } from './supabase';

export async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('draft', false)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data as BlogPost[];
}

export async function getAdminPosts(client = supabase): Promise<BlogPost[]> {
  const { data, error } = await client
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin posts:', error);
    return [];
  }

  return data as BlogPost[];
}

export async function getResearchPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_research', true)
    .eq('draft', false)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching research posts:', error);
    return [];
  }

  return data as BlogPost[];
}

export async function getAdminResearchPosts(client = supabase): Promise<BlogPost[]> {
  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('is_research', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin research posts:', error);
    return [];
  }

  return data as BlogPost[];
}

export async function getSubscribers(client = supabase) {
  const { data, error } = await client
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }

  return data;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching post by slug:', error);
    }
    return null;
  }

  return data as BlogPost;
}

export async function upsertPost(post: Partial<BlogPost>): Promise<{ data: BlogPost | null; error: any }> {
  const { data, error } = await supabase
    .from('posts')
    .upsert({
      ...post,
      published_at: post.published_at || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting post:', error);
  }

  return { data: data as BlogPost | null, error };
}

export async function getSiteContent(id: string = 'about_page'): Promise<any | null> {
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching site content for ${id}:`, error);
    return null;
  }
  return data?.content;
}

export async function updateSiteContent(id: string, content: any): Promise<{ error: any }> {
  const { error } = await supabase
    .from('site_content')
    .upsert({
      id,
      content,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error(`Error updating site content for ${id}:`, error);
  }
  return { error };
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error logging out:', error);
  window.location.href = '/login';
}

export async function deleteAccountData(userId: string, email: string) {
  try {
    if (email) {
      await supabase.from('subscribers').delete().eq('email', email);
    }
    if (userId) {
      await supabase.from('profiles').delete().eq('id', userId);
    }
    // Delete local session
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    console.error('Error deleting account data:', err);
    return { success: false, error: err };
  }
}
