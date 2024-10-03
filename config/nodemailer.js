const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL,  
      pass: process.env.PASSWORD   
    }
  });

  const mailOptions = {
    from: 'shreyanshbuha89@gmail.com',
    to: "shreyanshbuha@gmail.com",
    subject: "reset password",
    text: "It's time to reset your password"
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
