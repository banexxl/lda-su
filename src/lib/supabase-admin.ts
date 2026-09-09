import { createClient } from '@supabase/supabase-js';

// Service-role key — only ever import this from server-side code (route handlers,
// server components/services), never from a 'use client' file.
export const supabaseAdmin = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SECRET_KEY!
);
