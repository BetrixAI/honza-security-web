import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // ===== I18N HANDLING =====
  
  // Check if request already has locale prefix
  const hasLocalePrefix = pathname.startsWith('/cz')
  const cleanPathname = hasLocalePrefix ? pathname.slice(3) : pathname
  
  // Get country from headers (Vercel provides this automatically)
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') // Cloudflare
  
  // Auto-redirect Czech users to /cz if not already there
  if (!hasLocalePrefix && country === 'CZ') {
    const url = request.nextUrl.clone()
    url.pathname = `/cz${pathname}`
    return NextResponse.redirect(url)
  }
  
  // ===== AUTHENTICATION =====
  
  // Protected paths (without locale prefix)
  const protectedPaths = ['/dashboard']
  
  // Check if path is protected
  const isProtectedPath = protectedPaths.some(path => cleanPathname.startsWith(path))
  
  if (isProtectedPath) {
    // Get auth token from cookies
    const authToken = request.cookies.get('firebase-auth-token')
    
    if (!authToken?.value) {
      // Redirect to auth with proper locale
      const url = request.nextUrl.clone()
      const authPath = hasLocalePrefix ? '/cz/auth' : '/auth'
      url.pathname = authPath
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    
    // TODO: Add server-side token verification here
    // For basic protection, checking token existence is sufficient
  }
  
  // Redirect from /auth to /dashboard if user is authenticated
  if (cleanPathname === '/auth') {
    const authToken = request.cookies.get('firebase-auth-token')
    
    if (authToken?.value) {
      const url = request.nextUrl.clone()
      const dashboardPath = hasLocalePrefix ? '/cz/dashboard' : '/dashboard'
      url.pathname = dashboardPath
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}