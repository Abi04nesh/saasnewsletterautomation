"use server";

import { auth } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";

export const generateApiKey = async () => {
  const { userId } = await auth(); // Add await here
  if (!userId) throw new Error("Unauthorized");
  
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "30d"
  });
  return token;
};

export const regenerateApiKey = async () => {
  const { userId } = await auth(); // Add await here
  if (!userId) throw new Error("Unauthorized");
  
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "30d"
  });
  return token;
};