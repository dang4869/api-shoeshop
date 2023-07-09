"use strict";
const nodemailer = require("nodemailer");
const SystemConf = require("../../config/system");

const sendEmail = async (options)=>{
    const transporter = nodemailer.createTransport({
        host: SystemConf.SMTP_HOST,
        port: SystemConf.SMTP_PORT,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: SystemConf.SMTP_EMAIL,
          pass: SystemConf.SMTP_PASS
        }
      });
      
      // async..await is not allowed in global scope, must use a wrapper
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: `${SystemConf.FORM_NAME} <${SystemConf.FORM_EMAIL}>`,
          to: options.email,
          subject: options.subject,
          text: options.message
        });
      
        console.log("Message sent: %s", info.messageId);
      
}

module.exports = sendEmail
