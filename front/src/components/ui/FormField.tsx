import { ReactNode, useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  error?: string;
}

export function FormField({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = 'number',
  min,
  max,
  step,
  unit,
  error,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className="text-sm font-medium text-foreground flex items-center gap-2"
      >
        <span className={cn(
          "transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground"
        )}>
          {icon}
        </span>
        {label}
        {unit && <span className="text-xs text-muted-foreground ml-1">({unit})</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={cn(
            "h-12 pl-4 pr-4 bg-card border-2 transition-all duration-200",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error ? "border-destructive" : "border-border hover:border-primary/50"
          )}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}
