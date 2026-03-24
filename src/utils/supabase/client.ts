import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!supabaseUrl || !supabaseAnonKey || !/^https?:\/\/.+/.test(supabaseUrl)) {
    const context = typeof window !== 'undefined' ? window.location.hostname : 'SERVER'
    console.error(`CRITICAL [${context}]: Supabase environment variables are missing or invalid.`)
    console.warn('LOCAL: Restart your terminal and check .env.local')
    console.warn('VERCEL: Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Project Settings')
    
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder'
    )
  }

  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
