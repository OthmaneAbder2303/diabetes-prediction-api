import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  probability: number; // 0 to 1
}

export function RiskGauge({ probability }: RiskGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round(probability * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getRiskLevel = () => {
    if (probability < 0.3) return { label: 'Risque Faible', color: 'text-success', bg: 'bg-success/10' };
    if (probability < 0.6) return { label: 'Risque Modéré', color: 'text-warning', bg: 'bg-warning/10' };
    return { label: 'Risque Élevé', color: 'text-destructive', bg: 'bg-destructive/10' };
  };

  const risk = getRiskLevel();

  return (
    <div className="space-y-6">
      {/* Percentage Display */}
      <div className="text-center">
        <div className="inline-flex items-baseline gap-1">
          <span className="text-6xl font-bold tabular-nums text-foreground">
            {animatedValue}
          </span>
          <span className="text-2xl font-medium text-muted-foreground">%</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Probabilité de diabète</p>
      </div>

      {/* Gauge Track */}
      <div className="relative h-4 rounded-full overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 risk-gauge-track opacity-30"
        />
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out risk-gauge-track"
          style={{ width: `${animatedValue}%` }}
        />
        {/* Markers */}
        <div className="absolute inset-0 flex justify-between px-0.5">
          <div className="w-0.5 h-full bg-background/50" style={{ marginLeft: '30%' }} />
          <div className="w-0.5 h-full bg-background/50" style={{ marginLeft: '30%' }} />
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>0%</span>
        <span>30%</span>
        <span>60%</span>
        <span>100%</span>
      </div>

      {/* Risk Level Badge */}
      <div className="flex justify-center">
        <div className={cn(
          "px-6 py-3 rounded-full font-semibold text-lg",
          risk.bg,
          risk.color
        )}>
          {risk.label}
        </div>
      </div>
    </div>
  );
}
