import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // ===== I18N HANDLING =====
  
  // Check if request already has locale prefix
  const hasCzPrefix = pathname.startsWith('/cz')
  const hasEnPrefix = pathname.startsWith('/en')
  const hasLocalePrefix = hasCzPrefix || hasEnPrefix
  
  const cleanPathname = hasCzPrefix ? pathname.slice(3) : 
                       hasEnPrefix ? pathname.slice(3) : 
                       pathname
  
  // Get geolocation data from headers (Vercel/Cloudflare provides this)
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') // Cloudflare
  const city = request.headers.get('x-vercel-ip-city') || 
               request.headers.get('cf-ipcity')
  const region = request.headers.get('x-vercel-ip-country-region') ||
                 request.headers.get('cf-region')
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip')
  
  // Czech and Slovak users -> Czech locale
  const czechCountries = ['CZ', 'SK']
  const shouldUseCzechLocale = czechCountries.includes(country || '')
  
  // Auto-redirect non-Czech users to /en if not already there
  if (!hasLocalePrefix && !shouldUseCzechLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    
    // Add geolocation headers for client-side detection
    const response = NextResponse.redirect(url)
    response.headers.set('x-detected-country', country || 'unknown')
    response.headers.set('x-detected-city', city || 'unknown')
    response.headers.set('x-detected-region', region || 'unknown')
    response.headers.set('x-user-ip', ip || 'unknown')
    response.headers.set('x-auto-locale', 'en')
    
    return response
  }
  
  // Auto-redirect Czech/Slovak users to /cz if not already there
  if (!hasLocalePrefix && shouldUseCzechLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/cz${pathname}`
    
    // Add geolocation headers for client-side detection
    const response = NextResponse.redirect(url)
    response.headers.set('x-detected-country', country || 'unknown')
    response.headers.set('x-detected-city', city || 'unknown')
    response.headers.set('x-detected-region', region || 'unknown')
    response.headers.set('x-user-ip', ip || 'unknown')
    response.headers.set('x-auto-locale', 'cs')
    
    return response
  }
  
  // Add geolocation headers to all responses for client-side use
  const geoHeaders = {
    'x-detected-country': country || 'unknown',
    'x-detected-city': city || 'unknown', 
    'x-detected-region': region || 'unknown',
    'x-user-ip': ip || 'unknown',
    'x-auto-locale': shouldUseCzechLocale ? 'cs' : 'en'
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
      const authPath = hasCzPrefix ? '/cz/auth' : 
                      hasEnPrefix ? '/en/auth' : 
                      shouldUseCzechLocale ? '/cz/auth' : '/en/auth'
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
      const dashboardPath = hasCzPrefix ? '/cz/dashboard' : 
                           hasEnPrefix ? '/en/dashboard' : 
                           shouldUseCzechLocale ? '/cz/dashboard' : '/en/dashboard'
      url.pathname = dashboardPath
      return NextResponse.redirect(url)
    }
  }

  // Allow other requests to continue and add geolocation headers
  const response = NextResponse.next()
  
  // Add geolocation headers to all responses
  Object.entries(geoHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
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