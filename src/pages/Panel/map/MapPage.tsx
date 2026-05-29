// src/pages/Panel/map/MapPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/apiClient';
import { TeamHeatmap } from './TeamHeatmap';
import { UsersInfoPanel } from './UsersInfoPanel';
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';
import type { Profile, Team } from '@/api/data-contracts';
import { openGoogleCalendar } from '@/googleCalendar';
import { format } from 'date-fns';
import './map.css';

export function MapPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('4');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState<{
    date: Date | null;
    hour: number | null;
    available: Profile[];
    unavailable: { profile: Profile; reason: string }[];
  }>({ date: null, hour: null, available: [], unavailable: [] });

  const loadProfiles = useCallback(async () => {
    try {
      const res = await api.getAllProfilesApiProfilesGet();
      setProfiles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Ошибка загрузки профилей', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTeams = useCallback(async () => {
    try {
      const res = await api.getAllTeamsApiTeamsGet();
      setTeams(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Ошибка загрузки команд', err);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
    loadTeams();
  }, [loadProfiles, loadTeams]);

  const filteredProfiles = selectedDepartment === 'all'
    ? profiles
    : profiles.filter(p => p.employee?.team_id === parseInt(selectedDepartment));

  const handleCellClick = (
    date: Date,
    hour: number,
    available: Profile[],
    unavailable: { profile: Profile; reason: string }[]
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
      .map(p => p.user?.email)
      .filter((email): email is string => !!email && email.includes('@'));

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

  if (loading) return <div className="map-loading">Загрузка данных...</div>;
  if (profiles.length === 0) return <div className="map-empty">Нет данных о сотрудниках</div>;

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
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
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
            profiles={filteredProfiles}
            onCellClick={handleCellClick}
          />
        </div>
        <div className="map-data-info">
          <UsersInfoPanel
            selectedDate={selectedCell.date}
            selectedHour={selectedCell.hour}
            availableProfiles={selectedCell.available}
            unavailableProfiles={selectedCell.unavailable}
            onScheduleMeeting={handleScheduleMeeting}
          />
        </div>
      </div>
    </div>
  );
}