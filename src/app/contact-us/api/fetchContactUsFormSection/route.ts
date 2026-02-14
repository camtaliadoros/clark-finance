export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/74?_fields=acf.contact_section_title,acf.book_appointment_label`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}
