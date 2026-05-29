import { PieChart, Pie, Cell, Label } from "recharts";

const COLORS = ["var(--green-2)", "var(--yellow)", "var(--red)"];

interface AccuracyDetailsProps {
  profiles: { metrics: { actuality: { percent: number } } }[];
}

export function AccuracyDetails({ profiles }: AccuracyDetailsProps) {
  const stats = profiles.reduce(
    (acc, { metrics }) => {
      const p = metrics.actuality.percent;
      if (p >= 80) acc.actual++;
      else if (p >= 50) acc.warning++;
      else acc.critical++;
      return acc;
    },
    { actual: 0, warning: 0, critical: 0 }
  );
  const total = profiles.length;

  const data = [
    { name: "С актуальным графиком", value: stats.actual },
    { name: "С устаревшим графиком", value: stats.warning },
    { name: "Давно не обновляли", value: stats.critical },
  ];

  return (
    <div className="components-data">
      <div className="title">Сводка по актуальности</div>
      <div className="accuracy-chart flex items-center justify-center gap-14">
        <div className="aspect-square max-h-[220px] w-auto">
          <PieChart width={170} height={160}>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={75} strokeWidth={0}>
              {data.map((_, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy - 5} className="fill-foreground font-bold opacity-80 text-[28px]">{total}</tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-[14px]">сотрудника</tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>
        <div className="legend-right flex flex-col gap-2">
          {data.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
              <span className="text-sm opacity-80">{item.name}:</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}