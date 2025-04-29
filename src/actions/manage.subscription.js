"use server";

import connectDb from "@/shared/libs/db";
import Stripe from "stripe";

export const manageSubscription = async ({ customerId }) => {
  try {
    await connectDb();

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const returnUrl = process.env.NEXT_PUBLIC_WEBSITE_URL + "/dashboard";

    if (!stripeSecretKey || !process.env.NEXT_PUBLIC_WEBSITE_URL) {
      throw new Error("Missing environment variables for Stripe configuration.");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return portalSession.url;
  } catch (error) {
    console.error("Error creating Stripe portal session:", error);
    return null;
  }
};
