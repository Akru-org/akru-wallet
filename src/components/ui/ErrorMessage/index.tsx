import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive",
        className,
      )}
    >
      {message}
    </div>
  );
}
