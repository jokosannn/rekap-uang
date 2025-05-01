// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

// Middleware dijalankan untuk setiap request
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Contoh: redirect jika belum login
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  if (!token && !pathname.startsWith('/sign-in')) {
    const url = new URL('/sign-in', req.url)
    url.searchParams.set('callbackUrl', encodeURI(req.url))
    return NextResponse.redirect(url)
  }

  if (token && pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/sign-in', '/dashboard/:path*']
}
