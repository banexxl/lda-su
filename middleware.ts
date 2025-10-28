import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Global middleware placeholder: extend with auth, redirects, headers, etc.
export function middleware(_req: NextRequest) {
  // Currently a no-op pass-through. Add logic as needed.
  return NextResponse.next();
}

// Exclude static assets and favicon so middleware runs only on real routes
export const config = {
  matcher: [
    // Skip Next.js internals and any file with an extension (e.g., .ico, .png, .js)
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\..*).*)',
  ],
};

