"use server";

import Email from "@/models/email.model";
import connectDb from "@/shared/libs/db";

export const saveEmail = async ({ title, content, newsLetterOwnerId }) => {
  try {
    await connectDb();

    let email = await Email.findOne({ title, newsLetterOwnerId }).lean();

    if (email) {
      const updatedEmail = await Email.findByIdAndUpdate(
        email._id,
        { content },
        { new: true }
      ).lean();

      if (!updatedEmail) {
        return { error: "Failed to update email." };
      }

      return {
        message: "Email updated successfully!",
        email: {
          ...updatedEmail,
          _id: updatedEmail._id.toString(),
          createdAt: updatedEmail.createdAt.toISOString?.(),
          updatedAt: updatedEmail.updatedAt.toISOString?.(),
        },
      };
    } else {
      const newEmail = await Email.create({ title, content, newsLetterOwnerId });

      return {
        message: "Email saved successfully!",
        email: {
          _id: newEmail._id.toString(),
          title: newEmail.title,
          content: newEmail.content,
          newsLetterOwnerId: newEmail.newsLetterOwnerId,
          createdAt: newEmail.createdAt.toISOString(),
          updatedAt: newEmail.updatedAt.toISOString(),
        },
      };
    }
  } catch (error) {
    console.error("Error saving email:", error);
    return { error: "Failed to save email." };
  }
};
