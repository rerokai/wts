// src/pages/Panel/employee/employeeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type EmployeeRowData = {
  id: number;
  fullName: string;
  department: string;
  position: string;
  email: string;
};

export const employeeColumns: ColumnDef<EmployeeRowData>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Сотрудник
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "department",
    header: "Отдел",
  },
  {
    accessorKey: "position",
    header: "Должность",
  },
  {
    accessorKey: "email",
    header: "Gmail",
  },
];