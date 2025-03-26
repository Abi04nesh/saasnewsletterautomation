"use server";

import { currentUser } from "@clerk/nextjs/server";
import Membership from "@/models/membership.model";
import connectDb from "@/shared/libs/db"; // ✅ Default import

export const addStripe = async () => {
  try {
    await connectDb();

    const user = await currentUser(); // ✅ Correct function usage
    if (!user) throw new Error("User not found!");

    const membership = await Membership.findOne({ userId: user.id }).lean(); // ✅ Fix serialization issue
    return membership;
  } catch (error) {
    console.error("Stripe error:", error);
    return null;
  }
};
