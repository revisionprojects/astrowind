import { Resend } from 'resend';

const resend = new Resend('re_AxoHCKaY_Fgj5Gzh3iTEyPX6o921GjK3v');

export const post = async ({ request }) => {
  const body = await request.json();
  const { name, email, message } = body;

  try {
    const data = await resend.emails.send({
      from: 'Your Name <onboarding@resend.dev>',
      to: ['your-email@example.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
