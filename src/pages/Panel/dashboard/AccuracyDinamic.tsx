"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { date: "01.05", нагрузка: 65 },
  { date: "07.05", нагрузка: 80 },
  { date: "14.05", нагрузка: 45 },
  { date: "21.05", нагрузка: 70 },
  { date: "28.05", нагрузка: 68 },
];

interface WorkloadChartProps {
  data?: typeof chartData;
  title?: string;
}

export function AccuracyDinamic({ data = chartData, }: WorkloadChartProps) {


  return (
    <div className="accuracy-chart-container">
      <div className="title">Динамика актуальности</div>
      <div className="accuracy-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66FF75" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#66FF75" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#BCFFC3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={8}/>
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              opacity={0.7}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="workload-tooltip">
                      <div>{payload[0].payload.date}</div>
                      <div>Нагрузка: <strong>{payload[0].value}%</strong></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="нагрузка"
              stroke="rgba(var(--green), 1)"
              strokeWidth={2}
              opacity={0.9}
              fill="url(#colorLoad)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}