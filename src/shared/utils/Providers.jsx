"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export default function Providers({ children }) {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <NextUIProvider>
      <Suspense fallback={<div className="w-full h-screen bg-gray-50 animate-pulse" />}>
        {children}
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}
