"use client";

import { startMirage } from "@/lib/mirage-server";
import { useEffect } from "react";

export default function MirageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize MirageJS whenever we are in the browser
    startMirage();
  }, []);

  return <>{children}</>;
}
