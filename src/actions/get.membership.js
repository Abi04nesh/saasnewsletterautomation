"use server";

import { currentUser } from "@clerk/nextjs/server";
import Membership from "@/models/membership.model";
import  connectDb  from "@/shared/libs/db";

export const getMemberShip = async () => {
  try {
    await connectDb();

    const user = await currentUser(); // ✅ Correct function usage
    if (!user) throw new Error("User not found!");

    const membership = await Membership.findOne({ userId: user.id }).lean();
    
    if (!membership) return null;

    // Serialize the membership data
    const serializedMembership = {
      _id: membership._id.toString(),
      userId: membership.userId,
      stripeCustomerId: membership.stripeCustomerId,
      plan: membership.plan,
      createdAt: membership.createdAt.toISOString(),
      updatedAt: membership.updatedAt.toISOString()
    };

    return serializedMembership;
  } catch (error) {
    console.error("Membership fetch error:", error);
    return null;
  }
};
