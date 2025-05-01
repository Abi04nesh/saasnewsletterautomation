"use server";
import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  region: "us-east-1",
});

AWS.config.getCredentials(function (error) {
  if (error) {
    console.log(error.stack);
  }
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const adminMail = "abi04nesh@gmail.com";

// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
  SES: ses,
});

export const sendEmail = async ({ userEmail, subject, content }) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      subject: subject,
      html: content,
    });

    // Return only serializable data
    return {
      messageId: response.messageId,
      accepted: response.accepted,
      rejected: response.rejected
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email: ' + (error.message || 'Unknown error'));
  }
};
