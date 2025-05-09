"use server";

import Email from "@/models/email.model";
import connectDb from "@/shared/libs/db";

export const deleteEmail = async ({ emailId }) => {
  try {
    await connectDb();
    await Email.findByIdAndDelete(emailId);
    return { message: "Email deleted successfully!" };
  } catch (error) {
    return { error: "An error occurred while deleting the email." };
  }
};
