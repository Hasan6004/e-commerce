// lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // ✅ Service role, not anon key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false, // No session needed for service role
    },
  },
);
