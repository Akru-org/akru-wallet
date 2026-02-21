import { cn } from '@/lib/utils';

interface TabItem {
  key: string;
  label: string;
}

interface AkruTabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

export function AkruTabs({ tabs, active, onChange, className }: AkruTabsProps) {
  return (
    <div className={cn('flex gap-1 rounded-lg bg-secondary p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium transition-all',
            active === tab.key
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
