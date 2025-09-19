import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId, {
        $set:{
          verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
        }
      })
    }else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId, {
        $set:{
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      })
    }

    // Create a test account or replace with real credentials.
    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a84daa7877e684", // These are must be in environment variables
    pass: "f6a80b3cf81359" // These are must be in environment variables
  }
});


    const mailOptions = {
        from: 'danishshamshee@gmail.com',
        to: email,
        subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
        or copy and paste the link below in your browser</p> <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
      }


      const mailResponse =  await transport.sendMail(mailOptions);
      return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
