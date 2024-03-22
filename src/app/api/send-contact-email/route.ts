// import nodemailer from "nodemailer";
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_RESEND_API);

export async function POST(request: Request) {
     const requestData = await request.json();

     try {
          // Validate input
          if (!requestData.fullName || !requestData.email || !requestData.message || !requestData.subject) {
               throw new Error("Missing required fields.");
          }

          // Send email -->> data and error are { id: '1d16d6d2-d6f0-4c36-ac5d-75f15e9db6b0' } null
          const { data, error } = await resend.emails.send({
               from: 'onboarding@resend.dev',
               to: 'ldasubotica@aldaintranet.org',
               subject: `Poruka od ${requestData.fullName}, email adresa: ${requestData.email}, sa LDA Subotica sajta`,
               html: requestData.message
          });
          console.log(data, error);

          if (data && !error) {
               return new Response(JSON.stringify({ status: 200, statusText: 'Poruka poslata!' }));
          } else {
               throw new Error("Email sending failed.");
          }
     } catch (err: any) {
          // Proper error handling
          console.error("Error:", err.message);
          return new Response(JSON.stringify({ status: 500, statusText: 'Poruka nije poslata!' }));
     }
}
