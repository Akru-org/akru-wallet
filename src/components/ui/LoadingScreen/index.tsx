import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({ message = "Cargando...", className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex h-screen items-center justify-center bg-background",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        {message && <span className="text-sm text-muted-foreground">{message}</span>}
      </div>
    </div>
  );
}
