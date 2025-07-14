"use client";

import { startMirage } from "@/lib/mirage-server";
import { useEffect } from "react";

export default function MirageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inicializar MirageJS apenas no desenvolvimento
    if (process.env.NODE_ENV === "development") {
      startMirage();
    }
  }, []);

  return <>{children}</>;
}
