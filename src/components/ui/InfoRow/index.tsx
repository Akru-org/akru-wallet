import { cn } from "@/lib/utils";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export function InfoRow({ icon, label, value, className }: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-border py-2 last:border-0",
        className,
      )}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="w-24 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
