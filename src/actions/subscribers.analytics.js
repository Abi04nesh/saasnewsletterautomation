"use server";

import Subscriber from "@/models/subscriber.model";
import { generateAnalyticsData } from "@/shared/utils/analytics.generator";
import { auth } from "@clerk/nextjs/server";

export const subscribersAnalytics = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const subscribers = await generateAnalyticsData(Subscriber, {
      newsLetterOwnerId: userId
    });
    
    return subscribers;
  } catch (error) {
    console.error("Error in subscribers analytics:", error);
    return { last7Months: [], totalCount: 0 };
  }
};
