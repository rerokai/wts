import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RiskRowData = {
  id: number;
  fullName: string;
  actuality: {
    status: string;
    days: number;
    percent: number;
  };
  meetingsOutsideTimeCount: number;
  conflictsCount: number;
  load: number;
  timezone: string;
  integralRisk: number;
};

export const columns: ColumnDef<RiskRowData>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Сотрудник
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "actuality",
    header: "Актуальность",
    cell: ({ row }) => {
      const actuality = row.original.actuality;
      return (
        <div>
          <div>{actuality.status}</div>
          
          <div className="font-semibold">{actuality.percent}%</div>
        </div>
      );
    },
  },
  {
    accessorKey: "meetingsOutsideTimeCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Доля встреч вне времени
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "conflictsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Количество конфликтов
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "load",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Уровень загрузки
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const load = row.original.load;
      return (
        <span className={load > 90 ? "text-red-600 font-semibold" : ""}>
          {load}%
        </span>
      );
    },
  },
  {
    accessorKey: "timezone",
    header: "Часовой пояс",
  },
  {
    accessorKey: "integralRisk",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Интегральный риск
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];