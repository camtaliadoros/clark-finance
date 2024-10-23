import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message, token } =
    await req.json();

  // Verify the reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  const recaptchaData = await recaptchaResponse.json();

  if (recaptchaData.success && recaptchaData.score > 0.5) {
    // Token is valid, process the form (e.g., send an email)
    return NextResponse.json({ message: 'reCAPTCHA successful' });
  } else {
    return NextResponse.json({ error: 'reCAPTCHA failed' });
  }
}

async function updateEnv(key: string, value: string) {
  const envPath = './.env'; // Path to your .env file
  const data = await fs.readFile(envPath, 'utf8');

  // Update the value for the given key
  const newData = data.replace(
    new RegExp(`^${key}=.*`, 'm'),
    `${key}=${value}`
  );

  // Write the updated content back to .env
  await fs.writeFile(envPath, newData, 'utf8');
}
