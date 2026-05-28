import { PieChart, Pie, Cell, Label } from "recharts";

const COLORS = ["var(--green-2)", "var(--yellow)", "var(--red)"];

export function AccuracyDetails() {
  const data = [
    { name: "С актуальным графиком:", value: 75 },
    { name: "С устаревшим графиком:", value: 40 },
    { name: "Давно не обновляли:", value: 7 },
  ];
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="components-data">
      <div className="title">Сводка по актуальности</div>
      <div className="accuracy-chart flex items-center justify-center gap-14">
        <div className="aspect-square max-h-[220px] w-auto">
          <PieChart width={170} height={160}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={75}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy -5} className="fill-foreground font-bold opacity-80 text-[28px]">
                          {total}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-[14px]">
                          сотрудника
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>

        <div className="legend-right flex flex-col gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[data.indexOf(item)] }} />
              <span className="text-sm opacity-80">{item.name}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}