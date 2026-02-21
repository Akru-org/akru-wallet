import { memo } from "react";

const HEIGHT = 40;

interface SparklineChartProps {
  data: number[];
  positive: boolean;
  height?: number;
}

function SparklineChartComponent({ data, positive, height = HEIGHT }: SparklineChartProps) {
  if (data.length < 2) return <div style={{ height }} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const w = 100;
  const h = height - padding * 2;
  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (w - padding * 2);
      const y = padding + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const color = positive ? "#22c55e" : "#ef4444";

  return (
    <div className="w-full" style={{ minHeight: height }}>
      <svg
        viewBox={`0 0 ${w} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{ minHeight: height }}
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export const SparklineChart = memo(SparklineChartComponent);
