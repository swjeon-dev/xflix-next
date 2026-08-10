import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/application/api/supabase'

// export const PROTECTED_PATHS = ['/mypage']

// function isProtectedPath(pathname: string) {
//   return pathname === '/mypage' || pathname.startsWith('/mypage/')
// }

export async function proxy(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request)
  const { pathname } = request.nextUrl

  console.log('proxy', request.cookies)
  // if (!user && isProtectedPath(pathname)) {
  if (!user) {
    const url = new URL('/login-required', request.url)
    url.searchParams.set('next', `${pathname}${request.nextUrl.search}`)

    const redirectResponse = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
      redirectResponse.cookies.set(name, value, options)
    })
    return redirectResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/mypage'],
}
