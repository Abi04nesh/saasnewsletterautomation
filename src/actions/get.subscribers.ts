"use server";

import Subscriber from "@/models/subscriber.model";
import  connectDb  from "@/shared/libs/db";

export const getSubscribers = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}) => {
  try {
    await connectDb();

    const subscribers = await Subscriber.find({
      newsLetterOwnerId,
    });
    console.log(subscribers);
    return subscribers;
  } catch (error) {
    console.log(error);
  }
};
