import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'
import nextIntlMiddleware from 'next-intl/middleware'

// Define the locales and default locale (must match next-intl config)
const locales = ['en', 'fr', 'ar']
const defaultLocale = 'en'

// Create the next-intl middleware instance
const nextIntlMiddlewareInstance = nextIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

/**
 * Checks if a given pathname is a protected route (account or admin)
 * @param pathname - The request pathname
 * @returns true if the path is under /account or /admin (with optional locale prefix)
 */
function isProtectedPath(pathname: string): boolean {
  return ['/account', '/admin'].some(base => {
    return locales.some(locale => {
      const prefix = locale === defaultLocale ? '' : `/${locale}`
      const fullBase = `${prefix}${base}`
      // Exact match or path starting with the base followed by a slash
      return pathname === fullBase || pathname.startsWith(`${fullBase}/`)
    })
  })
}

/**
 * Checks if a given pathname is an admin route
 * @param pathname - The request pathname
 * @returns true if the path is under /admin (with optional locale prefix)
 */
function isAdminPath(pathname: string): boolean {
  return ['/admin'].some(base => {
    return locales.some(locale => {
      const prefix = locale === defaultLocale ? '' : `/${locale}`
      const fullBase = `${prefix}${base}`
      // Exact match or path starting with the base followed by a slash
      return pathname === fullBase || pathname.startsWith(`${fullBase}/`)
    })
  })
}

/**
 * Gets the user role from the session
 * @param supabase - The Supabase client
 * @returns The user role or null if not available
 */
async function getUserRole(supabase: ReturnType<typeof createMiddlewareClient>): Promise<string | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    // Get the user's profile to check their role
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error('Error fetching profile for role check:', error)
      return null
    }

    return profile?.role ?? null
  } catch (error) {
    console.error('Error in getUserRole:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected (account or admin routes)
  if (isProtectedPath(pathname)) {
    // Create a response object that we'll use to set cookies if needed
    const res = NextResponse.next()

    // Create Supabase client with request and response to handle cookies
    const supabase = createMiddlewareClient(request, res)

    // Get the session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session, redirect to sign-in
    if (!session) {
      const signInUrl = new URL('/auth/sign-in', request.url)
      // Note: We don't persist the original URL in the redirect for simplicity
      // In a production app, you might want to add a redirect parameter
      return NextResponse.redirect(signInUrl)
    }

    // If we have a session, check role-based access
    const userRole = await getUserRole(supabase)

    // Check if user is trying to access admin area without admin role
    if (isAdminPath(pathname) && userRole !== 'admin') {
      // Redirect to appropriate page based on their actual role
      const redirectPath = userRole === 'customer' ? '/account' : '/'
      const redirectUrl = new URL(redirectPath, request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // If we have a session and proper access, allow the request to proceed
    return res
  }

  // For non-protected paths, run the next-intl middleware to handle localization
  return nextIntlMiddlewareInstance(request)
}

// Export the config to match next-intl's requirements
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public image folder)
     * - favicon.ico (favicon file)
     * - *.svg, *.png, *.jpg, *.jpeg, *.gif, *.webp (image files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}