// import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimiter } from 'src/utils/rate-limiter';

const resend = new Resend(process.env.EMAIL_RESEND_API);

export async function POST(request: Request) {

     const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0] ??
          "127.0.0.1";

     // 2. Apply rate limit
     const { success, remaining, limit } = await rateLimiter.limit(ip);
     if (!success) {
          return NextResponse.json(
               { message: "Too many requests" },
               { status: 429 }
          );
     }

     const requestData = await request.json();

     try {
          // Validate input
          if (!requestData.fullName || !requestData.email || !requestData.message || !requestData.subject) {
               throw new Error("Missing required fields.");
          }

          // Send email -->> data and error are { id: '1d16d6d2-d6f0-4c36-ac5d-75f15e9db6b0' } null
          const { data, error } = await resend.emails.send({
               from: 'LDA Subotica - Kontakt forma <onboarding@resend.dev>',
               to: 'ldasubotica@aldaintranet.org',
               subject: `Poruka od ${requestData.fullName}, email adresa: ${requestData.email}, sa LDA Subotica sajta`,
               html: requestData.message
          });
          console.log('Resend response:', { data, error });
          if (data && !error) {
               return Response.json({ status: 200, statusText: 'Poruka poslata!' }, { status: 200 });
          } else {
               throw new Error("Email sending failed.");
          }
     } catch (err: any) {
          // Proper error handling
          console.error("Error:", err.message);
          return Response.json({ status: 500, statusText: 'Poruka nije poslata!' }, { status: 500 });
     }
}
