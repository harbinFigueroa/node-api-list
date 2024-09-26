const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
require('dotenv').config();

 const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_TOKEN,
    })
  );

 const sender = {
    address: "hello@demomailtrap.com",
    name: "Prueba local hfigueroa",
  };


  // transport
    // .sendMail({
    //   from: sender,
    //   to: recipients,
    //   subject: "You are awesome!",
    //   text: "Congrats for sending test email with Mailtrap!",
    //   category: "Integration Test",
    // })
    // .then(console.log, console.error);


  module.exports = {transport,  sender}