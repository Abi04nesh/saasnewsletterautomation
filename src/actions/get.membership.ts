"use server";

import { currentUser } from "@clerk/nextjs/server";
import Membership from "@/models/membership.model";
import  connectDb  from "@/shared/libs/db";

export const getMemberShip = async () => {
  try {
    await connectDb();

    const user = await currentUser(); // ✅ Correct function usage
    if (!user) throw new Error("User not found!");

    const membership = await Membership.findOne({ userId: user.id }).lean(); // ✅ Fix serialization issue
    return membership || null;
  } catch (error) {
    console.error("Membership fetch error:", error);
    return null;
  }
};
