import { cn } from "@/lib/utils";

interface AvatarInitialProps {
  initial: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-xl",
  lg: "w-16 h-16 text-2xl",
};

export function AvatarInitial({ initial, size = "md", className }: AvatarInitialProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/20 font-display font-bold text-primary",
        size === "sm" && "bg-primary/10",
        sizeClasses[size],
        className,
      )}
    >
      {initial}
    </div>
  );
}
