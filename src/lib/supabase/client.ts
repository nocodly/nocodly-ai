import { createClient } from "@supabase/supabase-js";

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

// Backwards-compatible named export used in client components
export const supabase = {
  get auth() { return getSupabaseClient().auth; },
  from: (table: string) => getSupabaseClient().from(table),
} as ReturnType<typeof createClient>;
