import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('middleware');
  return;
}

export const config = {
  matcher: ['/api/auth/signup'],
};
