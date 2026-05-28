import { useState } from 'react';
import { TeamHeatmap } from './TeamHeatmap';
import { UsersInfoPanel } from './UsersInfoPanel';
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { mockEmployees, mockSchedules, mockExceptions, Employee } from '@/mocks/teamData';
import './map.css';
import { openGoogleCalendar } from '@/googleCalendar';
import { format } from 'date-fns';


export function MapPage() {
  const [selectedMonth, setSelectedMonth] = useState('4');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCell, setSelectedCell] = useState<{
    date: Date | null;
    hour: number | null;
    available: Employee[];
    unavailable: { employee: Employee; reason: string }[];
  }>({ date: null, hour: null, available: [], unavailable: [] });

  // Фильтрация сотрудников по отделу
  const filteredEmployees: Employee[] = selectedDepartment === 'all'
    ? mockEmployees
    : mockEmployees.filter(emp => emp.team_id === parseInt(selectedDepartment));

  const handleCellClick = (
    date: Date,
    hour: number,
    available: Employee[],
    unavailable: { employee: Employee; reason: string }[]
  ) => {
    setSelectedCell({ date, hour, available, unavailable });
  };

  

  const handleScheduleMeeting = () => {
  const { date, hour, available } = selectedCell;
  if (!date || hour === null || available.length === 0) {
    alert('Нет доступных сотрудников для встречи');
    return;
  }

  const guestEmails = available
    .map(emp => (emp as any).email)  // предполагаем, что у Employee есть email
    .filter((email: string) => email && email.includes('@'));

  if (guestEmails.length === 0) {
    alert('У доступных сотрудников нет email для приглашения');
    return;
  }

  const startDateTime = new Date(date);
  startDateTime.setHours(hour, 0, 0, 0);
  const endDateTime = new Date(date);
  endDateTime.setHours(hour + 1, 0, 0, 0);

  openGoogleCalendar({
    title: "Встреча команды",
    description: `Обсуждение текущих задач`,
    start: startDateTime,
    end: endDateTime,
    guests: guestEmails,
  });
};


  return (
    <div className="map-page">
      <div className="map-filters">
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
        <div className="mep-otdel-f">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбрать отдел" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Все отделы</SelectItem>
                <SelectItem value="1">IT отдел</SelectItem>
                <SelectItem value="2">Маркетинг</SelectItem>
                <SelectItem value="3">Администрация</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="map-components">
        <div className="temp-map">
          <TeamHeatmap
            year={2026}
            month={parseInt(selectedMonth)}
            employees={filteredEmployees}
            schedules={mockSchedules}
            exceptions={mockExceptions}
            onCellClick={handleCellClick}
          />
        </div>
        <div className="map-data-info">
          <UsersInfoPanel
            selectedDate={selectedCell.date}
            selectedHour={selectedCell.hour}
            availableEmployees={selectedCell.available}
            unavailableEmployees={selectedCell.unavailable}
            onScheduleMeeting={handleScheduleMeeting}
          />
        </div>
      </div>
    </div>
  );
}