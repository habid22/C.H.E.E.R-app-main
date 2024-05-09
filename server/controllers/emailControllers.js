const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, subject, message, attachments } = req.body;

  // Check if all required fields are provided
  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Prepare the mail options, including any attachments
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
    attachments: attachments // Add the attachments array from the request body
  };

  // Attempt to send the email with Nodemailer
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // Respond with 500 Internal Server Error if the email could not be sent
      return res.status(500).json({ error: 'Failed to send email', details: error });
    } else {
      console.log("Email sent successfully!");
      // Respond with 200 OK if the email was sent successfully
      return res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});

module.exports = { sendEmail };