import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import questionAnswerServices from 'src/services/question-answer-services';
import { QuestionAnswer } from 'src/types/question-answer';
import { rateLimiter } from 'src/utils/rate-limiter';

const resend = new Resend(process.env.EMAIL_RESEND_API);

export async function POST(request: Request) {

     const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0] ??
          "127.0.0.1";

     // 2. Apply rate limit
     const { success, remaining, limit } = await rateLimiter.limit(ip);
     console.log({ ip, success, remaining, limit });
     if (!success) {
          return NextResponse.json(
               { message: "Too many requests" },
               { status: 429 }
          );
     }

     const requestData = await request.json();

     try {
          if (!requestData.fullName || !requestData.email || !requestData.question) {
               throw new Error('Missing required fields.');
          }

          const questionDocument: Omit<QuestionAnswer, '_id'> = {
               fullName: requestData.fullName,
               email: requestData.email,
               question: requestData.question,
               answer: '',
               questionDateTime: new Date(),
               answerDateTime: null,
          };

          const { data, error } = await resend.emails.send({
               from: 'LDA Subotica <ldasubotica@aldaintranet.org>',
               to: 'damjanovic.branislav@gmail.com',
               subject: `Novo pitanje sa sajta od ${requestData.fullName}`,
               html: `
                    <p><strong>Ime i prezime:</strong> ${requestData.fullName}</p>
                    <p><strong>Email:</strong> ${requestData.email}</p>
                    <p><strong>Pitanje:</strong></p>
                    <p>${requestData.question}</p>
               `,
          });

          if (!data || error) {
               throw new Error('Email sending failed.');
          }

          const createdQuestion = await questionAnswerServices().createQuestion(questionDocument);

          if (!createdQuestion.acknowledged || !createdQuestion.insertedId) {
               throw new Error('Question save failed.');
          }

          return Response.json({
               status: 200,
               statusText: 'Pitanje poslato!',
               question: {
                    ...questionDocument,
                    _id: createdQuestion.insertedId,
               },
          });
     } catch (error: any) {
          console.error('Error:', error.message);
          return Response.json(
               { status: 500, statusText: 'Pitanje nije poslato!' },
               { status: 500 },
          );
     }
}