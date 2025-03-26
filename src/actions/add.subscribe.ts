"use server";

import Subscriber from "@/models/subscriber.model";
import connectDb from "@/shared/libs/db";
import { clerkClient } from "@clerk/clerk-sdk-node";
import type { User } from "@clerk/clerk-sdk-node";

export const subscribe = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    await connectDb();

    // Fetch all users using Clerk API
    const allUsersResponse = await clerkClient.users.getUserList();
    const allUsers: User[] = allUsersResponse?.data ?? []; // Ensure it's an array

    // Find the newsletter owner
    const newsletterOwner = allUsers.find((user) => user.username === username);

    if (!newsletterOwner) {
      return { error: "Username is not valid!" };
    }

    // Check if subscriber already exists
    const isSubscriberExist = await Subscriber.findOne({
      email,
      newsLetterOwnerId: newsletterOwner.id,
    }).lean(); // ✅ Ensure we get a plain object

    if (isSubscriberExist) {
      return { error: "Email already exists!" };
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      newsLetterOwnerId: newsletterOwner.id,
      status: "Subscribed",
    });

    // ✅ Convert Mongoose document to a plain object
    const plainSubscriber = {
      ...subscriber.toObject(),
      _id: subscriber._id.toString(), // Convert ObjectId to string
      createdAt: subscriber.createdAt.toISOString(), // Convert Date to string
      updatedAt: subscriber.updatedAt.toISOString(), // Convert Date to string
    };

    return plainSubscriber;
  } catch (error) {
    console.error("Subscription error:", error);
    return { error: "An error occurred while subscribing." };
  }
};
