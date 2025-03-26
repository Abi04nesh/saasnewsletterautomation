import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Membership from "@/models/membership.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ error: { message: "Method Not Allowed" } }),
      { status: 405, headers: new Headers({ Allow: "POST" }) }
    );
  }

  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: { message: "Missing Stripe signature" } },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(`❌ Webhook Error: ${errorMessage}`);

      return NextResponse.json(
        { error: { message: `Webhook Error: ${errorMessage}` } },
        { status: 400 }
      );
    }

    console.log("✅ Webhook received:", event.id);

    if (!event.data.object || typeof event.data.object !== "object") {
      return NextResponse.json(
        { error: { message: "Invalid event data" } },
        { status: 400 }
      );
    }

    const subscription = event.data.object as Stripe.Subscription;

    // Ensure we have at least one item
    if (!subscription.items?.data?.length) {
      return NextResponse.json(
        { error: { message: "Subscription has no items" } },
        { status: 400 }
      );
    }

    const itemId: string | undefined = subscription.items.data[0].price.product as string;
    if (!itemId) {
      return NextResponse.json(
        { error: { message: "Invalid price product ID" } },
        { status: 400 }
      );
    }

    try {
      const product = await stripe.products.retrieve(itemId);
      const planName = product.name;

      switch (event.type) {
        case "customer.subscription.created":
          const membership = await Membership.findOne({
            stripeCustomerId: subscription.customer,
          });

          if (membership) {
            await Membership.updateOne(
              { stripeCustomerId: subscription.customer },
              { $set: { plan: planName } }
            );
          }
          break;

        case "customer.subscription.deleted":
          // Handle subscription cancellation (optional)
          break;

        default:
          console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
          break;
      }
    } catch (productError) {
      console.error("❌ Error retrieving product:", productError);
      return NextResponse.json(
        { error: { message: "Failed to retrieve product details" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("❌ Webhook Handler Error:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
}
