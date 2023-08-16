import nodemailer from 'nodemailer';

const sendmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SM_HOST,
    port: process.env.SM_PORT,
    service: process.env.SM_SERVICE,
    auth: {
      user: process.env.SM_MAIL,
      pass: process.env.SM_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SM_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOption);
};

export default sendmail;
