"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, useMemo } from "react";

export interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  type: "bar" | "donut";
  data: ChartDataItem[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

const DEFAULT_COLORS = [
  "var(--color-fill-brand)",
  "var(--color-success-50)",
  "var(--color-warning-50)",
  "var(--color-error-50)",
  "var(--color-primary-50)",
];

function getColor(index: number, custom?: string): string {
  return custom ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

/* ─── Bar Chart ─── */

function BarChart({
  data,
  height = 200,
  showLabels = true,
  showValues = true,
}: Pick<ChartProps, "data" | "height" | "showLabels" | "showValues">) {
  const max = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data]);

  return (
    <div
      className="flex items-end gap-3 w-full"
      style={{ height: `${height}px` }}
    >
      {data.map((item, i) => {
        const barHeight = (item.value / max) * 100;
        const color = getColor(i, item.color);

        return (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 flex-1 h-full justify-end"
          >
            {showValues && (
              <span className="text-label-xs text-content-tertiary">
                {item.value}
              </span>
            )}
            <div
              className="w-full rounded-[3px] transition-all duration-300 min-h-[4px]"
              style={{
                height: `${barHeight}%`,
                backgroundColor: color,
              }}
            />
            {showLabels && (
              <span className="text-label-xs text-content-secondary truncate max-w-full text-center">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Donut Chart ─── */

function DonutChart({
  data,
  height = 200,
  showLabels = true,
  showValues = true,
}: Pick<ChartProps, "data" | "height" | "showLabels" | "showValues">) {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);
  const circumference = 2 * Math.PI * 40; // r = 40

  const segments = useMemo(() => {
    let cumulative = 0;
    return data.map((item, i) => {
      const fraction = total > 0 ? item.value / total : 0;
      const dashArray = fraction * circumference;
      const dashOffset = -cumulative * circumference;
      cumulative += fraction;

      return {
        ...item,
        color: getColor(i, item.color),
        dashArray,
        dashOffset,
      };
    });
  }, [data, total, circumference]);

  const svgSize = Math.min(height, 200);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={seg.color}
              strokeWidth="16"
              strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-300"
            />
          ))}
        </svg>
        {showValues && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-label-md font-medium text-content-primary">
              {total}
            </span>
          </div>
        )}
      </div>

      {showLabels && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-label-xs text-content-secondary">
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Chart root ─── */

const Chart = forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      type,
      data,
      height = 200,
      showLabels = true,
      showValues = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} data-slot="chart" className={cn("w-full", className)} {...props}>
        {type === "bar" ? (
          <BarChart
            data={data}
            height={height}
            showLabels={showLabels}
            showValues={showValues}
          />
        ) : (
          <DonutChart
            data={data}
            height={height}
            showLabels={showLabels}
            showValues={showValues}
          />
        )}
      </div>
    );
  }
);
Chart.displayName = "Chart";

export { Chart };
