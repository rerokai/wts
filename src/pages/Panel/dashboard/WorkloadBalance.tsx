import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import type { RiskMetrics } from '../risk/riskCalculator';
import "./dash.css";

const LOAD_RANGES = [
  { min: 0, max: 20, label: "0-20%" },
  { min: 20, max: 40, label: "20-40%" },
  { min: 40, max: 60, label: "40-60%" },
  { min: 60, max: 80, label: "60-80%" },
  { min: 80, max: 100, label: "80-100%" },
  { min: 100, max: 120, label: "100-120%" },
];

const COLORS = ["var(--light-green)", "var(--light-green)", "var(--light-yellow)", "var(--light-yellow)", "var(--light-red)", "var(--light-red)"];

const chartConfig = { percentOfEmployees: { label: "% сотрудников", color: "var(--chart-1)" } } satisfies ChartConfig;

interface WorkloadBalanceProps {
  profiles: { metrics: RiskMetrics }[];
}

export function WorkloadBalance({ profiles }: WorkloadBalanceProps) {
  const chartData = useMemo(() => {
    const loads = profiles.map(p => p.metrics.load).filter(l => l !== undefined);
    if (loads.length === 0) return [];
    return LOAD_RANGES.map((range, idx) => {
      const count = loads.filter(l => l >= range.min && l < range.max).length;
      const percent = (count / loads.length) * 100;
      return {
        range: range.label,
        percentOfEmployees: percent,
        count,
        color: COLORS[idx],
      };
    });
  }, [profiles]);

  if (chartData.length === 0 || chartData.every(d => d.count === 0)) {
    return (
      <div className="components-data">
        <div className="title">Сводка по нагруженности сотрудников</div>
        <div className="text-muted-foreground text-center py-8">Нет данных о загрузке сотрудников</div>
      </div>
    );
  }

  return (
    <div className="components-data" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="title">Сводка по нагруженности сотрудников</div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "40px", justifyContent: "space-between", marginTop: "1rem" }}>
        <div style={{ flex: 1, minWidth: 700, height: "100%" }}>
          <ChartContainer config={chartConfig} style={{ width: "90%", height: "100%" }}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 20 }} barSize={70}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="range" tickLine={false} tickMargin={10} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={v => `${v}%`} domain={[0, 28]} tick={{ fontSize: 12 }} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="range" formatter={(value, name) => name === "percentOfEmployees" && typeof value === "number" ? [`${value.toFixed(1)}%`, "сотрудников"] : [value, ""]} />} />
              <Bar dataKey="percentOfEmployees" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", paddingLeft: "0.5rem" }}>
          {chartData.map(item => (
            <div key={item.range} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "13px" }}>
              <div style={{ width: 14, height: 14, backgroundColor: item.color, borderRadius: 2, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.range}</span>
              <span style={{ fontWeight: 500 }}>{item.percentOfEmployees.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}