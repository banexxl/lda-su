import { NextApiRequest } from "next";
import nodemailer from "nodemailer"

export async function POST(request: Request) {

     const requestData = await request.json()
     console.log(requestData);

     const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: 465,
          secure: false, // true for 465, false for other ports
          auth: {
               user: process.env.EMAIL_SERVER_USER, // generated ethereal user
               pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
          },
          tls: {
               rejectUnauthorized: false
          }
     });



     try {
          await transporter.sendMail({
               from: process.env.EMAIL_SERVER_USER,
               to: 'damjanovic.branislav@gmail.com',
               // to: 'ldasubotica@aldaintranet.org',
               subject: "sdsdsd",
               text: `Poruka od sdsds`
          })

          return new Response("Poruka poslata", { status: 200, statusText: 'OK' })
     } catch (err: any) {
          return new Response(JSON.stringify(err), { status: 500, statusText: 'Fail' })
     }

};