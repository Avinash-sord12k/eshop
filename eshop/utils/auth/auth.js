import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
function genOtp() {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

function getRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function sendMail(email, subject, content) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: subject,
    html: content,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log("error is occuring in sending email: ", error);
    else console.log("The mail has been sent: ", info.response);
  });
}

function getUserfromJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}


export {
  sendMail,
  genOtp,
  getRandomString,
  getUserfromJwt,
}