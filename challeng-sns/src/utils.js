import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { adjectives, nouns } from "./words";
import { prisma } from "../generated/prisma-client";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};
console.log(process.env.API_KEY, process.env.DOMAIN);
const sendMail = (email) => {
  const options = {
    service: 'Gmail',
    port: 587,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD
  },tls: {
    rejectUnauthorized: false
  }
  };
  const client = nodemailer.createTransport((options));
  console.log(client)
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  console.log(address);
  console.log("email:");
  const email = {
    from: "admin@challengram.com",
    to: address,
    subject: "🔒Login Secret for challengram",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };
  return sendMail(email);
};
export const sendConfirmEmail= async (address, AuthKey)=>{
  const user = prisma.user({
    email: address
  })
  // console.log({user})
  console.log(AuthKey)
  // const key= prisma.users({where:{email: address}})
  // const token = jwt.sign(user,process.env.JWT_SECRET)
  // const encodedToken = encodeURI('"'+token+'"')
  const googleTransport =  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD
    }
}),
mailOptions = {
  from: "admin@challengram.com",
  to: address,
  subject: "🔒Login Secret ",
  html: '"'+AuthKey+'"'

}

try {
    googleTransport.sendMail(mailOptions);

    googleTransport.close();
    console.log(`mail have sent to ${ address }`);
} catch (error) {
    console.error(error);
}
}
  // console.log(address)
  // const email={
  //   from: "admin@challengram.com",
  //   to: address,
  //   subject: "🔒Please confirm account ",
  //   html: `Hello`,
    
  // };
  // return sendMail(email)
  // };



export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
