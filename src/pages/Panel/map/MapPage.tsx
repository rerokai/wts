// src/pages/Panel/map/MapPage.tsx
import { useState } from 'react';
import { TeamHeatmap } from './TeamHeatmap';
import { UsersInfoPanel } from './UsersInfoPanel';
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { mockEmployees, mockSchedules, mockExceptions, Employee } from '@/mocks/teamData';
import './map.css';

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
    alert('Здесь будет открыта форма создания встречи');
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