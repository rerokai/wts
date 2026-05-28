// src/pages/Panel/employee/EmployeePage.tsx
import { Employee } from "@/mocks/teamData";
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
import { mockEmployees as initialEmployees } from "@/mocks/teamData";
import { employeeDetails as initialDetails, EmployeePersonal } from "./employeeDetails";
import { riskData as initialRiskData, EmployeeRiskDetails } from "../risk/riskData";
import { employeeColumns, EmployeeRowData } from "./employeeColumns";
import { EmployeeDetailPanel } from "./EmployeeDetailPanel";
import './employee.css';

const departmentMap: Record<number, string> = {
  1: "IT",
  2: "Маркетинг",
  3: "Администрация",
};

const getDepartmentFromId = (teamId: number): string => departmentMap[teamId] || "—";

const getNextId = (employees: typeof initialEmployees): number => {
  const maxId = Math.max(...employees.map(e => e.id), 0);
  return maxId + 1;
};

export function EmployeePage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeeDetailsMap, setEmployeeDetailsMap] = useState(initialDetails);
  const [riskDataMap, setRiskDataMap] = useState(initialRiskData);
  const [selectedMonth, setSelectedMonth] = useState("5");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const tableData = useMemo((): EmployeeRowData[] => {
    let filtered = [...employees];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(emp =>
        `${emp.last_name} ${emp.first_name}`.toLowerCase().includes(q) ||
        (emp.email && emp.email.toLowerCase().includes(q)) ||
        (emp.position && emp.position.toLowerCase().includes(q))
      );
    }
    return filtered.map(emp => ({
      id: emp.id,
      fullName: `${emp.last_name} ${emp.first_name}`,
      department: getDepartmentFromId(emp.team_id),
      position: emp.position || "—",
      email: emp.email || "",
    }));
  }, [employees, searchQuery]);

  const handleRowClick = (row: EmployeeRowData) => {
    setIsCreating(false);
    setSelectedRowId(row.id);
    const emp = employees.find(e => e.id === row.id);
    setSelectedEmployee(emp || null);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setSelectedEmployee(null);
    setSelectedRowId(null);
  };

  const handleSaveNew = (newEmployeeData: {
    employee: {
      first_name: string;
      last_name: string;
      position: string;
      email: string;
      team_id: number;
    };
    details: EmployeePersonal;
    timezone: string;
  }) => {
    const newId = getNextId(employees);
    const newEmployee: Employee = {
      id: newId,
      first_name: newEmployeeData.employee.first_name,
      last_name: newEmployeeData.employee.last_name,
      user_id: newId,
      team_id: newEmployeeData.employee.team_id,
      is_active: true,
      patronymic: undefined,
      position: newEmployeeData.employee.position,
      email: newEmployeeData.employee.email,
    };
    setEmployees(prev => [...prev, newEmployee]);

    const newDetails = { ...newEmployeeData.details, id: newId };
    setEmployeeDetailsMap(prev => ({ ...prev, [newId]: newDetails }));

    const newRisk: EmployeeRiskDetails = {
      actuality: { status: "Подтверждена", days: 0, percent: 100 },
      meetingsOutsideTime: [],
      conflicts: [],
      load: 0,
      timezone: newEmployeeData.timezone,
      integralRisk: 0,
    };
    setRiskDataMap(prev => ({ ...prev, [newId]: newRisk }));

    setIsCreating(false);
    setSelectedEmployee(newEmployee);
    setSelectedRowId(newId);
    alert(`Сотрудник ${newEmployee.last_name} ${newEmployee.first_name} добавлен`);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const getCurrentEmployeeDetails = (emp: any) => employeeDetailsMap[emp.id];
  const getCurrentRiskData = (emp: any) => riskDataMap[emp.id];

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
        <Button
          variant="outline"
          onClick={handleAddNew}
          className="shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[40px] rounded-md gap-2 text-muted-foreground hover:opacity-60"
        >
          <UserRoundPlus />
          <div>Добавить сотрудника</div>
        </Button>
      </div>

      <div className="employee-components">
        <div className="employees-area">
          <div className="[&_tbody_tr]:h-[36px] [&_tbody_td]:py-1 [&_th]:py-2 [&_th]:px-2">
            <DataTable
              columns={employeeColumns}
              data={tableData}
              onRowClick={handleRowClick}
              selectedRowId={selectedRowId}
            />
          </div>
        </div>
        <div className="employee-info">
          {isCreating ? (
            <EmployeeDetailPanel
              key="creating-mode"
              employee={null}
              isCreating={true}
              onSaveNew={handleSaveNew}
              onCancelCreate={handleCancelCreate}
            />
          ) : selectedEmployee ? (
            <EmployeeDetailPanel
              key={selectedEmployee.id}
              employee={selectedEmployee}
              detailsData={getCurrentEmployeeDetails(selectedEmployee)}
              riskData={getCurrentRiskData(selectedEmployee)}
              onSave={(updated) => {
                setEmployees(prev => prev.map(emp => emp.id === updated.employee.id ? updated.employee : emp));
                setEmployeeDetailsMap(prev => ({ ...prev, [updated.employee.id]: updated.details }));
                setRiskDataMap(prev => ({ ...prev, [updated.employee.id]: { ...prev[updated.employee.id], timezone: updated.timezone } }));
                alert("Изменения сохранены");
              }}
            />
          ) : (
            <div className="employee-detail-empty">
              Выберите сотрудника из списка<br />или нажмите «Добавить сотрудника»
            </div>
          )}
        </div>
      </div>
    </div>
  );
}