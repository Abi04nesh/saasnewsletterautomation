"use client";

import { addStripe } from "@/actions/add.stripe";

let stripeInitialized = false;

export const initializeStripe = async (user) => {
  if (!user || stripeInitialized) return;
  
  try {
    await addStripe();
    stripeInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
};
