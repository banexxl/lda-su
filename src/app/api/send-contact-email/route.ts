import nodemailer from "nodemailer"
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_RESEND_API)

export async function POST(request: Request) {
     const requestData = await request.json()

     try {

          // await nodemailer.createTransport({
          //      pool: true,
          //      host: process.env.EMAIL_SERVER_HOST,
          //      port: 465,
          //      secure: true, // true for 465, false for other ports
          //      auth: {
          //           user: process.env.EMAIL_SERVER_USER, // generated` ethereal user
          //           pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
          //      },
          //      // tls: {
          //      //      rejectUnauthorized: true,
          //      //      //ciphers: 'SSLv3'
          //      // },
          //      // debug: true
          // }).sendMail({
          //      from: process.env.EMAIL_SERVER_USER,
          //      to: 'damjanovic.branislav@gmail.com',
          //      // to: 'ldasubotica@aldaintranet.org',
          //      subject: requestData.subject,
          //      text: `Poruka od ${requestData.fullName}:  ${requestData.message}`
          // })

          resend.emails.send({
               from: 'onboarding@resend.dev',
               to: 'damjanovic.branislav@gmail.com',
               subject: `Poruka od ${requestData.fullName} sa LDA Subotica sajta`,
               html: requestData.message
          });

          return new Response(JSON.stringify({ status: 200, statusText: 'Poruka poslata!' }))
     } catch (err: any) {
          return new Response(JSON.stringify(err), { status: 500, statusText: 'Poruka nije poslata!' })
     }

};