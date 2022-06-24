// https://www.npmjs.com/package/nodejs-nodemailer-outlook
const nodeoutlook = require('nodejs-nodemailer-outlook')
function sendEmail(dest, message, attachment) {
    if (!attachment) {
        attachment = []
    }0
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.senderEmail,
            pass: process.env.senderPassword
        },
        from: process.env.senderEmail,
        to: dest,
        subject: 'Hey you, awesome!',
        html: message,
        attachments: attachment,
        text: 'This is text version!',
        onError: (e) => { console.log(e) },
        onSuccess: (i) => { console.log(i) }
    }
    );
}

module.exports = sendEmail





// const nodemailer = require("nodemailer");
// async function sendEmail(dest, message) {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user:process.env.senderEmail, // generated ethereal user
//             pass:process.env.senderPassword, // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//    await transporter.sendMail({
//         from: `"Fred Foo 👻" <${process.env.senderEmail}>`, // sender address
//         to: dest, // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: message, // html body
//     });

// }


// const sgMail = require('@sendgrid/mail');
// function sendEmail(dest, message) {
//     try {
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//             to: dest,
//             from: 'mahmoudelwan460@gmail.com', // Use the email address or domain you verified above
//             subject: 'Sending with Twilio SendGrid is Fun',
//             text: 'and easy to do anywhere, even with Node.js',
//             html: message,
//         };
//         (async () => {
//             try {
//                 await sgMail.send(msg);
//             } catch (error) {
//                 console.error(error);
//                 if (error.response) {
//                     console.error(error.response.body)
//                 }
//             }
//         })();
//     } catch (error) {
//         console.log(`catch err ${error}`);
//     }
// }



// module.exports = sendEmail
