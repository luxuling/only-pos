import type { SupabaseClient } from '@supabase/supabase-js';

export const signInWithGoogle = (supabase: SupabaseClient) => {
  supabase.auth.signInWithOAuth({
    provider: 'google',
  });
};
