
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee, Schedule, ScheduleException, Team } from "@/api/data-contracts";
import { WorkFormat } from "@/api/data-contracts";
import { WorkExceptions } from "../profile/WorkExceptions";
import "./employee.css";
import "../profile/profile.css";

interface EmployeeDetailPanelProps {
  employee: Employee | null;
  isCreating?: boolean;
  schedule?: Schedule | null;
  exceptions?: ScheduleException[];
  teams?: Team[];
  onSave?: (updatedData: {
    employee: { id: number; first_name: string; last_name: string; team_id: number | null };
    schedule: any;
    timezone: string;
  }) => void;
  onSaveNew?: (newData: any) => void;
  onCancelCreate?: () => void;
}

interface EditedEmployee {
  firstName: string;
  lastName: string;
  email: string;      // добавили email
  teamId: number | null;
}

interface EditedSchedule {
  work_days: number[];
  time_zone: string;
  work_format: WorkFormat;
  start_at: string;
  end_at: string;
}

export function EmployeeDetailPanel({
  employee,
  isCreating = false,
  schedule: initialSchedule,
  exceptions: initialExceptions = [],
  teams = [],
  onSave,
  onSaveNew,
  onCancelCreate,
}: EmployeeDetailPanelProps) {
  
  const [isEditing, setIsEditing] = useState(isCreating);
  const [editedEmployee, setEditedEmployee] = useState<EditedEmployee | null>(() => {
    if (isCreating) {
      return {
        firstName: "",
        lastName: "",
        email: "",
        teamId: teams.length > 0 ? teams[0].id : null,
      };
    }
    if (employee) {
      return {
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: "", 
        teamId: employee.team_id !== null ? employee.team_id : (teams[0]?.id ?? null),
      };
    }
    return null;
  });
  const [editedSchedule, setEditedSchedule] = useState<EditedSchedule | null>(() => {
    if (isCreating) {
      return {
        work_days: [0, 1, 2, 3, 4],
        time_zone: "Europe/Moscow",
        work_format: WorkFormat.Office,
        start_at: "09:00:00",
        end_at: "18:00:00",
      };
    }
    if (initialSchedule) {
      return {
        work_days: initialSchedule.work_days.map((d: number) => d - 1),
        time_zone: initialSchedule.time_zone,
        work_format: initialSchedule.work_format,
        start_at: initialSchedule.start_at,
        end_at: initialSchedule.end_at,
      };
    }
    return null;
  });

 
  useEffect(() => {
    if (!isCreating) {
      if (employee) {
        setEditedEmployee({
          firstName: employee.first_name,
          lastName: employee.last_name,
          email: "",
          teamId: employee.team_id !== null ? employee.team_id : (teams[0]?.id ?? null),
        });
      }
      if (initialSchedule) {
        setEditedSchedule({
          work_days: initialSchedule.work_days.map((d: number) => d - 1),
          time_zone: initialSchedule.time_zone,
          work_format: initialSchedule.work_format,
          start_at: initialSchedule.start_at,
          end_at: initialSchedule.end_at,
        });
      } else {
        setEditedSchedule(null);
      }
    }
  }, [employee, initialSchedule, teams, isCreating]);

  if (!isCreating && !employee) {
    return <div className="employee-detail-empty">Выберите сотрудника из списка</div>;
  }
  if (isCreating && !editedEmployee) {
    return <div className="employee-detail-empty">Загрузка формы...</div>;
  }

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    if (isCreating && onCancelCreate) onCancelCreate();
    else setIsEditing(false);
  };

  const handleSave = () => {
    if (isCreating && onSaveNew && editedEmployee && editedSchedule) {
     
      const email = editedEmployee.email.trim();
      if (!email.includes('@')) {
        alert("Введите корректный email (должен содержать @)");
        return;
      }
      onSaveNew({
        employee: {
          first_name: editedEmployee.firstName,
          last_name: editedEmployee.lastName,
          email: email,
          team_id: editedEmployee.teamId !== null ? editedEmployee.teamId : (teams[0]?.id ?? 1),
        },
        schedule: {
          work_days: editedSchedule.work_days,
          time_zone: editedSchedule.time_zone,
          work_format: editedSchedule.work_format,
          start_at: editedSchedule.start_at,
          end_at: editedSchedule.end_at,
        },
      });
    } else if (!isCreating && employee && onSave && editedEmployee && editedSchedule) {
      const teamId = editedEmployee.teamId !== null
        ? editedEmployee.teamId
        : (teams[0]?.id ?? 1);
      onSave({
        employee: {
          id: employee.id,
          first_name: editedEmployee.firstName,
          last_name: editedEmployee.lastName,
          team_id: teamId,
        },
        schedule: {
          id: initialSchedule?.id,
          work_days: editedSchedule.work_days,
          time_zone: editedSchedule.time_zone,
          work_format: editedSchedule.work_format,
          start_at: editedSchedule.start_at,
          end_at: editedSchedule.end_at,
        },
        timezone: editedSchedule.time_zone,
      });
      setIsEditing(false);
    }
  };

  const updateEmployeeField = <K extends keyof EditedEmployee>(field: K, value: EditedEmployee[K]) => {
    setEditedEmployee(prev => (prev ? { ...prev, [field]: value } : null));
  };
  const updateScheduleField = <K extends keyof EditedSchedule>(field: K, value: EditedSchedule[K]) => {
    setEditedSchedule(prev => (prev ? { ...prev, [field]: value } : null));
  };

  const getTeamNameById = (id: number | null) => {
    if (!id) return "—";
    const team = teams.find(t => t.id === id);
    return team?.name || "—";
  };

 
  if (isEditing && editedEmployee && (isCreating || editedSchedule)) {
    return (
      <div className="employee-detail-panel">
        <div className="employe-title">
          <h3 className="detail-header">{isCreating ? "Новый сотрудник" : "Редактирование"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>Отмена</Button>
            <Button size="sm" onClick={handleSave}>{isCreating ? "Создать" : "Сохранить"}</Button>
          </div>
        </div>
        <div className="detail-row"><span className="label">Имя:</span><Input value={editedEmployee.firstName} onChange={e => updateEmployeeField("firstName", e.target.value)} className="w-40 px-[12px]" /></div>
        <div className="detail-row"><span className="label">Фамилия:</span><Input value={editedEmployee.lastName} onChange={e => updateEmployeeField("lastName", e.target.value)} className="w-40 px-[12px]" /></div>
        {isCreating && (
          <div className="detail-row"><span className="label">Email:</span><Input value={editedEmployee.email} onChange={e => updateEmployeeField("email", e.target.value)} className="w-60 px-[12px]" placeholder="example@company.com" required /></div>
        )}
        <div className="detail-row"><span className="label">Отдел:</span>
          <Select
            value={editedEmployee.teamId?.toString() || ""}
            onValueChange={val => updateEmployeeField("teamId", parseInt(val))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Выберите отдел" />
            </SelectTrigger>
            <SelectContent>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="detail-row"><span className="label">Часовой пояс:</span>
          <Select value={editedSchedule?.time_zone || ""} onValueChange={val => updateScheduleField("time_zone", val)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/Moscow">MSK (UTC+3)</SelectItem>
              <SelectItem value="Europe/London">GMT (UTC+0)</SelectItem>
              <SelectItem value="Asia/Yekaterinburg">YEKT (UTC+5)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h3 className="detail-header">Рабочее расписание</h3>
        <div className="detail-row"><span className="label">Дни (0‑пн, 6‑вс):</span>
          <Input
            value={editedSchedule?.work_days.join(",")}
            onChange={e => updateScheduleField("work_days", e.target.value.split(",").map(Number))}
            className="w-40 px-[12px]"
            placeholder="0,1,2,3,4"
          />
        </div>
        <div className="detail-row"><span className="label">Начало:</span><Input value={editedSchedule?.start_at} onChange={e => updateScheduleField("start_at", e.target.value)} className="w-40 px-[12px]" /></div>
        <div className="detail-row"><span className="label">Конец:</span><Input value={editedSchedule?.end_at} onChange={e => updateScheduleField("end_at", e.target.value)} className="w-40 px-[12px]" /></div>
        <div className="detail-row"><span className="label">Формат:</span>
          <Select value={editedSchedule?.work_format} onValueChange={val => updateScheduleField("work_format", val as WorkFormat)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={WorkFormat.Office}>Офис</SelectItem>
              <SelectItem value={WorkFormat.Remote}>Удалённо</SelectItem>
              <SelectItem value={WorkFormat.Hybrid}>Гибрид</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!isCreating && <WorkExceptions exceptions={initialExceptions} employeeId={employee!.id} minHeight="62px" />}
      </div>
    );
  }


  const displaySchedule = initialSchedule;
  const displayExceptions = initialExceptions;
  const teamName = getTeamNameById(employee?.team_id ?? null);

  return (
    <div className="employee-detail-panel">
      <div className="employe-title">
        <h3 className="detail-header">Личные данные сотрудника</h3>
        <Button variant="outline" size="sm" onClick={handleEdit}>Редактировать</Button>
      </div>
      <div className="detail-row"><span className="label">ФИО:</span><span>{employee?.last_name} {employee?.first_name}</span></div>
      <div className="detail-row"><span className="label">Отдел:</span><span>{teamName}</span></div>
      <div className="detail-row"><span className="label">Часовой пояс:</span><span>{displaySchedule?.time_zone || "—"}</span></div>
      <h3 className="detail-header">Рабочее расписание</h3>
      {displaySchedule ? (
        <>
          <div className="detail-row"><span className="label">Дни:</span><span>{displaySchedule.work_days.map((d: number) => ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"][d-1]).join(", ")}</span></div>
          <div className="detail-row"><span className="label">Часы:</span><span>{displaySchedule.start_at.slice(0,5)} – {displaySchedule.end_at.slice(0,5)}</span></div>
        </>
      ) : <div className="empty">График не заполнен</div>}
      <div className="hide-add-except">
        <WorkExceptions exceptions={displayExceptions} employeeId={employee!.id} minHeight="62px" />
      </div>
    </div>
  );
}