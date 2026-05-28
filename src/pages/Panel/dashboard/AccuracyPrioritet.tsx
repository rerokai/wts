// src/pages/Panel/dashboard/AccuracyPrioritet.tsx
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { mockEmployees } from "@/mocks/teamData";
import { riskData, type EmployeeRiskDetails } from "../risk/riskData";

interface TopRiskRow {
  id: number;
  fullName: string;
  reason: string;
  daysWithoutUpdate: number;
  integralRisk: number;
}

const columns: ColumnDef<TopRiskRow>[] = [
  {
    accessorKey: "fullName",
    header: "Сотрудник",
  },
  {
    accessorKey: "reason",
    header: "Причина",
  },
  {
    accessorKey: "daysWithoutUpdate",
    header: "Дней без обновления",
    cell: ({ row }) => {
      const days = row.original.daysWithoutUpdate;
      return <div className="text-center font-medium">{days}</div>;
    },
  },
];

export function AccuracyPrioritet() {
  const topRiskData = useMemo((): TopRiskRow[] => {
    return mockEmployees
      .filter((emp) => riskData[emp.id])
      .map((emp) => {
        const details = riskData[emp.id];
        const reason =
          details.conflicts?.length > 0
            ? details.conflicts[0]
            : "Нет явных конфликтов";
        return {
          id: emp.id,
          fullName: `${emp.last_name} ${emp.first_name}`,
          reason,
          daysWithoutUpdate: details.actuality?.days ?? 0,
          integralRisk: details.integralRisk ?? 0,
        };
      })
      .filter((emp) => emp.daysWithoutUpdate > 0)
      .sort((a, b) => b.integralRisk - a.integralRisk)
      .slice(0, 4);
  }, []);

  if (topRiskData.length === 0) {
    return (
      <div className="components-dat">
        <div className="title">Приоритет актуализации</div>
        <div className="text-muted-foreground p-4 text-center">
          Нет данных о сотрудниках
        </div>
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