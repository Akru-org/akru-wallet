import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'accent' | 'outline';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-secondary text-secondary-foreground',
  positive: 'bg-success/15 text-success',
  negative: 'bg-destructive/15 text-destructive',
  accent: 'bg-accent/15 text-accent-foreground',
  outline: 'border border-border text-muted-foreground',
};

export function AkruBadge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
