import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/util/fetchWithTimeout';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetchWithTimeout(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.NEXT_PUBLIC_MAPS_PLACE_ID}&fields=reviews&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`,
      {
        timeout: 10000, // 10 seconds for Google Maps API
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch reviews from Google Maps:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve reviews' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    // Check if it's a timeout error
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timeout - please try again' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to retrieve reviews' },
      { status: 500 }
    );
  }
}
