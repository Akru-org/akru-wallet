import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionCard({ children, className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}
