"use server";

import Subscriber from "@/models/subscriber.model";
import connectDb from "@/shared/libs/db";

export const getSubscribers = async ({ newsLetterOwnerId }) => {
  try {
    await connectDb();

    const subscribers = await Subscriber.find({ newsLetterOwnerId });
    
    // Serialize Mongoose documents to plain objects
    const serializedSubscribers = subscribers.map(doc => ({
      _id: doc._id.toString(),
      email: doc.email,
      newsLetterOwnerId: doc.newsLetterOwnerId,
      status: doc.status,
      source: doc.source,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    }));

    return serializedSubscribers;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
};
