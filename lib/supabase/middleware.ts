import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { Database } from '@/types/database'

/**
 * Creates a Supabase client for use in middleware
 * @param request - The incoming request (to extract cookies)
 * @param response - The outgoing response (to set cookies)
 */
export function createMiddlewareClient(
  request: Request,
  response: Response
) {
  // In a real implementation, you would extract cookies from request headers
  // and set them in response headers. For now, we'll use a simplified version
  // that relies on the cookie store being available in the middleware context.

  // This is a simplified version - in practice, you'd need to handle cookies properly
  // based on the request/response objects
  const cookieStore = {
    get(name: string) {
      // Get cookie from request headers
      const cookieHeader = request.headers.get('cookie')
      if (!cookieHeader) return undefined

      const match = cookieHeader.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
      )
      return match ? decodeURIComponent(match[1]) : undefined
    },
    set(name: string, value: string, options: CookieOptions) {
      // Set cookie in response headers
      let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

      if (options.maxAge) {
        cookie += `; Max-Age=${options.maxAge}`
      }
      if (options.expires) {
        cookie += `; Expires=${options.expires.toUTCString()}`
      }
      if options.domain {
        cookie += `; Domain=${options.domain}`
      }
      if options.path {
        cookie += `; Path=${options.path}`
      }
      if options.secure {
        cookie += '; Secure'
      }
      if options.httpOnly {
        cookie += '; HttpOnly'
      }
      if options.sameSite {
        cookie += `; SameSite=${options.sameSite}`
      }

      // In a real middleware, you'd add this to response headers
      // For now, we're just showing the logic
      response.headers.append('Set-Cookie', cookie)
    },
    remove(name: string, options: CookieOptions) {
      // Remove cookie by setting expiration in the past
      this.set(name, '', {
        ...options,
        maxAge: 0,
      })
    },
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieStore,
    }
  )
}