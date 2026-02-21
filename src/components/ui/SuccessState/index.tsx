import { cn } from "@/lib/utils";

interface SuccessStateProps {
  icon?: React.ReactNode;
  title: string;
  className?: string;
}

export function SuccessState({ icon = "✓", title, className }: SuccessStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-success/30 bg-success/10 p-6 text-center",
        className,
      )}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success text-xl">
        {icon}
      </div>
      <p className="font-semibold text-success">{title}</p>
    </div>
  );
}
