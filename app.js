require('dotenv').config()
const express = require('express');
const connectDB = require('./DB/connection');
const app = express();
const cors = require('cors')
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors())
const port = process.env.PORT
const indexRouter = require('./modules/index.router')
app.use(express.json())
const path = require('path')
console.log({ dirr: __dirname });
app.use("/api/v1/uploads", express.static(path.join(__dirname, './uploads')))
app.use('/api/v1/auth', indexRouter.authRouter)
app.use('/api/v1/user', indexRouter.userRouter)
app.use('/api/v1/post', indexRouter.postRouter)
app.use('/api/v1/admin' , indexRouter.adminRouter)

connectDB()

const schedule = require('node-schedule');
const date = new Date(2022, 05, 10, 02, 27, 45)
console.log(date);
const job = schedule.scheduleJob(date, function () {
  console.log('The answer to life, the universe, and everything!');
});
var QRCode = require('qrcode');
const { createInvoice } = require('./service/createPDF');
const sendEmail = require('./service/sendEmail');

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url)
// })

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      name: "mahmoud",
      email: "mahmoudelwan460@gmail.com",
      age: 22,
      gender: "Male",
      phone: "01142951602"
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 14789512315
};

createInvoice(invoice, path.join(__dirname, './uploads/pdf/invoice.pdf'));
// sendEmail('routesession@gmail.com' , '<p>plz check your invoice</p>' , [
//   {
//     filename: 'invoiceOne.pdf',
//     path: path.join(__dirname, './uploads/pdf/invoice.pdf')
// },
// {
//   filename: 'invoice222.pdf',
//   path: path.join(__dirname, './uploads/pdf/invoice.pdf')
// },
// ])

schedule.scheduleJob('40 8 17 * * 5', function(){
  console.log('The answer to life, the universe, and everything!');
});
app.listen(port, () => console.log(`server running on port ${port}`))