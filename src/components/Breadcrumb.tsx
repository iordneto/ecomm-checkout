// components/Breadcrumb.tsx
"use client";

import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumb({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm gap-1.5 py-3">
      {breadcrumbs.map((crumb, i) => (
        <span
          key={crumb.href}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <span
            className={`hover:underline hover:text-muted-foreground ${
              i === breadcrumbs.length - 1 && "text-muted-foreground"
            }`}
          >
            {crumb.label}
          </span>

          {i !== breadcrumbs.length - 1 && (
            <ChevronRight className="w-3 h-3 text-muted-foreground stroke-[3.5px]" />
          )}
        </span>
      ))}
    </nav>
  );
}
