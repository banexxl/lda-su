import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import questionAnswerServices from 'src/services/question-answer-services';
import { rateLimiter } from 'src/utils/rate-limiter';

const transporter = nodemailer.createTransport({
     host: 'sontaran.nordnet.ws',
     port: 465,
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

     const { success, remaining, limit } = await rateLimiter.limit(ip);

     console.log(
          `Rate limit status for IP ${ip}: ${remaining}/${limit} remaining requests.`,
     );

     if (!success) {
          return NextResponse.json(
               { message: 'Too many requests' },
               { status: 429 },
          );
     }

     const requestData = await request.json();
     const questionService = questionAnswerServices();

     try {
          if (
               !requestData.fullName ||
               !requestData.email ||
               !requestData.question
          ) {
               throw new Error('Missing required fields.');
          }

          const questionDocument = questionService.buildQuestionDocument({
               fullName: requestData.fullName,
               email: requestData.email,
               question: requestData.question,
          });

          await transporter.sendMail({
               from: `"LDA Subotica Upitnik" <${process.env.EMAIL_FROM}>`,
               to: 'ldasubotica@aldaintranet.org',
               replyTo: requestData.email,
               subject: `Novo pitanje sa sajta od ${requestData.fullName}`,
               html: `
                    <p><strong>Ime i prezime:</strong> ${requestData.fullName}</p>
                    <p><strong>Email:</strong> ${requestData.email}</p>
                    <p><strong>Pitanje:</strong></p>
                    <p>${requestData.question}</p>

                    <hr />

                    <p style="margin-top: 24px;">
                         <a
                              href="https://lda-dashboard.vercel.app/questions"
                              target="_blank"
                              rel="noopener noreferrer"
                              style="
                                   display: inline-block;
                                   padding: 12px 20px;
                                   background-color: #111827;
                                   color: #ffffff;
                                   text-decoration: none;
                                   border-radius: 8px;
                                   font-weight: 600;
                              "
                         >
                              Otvori pitanja u dashboard-u
                         </a>
                    </p>
               `,
          });

          const createdQuestion = await questionService.createQuestion({
               fullName: requestData.fullName,
               email: requestData.email,
               question: requestData.question,
          });

          if (
               !createdQuestion.acknowledged ||
               !createdQuestion.insertedId ||
               !createdQuestion.question
          ) {
               throw new Error('Question save failed.');
          }

          return Response.json({
               status: 200,
               statusText: 'Pitanje poslato!',
               question: createdQuestion.question,
          });
     } catch (error: any) {
          console.error('Error:', error);

          return Response.json(
               {
                    status: 500,
                    statusText: 'Pitanje nije poslato!',
               },
               {
                    status: 500,
               },
          );
     }
}