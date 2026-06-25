import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

/**
 * Creates a Supabase admin client using the service role key
 * This client bypasses Row Level Security (RLS) and should only be used
 * in secure server environments (like server actions or API routes)
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}