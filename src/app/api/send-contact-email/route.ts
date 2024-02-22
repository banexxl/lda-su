const nodemailer = require("nodemailer");

export async function POST(request: Request, response: Response) {

     const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
               user: process.env.EMAIL_SERVER_USER, // generated ethereal user
               pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
          },
          tls: {
               rejectUnauthorized: true
          }
     });
     const body = await request.json()

     try {
          const res = await transporter.sendMail({
               from: process.env.EMAIL_SERVER_USER,
               to: 'damjanovic.branislav@gmail.com',
               // to: 'ldasubotica@aldaintranet.org',
               subject: body.subject,
               text: `Poruka od ${body.fullName}:` + " " + body.message
          })

          return Response.json({ response: response.status, data: res })
     } catch (err: any) {
          return Response.json(err)
     }

};