import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export function AppearanceNavControl({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex shrink-0 gap-0.5 rounded-lg border border-border-default-default bg-background-default-secondary p-0.5',
                className,
            )}
            role="group"
            aria-label="Theme"
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => updateAppearance(value)}
                    title={label}
                    aria-label={label}
                    aria-pressed={appearance === value}
                    className={cn(
                        'flex items-center rounded-md px-2 py-1 text-xs transition-colors sm:px-2.5 sm:py-1.5',
                        appearance === value
                            ? 'bg-background-default-default text-text-default-default shadow-sm'
                            : 'text-text-default-secondary hover:bg-background-neutral-tertiary hover:text-text-default-default',
                    )}
                >
                    <Icon
                        className="h-3.5 w-3.5 shrink-0 text-current sm:mr-1"
                        strokeWidth={2}
                    />
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}
