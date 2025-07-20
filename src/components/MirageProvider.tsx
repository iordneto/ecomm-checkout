"use client";

import { startMirage } from "@/lib/mirage-server";
import { useEffect } from "react";

export default function MirageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inicializar MirageJS sempre que estivermos no browser
    startMirage();
  }, []);

  return <>{children}</>;
}
