import { createClient } from '@supabase/supabase-js';

// Use placeholder values if env vars are not set (for build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our content
export type Category =
  | '15th century poetry'
  | '1600s history'
  | 'tech news'
  | 'short stories'
  | 'philosophy'
  | 'science';

export interface ContentItem {
  id: string;
  category: Category;
  title: string;
  preview: string;
  fullContent: string;
  created_at?: string;
}

export interface UserProgress {
  id?: string;
  selectedInterests: Category[];
  onboardingCompleted: boolean;
  currentIndex: number;
  viewedContent: string[];
}
