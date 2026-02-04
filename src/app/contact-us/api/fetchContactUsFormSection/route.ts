import { NextResponse } from 'next/server';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/74?_fields=acf.contact_section_title,acf.book_appointment_label`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch contact form section from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve contact form section' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving contact form section:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contact form section' },
      { status: 500 }
    );
  }
}
