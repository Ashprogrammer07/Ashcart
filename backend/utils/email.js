const { options } = require("../app");
const nodemailer = require("nodemailer");
const sendEmail=async options=>{
    const transport={
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    }
    nodemailer.createTransport(transport).sendMail({
        from:process.env.SMTP_FROM_NAME+'<'+process.env.SMTP_FROM_EMAIL+'>',
        to:options.email,
        subject:options.subject,
        text:options.message
    }).then(info=>{
        console.log("Email sent successfully",info);
    }).catch(err=>{
        console.error("Error sending email:",err);
    });
        
}
module.exports=sendEmail;