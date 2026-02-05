import { NextRequest, NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Get the origin from the request to allow CORS for same-origin and trusted domains
  const origin = req.headers.get('origin');
  
  // Check if origin is allowed (for CORS)
  // Allow same origin, production domain, and Netlify preview domains
  const isAllowedOrigin = origin && (
    origin === 'https://clarkfinance.co.uk' ||
    origin.endsWith('.netlify.app')
  );
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?per_page=30&_fields=slug,id,acf.menu_location,acf.menu_position,acf.service_card.homepage_order,acf.page_title,parent`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch pages from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve pages' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    
    // Set CORS headers if needed (for cross-origin requests)
    const headers: HeadersInit = {
      'Cache-Control': cacheStrategies.navigation(),
    };
    
    if (isAllowedOrigin && origin) {
      headers['Access-Control-Allow-Origin'] = origin;
      headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type';
    }
    
    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error retrieving pages:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve pages' },
      { status: 500 }
    );
  }
}
