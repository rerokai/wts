// src/pages/Panel/employee/EmployeeDetailPanel.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockEmployees } from "@/mocks/teamData";
import { getEmployeeDetails, EmployeePersonal } from "./employeeDetails";
import { riskData as defaultRiskData } from "../risk/riskData";
import { WorkExceptions } from "../profile/WorkExceptions";
import "./employee.css";

interface EmployeeDetailPanelProps {
  employee: typeof mockEmployees[0] | null;
  isCreating?: boolean;
  detailsData?: EmployeePersonal;
  riskData?: any;
  onSave?: (updatedData: { employee: any; details: EmployeePersonal; timezone: string }) => void;
  onSaveNew?: (newData: { employee: any; details: EmployeePersonal; timezone: string }) => void;
  onCancelCreate?: () => void;
}

export function EmployeeDetailPanel({
  employee,
  isCreating = false,
  detailsData,
  riskData: riskDataProp,
  onSave,
  onSaveNew,
  onCancelCreate,
}: EmployeeDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(isCreating);

  const [editedEmployee, setEditedEmployee] = useState<EmployeePersonal | null>(() => {
    if (isCreating) {
      return {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        department: "IT",
        position: "",
        schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
        exceptions: [],
      };
    }
    return null;
  });

  const [editedTimezone, setEditedTimezone] = useState(() => (isCreating ? "MSK" : ""));

  if (!isCreating && !employee) {
    return <div className="employee-detail-empty">Выберите сотрудника из списка</div>;
  }

  const details = !isCreating && employee ? (detailsData || getEmployeeDetails(employee.id)) : null;
  const risk = !isCreating && employee ? (riskDataProp || defaultRiskData[employee.id]) : null;
  const currentTimezone = !isCreating && employee ? (risk?.timezone || details?.schedule.timezone) : editedTimezone;

  const handleEdit = () => {
    if (!employee) return;
    setEditedEmployee({
      ...details!,
      firstName: employee.first_name,
      lastName: employee.last_name,
      position: employee.position || "",
      email: employee.email || "",
      department: employee.team_id === 1 ? "IT" : employee.team_id === 2 ? "Маркетинг" : "Администрация",
    });
    setEditedTimezone(currentTimezone);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isCreating && onCancelCreate) {
      onCancelCreate();
    } else {
      setIsEditing(false);
      setEditedEmployee(null);
    }
  };

  const handleSave = () => {
    if (!editedEmployee) return;
    if (isCreating) {
      const newEmployeeData = {
        employee: {
          first_name: editedEmployee.firstName,
          last_name: editedEmployee.lastName,
          position: editedEmployee.position,
          email: editedEmployee.email,
          team_id: editedEmployee.department === "IT" ? 1 : editedEmployee.department === "Маркетинг" ? 2 : 3,
        },
        details: editedEmployee,
        timezone: editedTimezone,
      };
      if (onSaveNew) onSaveNew(newEmployeeData);
    } else {
      if (onSave && employee) {
        onSave({
          employee: {
            id: employee.id,
            first_name: editedEmployee.firstName,
            last_name: editedEmployee.lastName,
            position: editedEmployee.position,
            email: editedEmployee.email,
            team_id: editedEmployee.department === "IT" ? 1 : editedEmployee.department === "Маркетинг" ? 2 : 3,
          },
          details: editedEmployee,
          timezone: editedTimezone,
        });
      }
      setIsEditing(false);
      setEditedEmployee(null);
    }
  };

  const updateEmployeeField = (field: keyof EmployeePersonal, value: any) => {
    setEditedEmployee((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const updateScheduleField = (field: "days" | "hours", value: string) => {
    setEditedEmployee((prev) =>
      prev ? { ...prev, schedule: { ...prev.schedule, [field]: value } } : null
    );
  };

  if (isEditing && editedEmployee) {
    return (
      <div className="employee-detail-panel">
        <div className="employe-title">
          <h3 className="detail-header">{isCreating ? "Новый сотрудник" : "Редактирование"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel} className="employee-butt">
              Отмена
            </Button>
            <Button size="sm" onClick={handleSave} className="employee-butt">
              {isCreating ? "Создать" : "Сохранить"}
            </Button>
          </div>
        </div>
        <div className="detail-row">
          <span className="label">Имя:</span>
          <Input value={editedEmployee.firstName} onChange={(e) => updateEmployeeField("firstName", e.target.value)} className="w-40 px-[12px]" />
        </div>
        <div className="detail-row">
          <span className="label">Фамилия:</span>
          <Input value={editedEmployee.lastName} onChange={(e) => updateEmployeeField("lastName", e.target.value)} className="w-40 px-[12px]" />
        </div>
        <div className="detail-row">
          <span className="label">Должность:</span>
          <Input value={editedEmployee.position} onChange={(e) => updateEmployeeField("position", e.target.value)} className="w-60 px-[12px]" />
        </div>
        <div className="detail-row">
          <span className="label">Отдел:</span>
          <Select value={editedEmployee.department} onValueChange={(val) => updateEmployeeField("department", val)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Маркетинг">Маркетинг</SelectItem>
              <SelectItem value="Администрация">Администрация</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <Input value={editedEmployee.email} onChange={(e) => updateEmployeeField("email", e.target.value)} className="w-60 px-[12px]" />
        </div>
        <div className="detail-row">
          <span className="label">Часовой пояс:</span>
          <Select value={editedTimezone} onValueChange={setEditedTimezone}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="MSK">MSK</SelectItem>
              <SelectItem value="MSK+1">MSK+1</SelectItem>
              <SelectItem value="MSK+2">MSK+2</SelectItem>
              <SelectItem value="MSK+3">MSK+3</SelectItem>
              <SelectItem value="MSK-1">MSK-1</SelectItem>
              <SelectItem value="MSK-2">MSK-2</SelectItem>
              <SelectItem value="MSK-3">MSK-3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h3 className="detail-header">Рабочее расписание</h3>
        <div className="detail-row">
          <span className="label">Дни:</span>
          <Input value={editedEmployee.schedule.days} onChange={(e) => updateScheduleField("days", e.target.value)} className="w-40 px-[12px]" />
        </div>
        <div className="detail-row">
          <span className="label">Часы:</span>
          <Input value={editedEmployee.schedule.hours} onChange={(e) => updateScheduleField("hours", e.target.value)} className="w-40 px-[6px]" />
        </div>
        <WorkExceptions employeeId={editedEmployee.id || 0} />
      </div>
    );
  }

  return (
    <div className="employee-detail-panel">
      <div className="employe-title">
        <h3 className="detail-header">Личные данные сотрудника</h3>
        <Button variant="outline" size="sm" onClick={handleEdit} className="employee-butt">
          Редактировать
        </Button>
      </div>
      <div className="detail-row"><span className="label">ФИО:</span><span>{employee!.last_name} {employee!.first_name}</span></div>
      <div className="detail-row"><span className="label">Должность:</span><span>{employee!.position || "—"}</span></div>
      <div className="detail-row"><span className="label">Отдел:</span><span>{employee!.team_id === 1 ? "IT" : employee!.team_id === 2 ? "Маркетинг" : "Администрация"}</span></div>
      <div className="detail-row"><span className="label">Email:</span><span>{employee!.email || "—"}</span></div>
      <div className="detail-row"><span className="label">Часовой пояс:</span><span>{risk?.timezone || details?.schedule.timezone}</span></div>
      <h3 className="detail-header">Рабочее расписание</h3>
      <div className="detail-row"><span className="label">Дни:</span><span>{details?.schedule.days}</span></div>
      <div className="detail-row"><span className="label">Часы:</span><span>{details?.schedule.hours}</span></div>
      <div className="hide-add-except">
        <WorkExceptions employeeId={employee!.id} />
      </div>
    </div>
  );
}