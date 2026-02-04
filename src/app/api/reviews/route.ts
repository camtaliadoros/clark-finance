import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.NEXT_PUBLIC_MAPS_PLACE_ID}&fields=reviews&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`
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
    return NextResponse.json(
      { error: 'Failed to retrieve reviews' },
      { status: 500 }
    );
  }
}
