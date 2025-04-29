"use server";

import connectDb from "@/shared/libs/db";
import Email from "@/models/email.model";

export const GetEmailDetails = async ({ title, newsLetterOwnerId }) => {
  try {
    await connectDb();
    const email = await Email.findOne({
      title,
      newsLetterOwnerId,
    });
    
    if (!email) return null;

    // Serialize Mongoose document to plain object
    const serializedEmail = {
      _id: email._id.toString(),
      title: email.title,
      content: email.content,
      newsLetterOwnerId: email.newsLetterOwnerId,
      createdAt: email.createdAt.toISOString(),
      updatedAt: email.updatedAt.toISOString()
    };

    return serializedEmail;
  } catch (error) {
    console.error("Failed to fetch email details:", error);
    return null;
  }
};
