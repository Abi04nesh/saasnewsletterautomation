"use server";

import Email from "@/models/email.model";
import connectDb from "@/shared/libs/db";

// ✅ Define an interface for the email data
interface EmailDocument {
  _id: string;
  title: string;
  content: string;
  newsLetterOwnerId: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Define input types properly
interface SaveEmailInput {
  title: string;
  content: string;
  newsLetterOwnerId: string;
}

// ✅ Fix function typing
export const saveEmail = async ({ title, content, newsLetterOwnerId }: SaveEmailInput) => {
  try {
    await connectDb();

    let email = await Email.findOne({ title, newsLetterOwnerId }).lean<EmailDocument | null>();

    if (email) {
      const updatedEmail = await Email.findByIdAndUpdate(
        email._id,
        { content },
        { new: true }
      ).lean<EmailDocument | null>();

      if (!updatedEmail) {
        return { error: "Failed to update email." };
      }

      return {
        message: "Email updated successfully!",
        email: {
          ...updatedEmail,
          _id: updatedEmail._id.toString(), // ✅ Ensure _id is string
          createdAt: updatedEmail.createdAt.toString(), // ✅ Ensure string
          updatedAt: updatedEmail.updatedAt.toString(),
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
    return { error: "An error occurred while saving the email." };
  }
};
