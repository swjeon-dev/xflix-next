import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/shared/api/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')
  const oauthError = searchParams.get('error')

  if (oauthError) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(origin)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
