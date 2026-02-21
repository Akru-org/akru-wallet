import * as React from "react";
import { cn } from "@/lib/utils";

interface DestructiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function DestructiveButton({ children, className, ...props }: DestructiveButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 py-3 text-sm font-semibold text-destructive transition-all hover:bg-destructive/20",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
