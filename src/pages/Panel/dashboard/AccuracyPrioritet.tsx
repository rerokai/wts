
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import type { Profile } from '@/api/data-contracts';
import type { RiskMetrics } from '../risk/riskCalculator';

interface TopRiskRow {
  id: number;
  fullName: string;
  reason: string;
  daysWithoutUpdate: number;
  integralRisk: number;
}

const columns: ColumnDef<TopRiskRow>[] = [
  { accessorKey: "fullName", header: "Сотрудник" },
  { accessorKey: "reason", header: "Причина" },
  {
    accessorKey: "daysWithoutUpdate",
    header: "Дней без обновления",
    cell: ({ row }) => <div className="text-center font-medium">{row.original.daysWithoutUpdate}</div>,
  },
];

interface AccuracyPrioritetProps {
  profiles: { profile: Profile; metrics: RiskMetrics }[];
}

export function AccuracyPrioritet({ profiles }: AccuracyPrioritetProps) {
  const topRiskData = profiles
    .filter(({ metrics }) => metrics.actuality.days > 0)  
    .map(({ profile, metrics }) => ({
      id: profile.employee!.id,
      fullName: `${profile.employee!.last_name} ${profile.employee!.first_name}`,
      reason: metrics.recommendations.split('.')[0] || "Требуется внимание",
      daysWithoutUpdate: metrics.actuality.days,        
      integralRisk: metrics.integralRisk,
    }))
    .sort((a, b) => b.integralRisk - a.integralRisk)
    .slice(0, 4);

  if (topRiskData.length === 0) {
    return (
      <div className="components-dat">
        <div className="title">Приоритет актуализации</div>
        <div className="text-muted-foreground p-4 text-center">Нет данных о сотрудниках</div>
      </div>
    );
  }

  return (
    <div className="components-dat" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="title">Приоритет актуализации</div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <DataTable columns={columns} data={topRiskData} />
      </div>
    </div>
  );
}