import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// send otp to user email

export const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "ramashish62127@gmail.com",
    to: email,
    subject: "OTP Verification Code",
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};
