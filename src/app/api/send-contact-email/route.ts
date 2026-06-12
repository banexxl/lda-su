import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimiter } from 'src/utils/rate-limiter';

const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_SERVER_HOST,
     port: Number(process.env.EMAIL_SERVER_PORT),
     secure: true,
     auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
     },
});

export async function POST(request: Request) {
     const ip =
          request.headers.get('x-forwarded-for')?.split(',')[0] ??
          '127.0.0.1';

     const { success } = await rateLimiter.limit(ip);

     if (!success) {
          return NextResponse.json(
               { message: 'Too many requests' },
               { status: 429 }
          );
     }

     try {
          const requestData = await request.json();

          if (
               !requestData.fullName ||
               !requestData.email ||
               !requestData.message ||
               !requestData.subject
          ) {
               throw new Error('Missing required fields.');
          }

          const info = await transporter.sendMail({
               from: `"LDA Subotica Kontakt Forma" <${process.env.EMAIL_FROM}>`,
               to: 'ldasubotica@aldaintranet.org',
               replyTo: requestData.email,
               subject: `Poruka od ${requestData.fullName}, email adresa: ${requestData.email}, sa LDA Subotica sajta`,
               html: `
                    <h3>Nova poruka sa kontakt forme</h3>

                    <p><strong>Ime i prezime:</strong> ${requestData.fullName}</p>
                    <p><strong>Email:</strong> ${requestData.email}</p>
                    <p><strong>Naslov:</strong> ${requestData.subject}</p>

                    <hr />

                    ${requestData.message}
               `,
          });

          console.log('Email sent:', info.messageId);

          return Response.json(
               {
                    status: 200,
                    statusText: 'Poruka poslata!',
               },
               {
                    status: 200,
               }
          );
     } catch (err: any) {
          console.error('Error:', err);

          return Response.json(
               {
                    status: 500,
                    statusText: 'Poruka nije poslata!',
               },
               {
                    status: 500,
               }
          );
     }
}