import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_SERVER_HOST,
     port: 465,
     secure: true, // true for 465, false for other ports
     auth: {
          user: process.env.EMAIL_SERVER_USER, // generated ethereal user
          pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
     },
     tls: {
          rejectUnauthorized: false
     }
});
