"use server";

import Email from "@/models/email.model";
import connectDb from "@/shared/libs/db";

export const getEmails = async ({ newsLetterOwnerId }) => {
  try {
    await connectDb();
    const emails = await Email.find({ newsLetterOwnerId });
    
    // Serialize Mongoose documents to plain objects
    const serializedEmails = emails.map(doc => ({
      _id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      newsLetterOwnerId: doc.newsLetterOwnerId,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    }));

    return serializedEmails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
};
