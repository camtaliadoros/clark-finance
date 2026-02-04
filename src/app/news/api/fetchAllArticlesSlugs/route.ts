import { NextResponse } from 'next/server';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/article?_fields=slug`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch article slugs from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve article slugs' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving article slugs:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve article slugs' },
      { status: 500 }
    );
  }
}
