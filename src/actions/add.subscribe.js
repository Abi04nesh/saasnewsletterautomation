"use server";

import Subscriber from "@/models/subscriber.model";
import connectDb from "@/shared/libs/db";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const subscribe = async ({ email, username }) => {
  try {
    await connectDb();

    // Fetch all users using Clerk API
    const allUsersResponse = await clerkClient.users.getUserList();
    const allUsers = allUsersResponse?.data ?? [];

    // Find the newsletter owner
    const newsletterOwner = allUsers.find((user) => user.username === username);

    if (!newsletterOwner) {
      return { error: "Username is not valid!" };
    }

    // Check if subscriber already exists
    const isSubscriberExist = await Subscriber.findOne({
      email,
      newsLetterOwnerId: newsletterOwner.id,
    }).lean();

    if (isSubscriberExist) {
      return { error: "Email already exists!" };
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      newsLetterOwnerId: newsletterOwner.id,
      status: "Subscribed",
    });

    const plainSubscriber = {
      ...subscriber.toObject(),
      _id: subscriber._id.toString(),
      createdAt: subscriber.createdAt.toISOString(),
      updatedAt: subscriber.updatedAt.toISOString(),
    };

    return plainSubscriber;
  } catch (error) {
    console.error("Subscription error:", error);
    return { error: "An error occurred while subscribing." };
  }
};
