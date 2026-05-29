import { useState, useMemo, useEffect, useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { SearchIcon, UserRoundPlus } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { employeeColumns, EmployeeRowData } from "./employeeColumns";
import { EmployeeDetailPanel } from "./EmployeeDetailPanel";
import { api } from "@/lib/apiClient";
import type { Employee, Team, Schedule, ScheduleException } from "@/api/data-contracts";
import { Role, WorkFormat } from "@/api/data-contracts";
import './employee.css';

export function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [exceptions, setExceptions] = useState<ScheduleException[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadAllData = useCallback(async () => {
    try {
      const [empRes, teamRes, schedRes, excRes] = await Promise.all([
        api.getAllEmployeesApiEmployeesGet(),
        api.getAllTeamsApiTeamsGet(),
        api.getAllSchedulesApiSchedulesGet(),
        api.getAllScheduleExceptionsApiScheduleExceptionsGet(),
      ]);
      setEmployees(empRes.data);
      setTeams(teamRes.data);
      setSchedules(schedRes.data);
      setExceptions(excRes.data);
    } catch (err) {
      console.error("Ошибка загрузки данных", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const getTeamName = (teamId: number | null) => {
    if (!teamId) return "—";
    const team = teams.find(t => t.id === teamId);
    return team?.name || "—";
  };

  const tableData = useMemo((): EmployeeRowData[] => {
    let filtered = [...employees];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(emp =>
        `${emp.last_name} ${emp.first_name}`.toLowerCase().includes(q)
      );
    }
    return filtered.map(emp => ({
      id: emp.id,
      fullName: `${emp.last_name} ${emp.first_name}`,
      department: getTeamName(emp.team_id),
    }));
  }, [employees, searchQuery, teams]);

  const handleRowClick = (row: EmployeeRowData) => {
    setIsCreating(false);
    setSelectedRowId(row.id);
    const emp = employees.find(e => e.id === row.id) || null;
    setSelectedEmployee(emp);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setSelectedEmployee(null);
    setSelectedRowId(null);
  };

  const handleSaveNew = async (newData: {
    employee: { first_name: string; last_name: string; email: string; team_id: number };
    schedule: { work_days: number[]; time_zone: string; work_format: WorkFormat; start_at: string; end_at: string };
  }) => {
    try {
      const userRes = await api.registerAnyUserApiUsersPost({
        email: newData.employee.email,
        password: "temp123",
        role: Role.Employee,
      });
      const userId = userRes.data.id;
      const empRes = await api.createEmployeeApiEmployeesPost({
        first_name: newData.employee.first_name,
        last_name: newData.employee.last_name,
        team_id: newData.employee.team_id,
        user_id: userId,
      });
      const employeeId = empRes.data.id;
      await api.createScheduleApiSchedulesPost({
        work_days: newData.schedule.work_days.map((d: number) => d + 1), // 0→1
        time_zone: newData.schedule.time_zone,
        work_format: newData.schedule.work_format,
        start_at: newData.schedule.start_at,
        end_at: newData.schedule.end_at,
        employee_id: employeeId,
      });
      alert("Сотрудник успешно добавлен");
      await loadAllData();
      setIsCreating(false);
    } catch (err) {
      console.error("Ошибка создания сотрудника", err);
      alert("Не удалось создать сотрудника");
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  if (loading) return <div className="employee-loading">Загрузка...</div>;
  if (employees.length === 0) return <div className="employee-empty">Нет данных о сотрудниках</div>;

  return (
    <div className="employee-page">
      <div className="employee-filters">
        <div className="mep-period-f">
          <Select value="5" onValueChange={() => {}}>
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
              placeholder="ФИО"
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
              teams={teams}
              onSaveNew={handleSaveNew}
              onCancelCreate={handleCancelCreate}
            />
          ) : selectedEmployee ? (
            <EmployeeDetailPanel
              key={selectedEmployee.id}
              employee={selectedEmployee}
              schedule={schedules.find(s => s.employee_id === selectedEmployee.id) || null}
              exceptions={exceptions.filter(e => e.employee_id === selectedEmployee.id)}
              teams={teams}
              onSave={async (updated) => {
              try {
                let teamId = updated.employee.team_id;
                if (teamId === null || teamId === undefined) {
                  if (teams.length > 0) teamId = teams[0].id;
                  else { alert("Нет доступных отделов"); return; }
                }
                await api.updateEmployeeApiEmployeesPut({ id: updated.employee.id }, {
                  first_name: updated.employee.first_name,
                  last_name: updated.employee.last_name,
                  team_id: Number(teamId),
                });

                if (updated.schedule && updated.schedule.id) {
                  await api.updateScheduleApiSchedulesIdPut(updated.schedule.id, {
                    work_days: updated.schedule.work_days.map((d: number) => d + 1),
                    time_zone: updated.schedule.time_zone,
                    work_format: updated.schedule.work_format,
                    start_at: updated.schedule.start_at,
                    end_at: updated.schedule.end_at,
                  });
                }
                await loadAllData();
                alert("Изменения сохранены");
              } catch (err: any) {
                console.error("Ошибка сохранения", err);
                let errorMsg = "Ошибка сохранения";
                if (err.response?.data?.detail) {
                  const detail = err.response.data.detail;
                  if (Array.isArray(detail)) {
                    errorMsg = detail.map((d: any) => d.msg || JSON.stringify(d)).join(", ");
                  } else if (typeof detail === "string") {
                    errorMsg = detail;
                  } else {
                    errorMsg = JSON.stringify(detail);
                  }
                } else if (err.message) {
                  errorMsg = err.message;
                }
                alert(errorMsg);
              }
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