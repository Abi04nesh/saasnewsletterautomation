"use server";

import Membership from "@/models/membership.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export const stripeSubscribe = async ({ price, userId }) => {
  try {
    const user = await Membership.findOne({ userId });

    if (!user || !user.stripeCustomerId) {
      return {
        message: "User not found or missing Stripe customer ID.",
      };
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/success",
      cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/error",
      subscription_data: {
        metadata: {
          payingUserId: userId,
        },
      },
    });

    if (!checkoutSession.url) {
      return {
        message: "Could not create checkout session!",
      };
    }

    return checkoutSession.url;
  } catch (error) {
    console.log("Stripe subscription error:", error);
    return {
      message: "An error occurred while creating the subscription.",
    };
  }
};
