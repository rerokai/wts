// src/pages/Panel/employee/EmployeePage.tsx
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { SearchIcon, UserRoundPlus } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { mockEmployees } from "@/mocks/teamData";
import { employeeColumns, EmployeeRowData } from "./employeeColumns";
import { EmployeeDetailPanel } from "./EmployeeDetailPanel";
import './employee.css';

const departmentMap: Record<number, string> = {
  1: "IT",
  2: "Маркетинг",
  3: "Администрация",
};

export function EmployeePage() {
  const [selectedMonth, setSelectedMonth] = useState("5"); // для фильтра по месяцу (можно не использовать)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  // Данные для таблицы
  const tableData = useMemo((): EmployeeRowData[] => {
    let filtered = [...mockEmployees];

    // Поиск по ФИО, email, должности
    if (searchQuery.trim()) {
  const query = searchQuery.toLowerCase();
  filtered = filtered.filter(emp => {
    const fullName = `${emp.last_name} ${emp.first_name}`.toLowerCase();
    const email = (emp.email || "").toLowerCase();
    const position = (emp.position || "").toLowerCase();
    return fullName.includes(query) || email.includes(query) || position.includes(query);
  });
}
    // При необходимости можно добавить фильтр по месяцу (например, по дате отпуска)

    return filtered.map(emp => ({
      id: emp.id,
      fullName: `${emp.last_name} ${emp.first_name}`,
      department: departmentMap[emp.team_id] || "—",
      position: emp.position || "—",
      email: emp.email || '',
    }));
  }, [searchQuery]);

  const handleRowClick = (row: EmployeeRowData) => {
    setSelectedRowId(row.id);
    const employee = mockEmployees.find(emp => emp.id === row.id);
    setSelectedEmployee(employee || null);
  };

  return (
    <div className="employee-page">
      <div className="employee-filters">
        <div className="mep-period-f">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбрать месяц" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="4">Май 2026</SelectItem>
                <SelectItem value="5">Июнь 2026</SelectItem>
                <SelectItem value="6">Июль 2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="risk-search-f">
          <InputGroup className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[10px] gap-2 rounded-md w-72">
            <InputGroupInput
              id="inline-start-input"
              placeholder="ФИО/Gmail/должность"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button variant="outline" className='shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[40px] rounded-md gap-2 text-muted-foreground hover:opacity-60'>
          <UserRoundPlus />
          <div>Добавить сотрудника</div>
        </Button>
      </div>

      <div className="employee-components">
        <div className="employees-area">
          <DataTable
            columns={employeeColumns}
            data={tableData}
            onRowClick={handleRowClick}
            selectedRowId={selectedRowId}
          />
        </div>
        <div className="employee-info">
          <EmployeeDetailPanel employee={selectedEmployee} />
        </div>
      </div>
    </div>
  );
}