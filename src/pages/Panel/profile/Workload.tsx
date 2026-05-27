"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Пример данных – позже замените на реальные из API
const chartData = [
  { date: "01.05", нагрузка: 65 },
  { date: "02.05", нагрузка: 72 },
  { date: "03.05", нагрузка: 58 },
  { date: "04.05", нагрузка: 80 },
  { date: "05.05", нагрузка: 45 },
  { date: "06.05", нагрузка: 70 },
  { date: "07.05", нагрузка: 68 },
  { date: "08.05", нагрузка: 74 },
  { date: "09.05", нагрузка: 55 },
  { date: "10.05", нагрузка: 62 },
];

interface WorkloadChartProps {
  data?: typeof chartData;
  title?: string;
}

export function Workload({ data = chartData, title = "Сводка по нагруженности" }: WorkloadChartProps) {
  const avgLoad = Math.round(data.reduce((sum, item) => sum + item.нагрузка, 0) / data.length);
  const trend = "+5.2%";

  return (
    <div className="workload-chart-container">
      <div className="workload-chart-header">{title}</div>
      <div className="workload-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
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
              fill="url(#colorLoad)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="workload-chart-footer">
        
        <span>Средняя нагрузка {avgLoad}%</span>
        <span> {trend} за месяц</span>
      </div>
    </div>
  );
}