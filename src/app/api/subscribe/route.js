import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "../../../shared/libs/db";
import Subscriber from "../../../models/subscriber.model";
import { validateEmail } from "../../../shared/utils/ZeroBounceApi";

export async function POST(req) {
 try {
   const data = await req.json();
 const apiKey = data.apiKey;

  if (!apiKey) {
   return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(apiKey, process.env.JWT_SECRET_KEY);
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (!decoded?.user?.id) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    await connectDb();

    // Check if subscriber exists
    const isSubscriberExist = await Subscriber.findOne({
      email: data.email,
      newsLetterOwnerId: decoded.user.id,
    }).lean();

    if (isSubscriberExist) {
      return NextResponse.json({ error: "Email already exists!" }, { status: 400 });
    }

    // Validate email
    const validationResponse = await validateEmail({ email: data.email });
    if (validationResponse.status === "invalid") {
      return NextResponse.json({ error: "Email not valid!" }, { status: 400 });
    }

    // Create and return subscriber
    const subscriber = await Subscriber.create({
      email: data.email,
      newsLetterOwnerId: decoded.user.id,
      source: "By API",
      status: "Subscribed",
    });

    const responseData = {
      id: subscriber._id.toString(),
      email: subscriber.email,
      newsLetterOwnerId: subscriber.newsLetterOwnerId.toString(),
      source: subscriber.source,
      status: subscriber.status,
      createdAt: subscriber.createdAt.toISOString(),
      updatedAt: subscriber.updatedAt.toISOString()
    };

    return NextResponse.json(responseData, { status: 201 });

  } catch (error) {
    console.error("Subscribe API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
