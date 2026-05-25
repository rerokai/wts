// src/components/Map/TeamHeatmap.tsx
import { useState, useMemo } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { MockSchedule, MockException } from '@/mocks/teamData';
import { Employee } from '@/mocks/teamData';

interface TeamHeatmapProps {
  year: number;
  month: number;
  employees: Employee[];
  schedules: MockSchedule[];
  exceptions: MockException[];
  onCellClick: (date: Date, hour: number, availableEmployees: Employee[], unavailableEmployees: Array<{ employee: Employee; reason: string }>) => void;
}

export function TeamHeatmap({ year, month, employees, schedules, exceptions, onCellClick }: TeamHeatmapProps) {
  const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null);

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
    return eachDayOfInterval({ start, end });
  }, [year, month]);

  const hours = useMemo(() => Array.from({ length: 14 }, (_, i) => i + 8), []);

  const isEmployeeAvailable = (employee: Employee, date: Date, hour: number): { available: boolean; reason: string } => {
    const schedule = schedules.find(s => s.employee_id === employee.id);
    if (!schedule) return { available: false, reason: 'Нет расписания' };

    const dayOfWeek = date.getDay(); // 0=ВС, 1=ПН
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
    if (!schedule.work_days.includes(adjustedDay)) {
      return { available: false, reason: 'Выходной день' };
    }
    if (hour < schedule.start_hour || hour >= schedule.end_hour) {
      return { available: false, reason: 'Нерабочее время' };
    }

    const exception = exceptions.find(e => 
      e.employee_id === employee.id &&
      date >= parseISO(e.start_date) &&
      date <= parseISO(e.end_date)
    );
    if (exception) {
      const reasonMap: Record<string, string> = {
        vacation: 'Отпуск',
        sick_leave: 'Больничный',
        business_trip: 'Командировка',
        personal: 'Личные дела',
      };
      return { available: false, reason: reasonMap[exception.type] || 'Исключение' };
    }

    return { available: true, reason: '' };
  };

  const getCellData = (date: Date, hour: number) => {
    const availableEmployees: Employee[] = [];
    const unavailableEmployees: { employee: Employee; reason: string }[] = [];
    for (const emp of employees) {
      const { available, reason } = isEmployeeAvailable(emp, date, hour);
      if (available) availableEmployees.push(emp);
      else unavailableEmployees.push({ employee: emp, reason });
    }
    return {
      availableCount: availableEmployees.length,
      totalCount: employees.length,
      availableEmployees,
      unavailableEmployees,
    };
  };

  const getCellColor = (percent: number): string => {
    if (percent >= 70) return '#D1FFD7';
    if (percent >= 50) return '#FFFACC';
    return '#FFCCCC';
  };

  const handleClick = (date: Date, hour: number) => {
    const dateKey = `${format(date, 'yyyy-MM-dd')}-${hour}`;
    setSelectedCellKey(dateKey);
    const { availableEmployees, unavailableEmployees } = getCellData(date, hour);
    onCellClick(date, hour, availableEmployees, unavailableEmployees);
  };

  return (
    <div className="team-heatmap">
      <div className="heatmap-scroll">
        <div className="heatmap-header">
          <div className="heatmap-corner-cell"></div>
          {hours.map(hour => (
            <div key={hour} className="heatmap-hour-column-header">{`${hour}:00`}</div>
          ))}
        </div>
        {daysInMonth.map(day => {
          const dayStr = format(day, 'd EEE', { locale: ru });
          return (
            <div key={day.toISOString()} className="heatmap-row">
              <div className="heatmap-day-row-header">{dayStr}</div>
              {hours.map(hour => {
                const dateKey = `${format(day, 'yyyy-MM-dd')}-${hour}`;
                const { availableCount, totalCount } = getCellData(day, hour);
                const percent = totalCount > 0 ? (availableCount / totalCount) * 100 : 0;
                const color = getCellColor(percent);
                const isSelected = selectedCellKey === dateKey;
                return (
                  <button
                    key={hour}
                    className={`heatmap-cell ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleClick(day, hour)}
                    title={`${format(day, 'd MMM')} ${hour}:00 — ${Math.round(percent)}% доступно`}
                  >
                    <span className="cell-text">{availableCount}/{totalCount}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}