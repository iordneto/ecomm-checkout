"use client";

import { startMirage } from "@/lib/mirage-server";
import { useEffect, useState } from "react";

export default function MirageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMirageReady, setIsMirageReady] = useState(false);

  useEffect(() => {
    // Initialize MirageJS and wait for it to be ready
    const initMirage = async () => {
      try {
        await startMirage();
        // Add a small delay to ensure Mirage is fully ready
        setTimeout(() => {
          setIsMirageReady(true);
        }, 100);
      } catch (error) {
        console.error("Failed to initialize Mirage:", error);
        // Even if Mirage fails, render children after a timeout
        setTimeout(() => {
          setIsMirageReady(true);
        }, 1000);
      }
    };

    initMirage();
  }, []);

  // Show loading state while Mirage initializes
  if (!isMirageReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
