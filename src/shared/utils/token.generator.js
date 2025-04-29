"use server";

import { auth } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";

export const generateApiKey = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error("JWT secret key not defined");

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });

  return token;
};

export const regenerateApiKey = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error("JWT secret key not defined");

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });

  return token;
};
