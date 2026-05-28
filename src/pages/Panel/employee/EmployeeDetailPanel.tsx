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
import { riskData } from "../risk/riskData";
import { WorkExceptions } from "../profile/WorkExceptions"; // компонент для исключений
import "./employee.css";

interface EmployeeDetailPanelProps {
  employee: typeof mockEmployees[0] | null;
  onSave?: (updatedData: { employee: any; details: EmployeePersonal; timezone: string }) => void;
}

export function EmployeeDetailPanel({ employee, onSave }: EmployeeDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<EmployeePersonal | null>(null);
  const [editedTimezone, setEditedTimezone] = useState("");

  if (!employee) {
    return (
      <div className="employee-detail-empty">
        Выберите сотрудника для просмотра информации
      </div>
    );
  }

  const details = getEmployeeDetails(employee.id);
  const risk = riskData[employee.id];
  const currentTimezone = risk?.timezone || details.schedule.timezone;

  const handleEdit = () => {
    setEditedEmployee({
      ...details,
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
    setIsEditing(false);
    setEditedEmployee(null);
  };

  const handleSave = () => {
    if (!editedEmployee) return;
    console.log("Сохранённые данные:", { editedEmployee, editedTimezone });
    if (onSave) {
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
    alert("Изменения сохранены (демо-режим)");
    setIsEditing(false);
    setEditedEmployee(null);
  };

  const updateEmployeeField = (field: keyof EmployeePersonal, value: any) => {
    setEditedEmployee((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const updateScheduleField = (field: "days" | "hours", value: string) => {
    setEditedEmployee((prev) =>
      prev ? { ...prev, schedule: { ...prev.schedule, [field]: value } } : null
    );
  };

  // Режим редактирования
  if (isEditing && editedEmployee) {
    return (
      <div className="employee-detail-panel">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Редактирование</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Отмена
            </Button>
            <Button size="sm" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>

        <h3 className="text-md font-semibold mt-2 mb-2">Личные данные</h3>
        <div className="detail-row">
          <span className="label">Имя:</span>
          <Input
            value={editedEmployee.firstName}
            onChange={(e) => updateEmployeeField("firstName", e.target.value)}
            className="w-40"
          />
        </div>
        <div className="detail-row">
          <span className="label">Фамилия:</span>
          <Input
            value={editedEmployee.lastName}
            onChange={(e) => updateEmployeeField("lastName", e.target.value)}
            className="w-40"
          />
        </div>
        <div className="detail-row">
          <span className="label">Должность:</span>
          <Input
            value={editedEmployee.position}
            onChange={(e) => updateEmployeeField("position", e.target.value)}
            className="w-40"
          />
        </div>
        <div className="detail-row">
          <span className="label">Отдел:</span>
          <Select
            value={editedEmployee.department}
            onValueChange={(val) => updateEmployeeField("department", val)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Маркетинг">Маркетинг</SelectItem>
              <SelectItem value="Администрация">Администрация</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <Input
            value={editedEmployee.email}
            onChange={(e) => updateEmployeeField("email", e.target.value)}
            className="w-40"
          />
        </div>
        <div className="detail-row">
          <span className="label">Часовой пояс:</span>
          <Select value={editedTimezone} onValueChange={setEditedTimezone}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MSK">MSK</SelectItem>
              <SelectItem value="MSK+1">MSK+1</SelectItem>
              <SelectItem value="MSK+2">MSK+2</SelectItem>
              <SelectItem value="MSK-1">MSK-1</SelectItem>
              <SelectItem value="MSK-2">MSK-2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <h3 className="text-md font-semibold mt-4 mb-2">Рабочее расписание</h3>
        <div className="detail-row">
          <span className="label">Дни:</span>
          <Input
            value={editedEmployee.schedule.days}
            onChange={(e) => updateScheduleField("days", e.target.value)}
            className="w-40"
          />
        </div>
        <div className="detail-row">
          <span className="label">Часы:</span>
          <Input
            value={editedEmployee.schedule.hours}
            onChange={(e) => updateScheduleField("hours", e.target.value)}
            className="w-40"
          />
        </div>

        {/* Исключения в режиме редактирования — показываем полный компонент с возможностью добавления */}
        <WorkExceptions employeeId={employee.id} />
      </div>
    );
  }

  // Режим просмотра
  return (
    <div className="employee-detail-panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Личные данные</h3>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          Редактировать
        </Button>
      </div>
      <div className="detail-row">
        <span className="label">ФИО:</span>
        <span>{employee.last_name} {employee.first_name}</span>
      </div>
      <div className="detail-row">
        <span className="label">Должность:</span>
        <span>{employee.position || "—"}</span>
      </div>
      <div className="detail-row">
        <span className="label">Отдел:</span>
        <span>{employee.team_id === 1 ? "IT" : employee.team_id === 2 ? "Маркетинг" : "Администрация"}</span>
      </div>
      <div className="detail-row">
        <span className="label">Email:</span>
        <span>{employee.email || "—"}</span>
      </div>
      <div className="detail-row">
        <span className="label">Часовой пояс:</span>
        <span>{risk?.timezone || details.schedule.timezone}</span>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-4">Рабочее расписание</h3>
      <div className="detail-row">
        <span className="label">Дни:</span>
        <span>{details.schedule.days}</span>
      </div>
      <div className="detail-row">
        <span className="label">Часы:</span>
        <span>{details.schedule.hours}</span>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-4">Исключения</h3>
      {/* В режиме просмотра используем WorkExceptions, но скрываем форму добавления */}
      <div className="hide-add-except">
        <WorkExceptions employeeId={employee.id} />
      </div>
    </div>
  );
}