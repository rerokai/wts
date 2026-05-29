import { useState, useMemo } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Profile } from '@/api/data-contracts';
import './map.css';

interface TeamHeatmapProps {
  year: number;
  month: number;
  profiles: Profile[];
  onCellClick: (date: Date, hour: number, availableProfiles: Profile[], unavailableProfiles: Array<{ profile: Profile; reason: string }>) => void;
}

export function TeamHeatmap({ year, month, profiles, onCellClick }: TeamHeatmapProps) {
  const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null);

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(new Date(year, month - 1)); // month в Date 0-11
    const end = endOfMonth(new Date(year, month - 1));
    return eachDayOfInterval({ start, end });
  }, [year, month]);

  const hours = useMemo(() => Array.from({ length: 14 }, (_, i) => i + 8), []); // 8:00 – 21:00

  const isProfileAvailable = (profile: Profile, date: Date, hour: number): { available: boolean; reason: string } => {
    const schedule = profile.schedule;
    if (!schedule) return { available: false, reason: 'Нет графика' };

    
    let jsDay = date.getDay(); // 0 вс, 1 пн, ..., 6 сб
    const day1Based = jsDay === 0 ? 7 : jsDay;
    if (!schedule.work_days.includes(day1Based)) {
      return { available: false, reason: 'Выходной день' };
    }

    //  (формат "HH:MM:SS")
    const startHour = parseInt(schedule.start_at.split(':')[0], 10);
    const endHour = parseInt(schedule.end_at.split(':')[0], 10);
    if (hour < startHour || hour >= endHour) {
      return { available: false, reason: 'Нерабочее время' };
    }

    
    const exception = profile.schedule_exceptions?.find(e => {
      const excStart = parseISO(e.start_date);
      const excEnd = parseISO(e.end_date);
      return isWithinInterval(date, { start: excStart, end: excEnd });
    });
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
    const availableProfiles: Profile[] = [];
    const unavailableProfiles: { profile: Profile; reason: string }[] = [];
    for (const prof of profiles) {
      const { available, reason } = isProfileAvailable(prof, date, hour);
      if (available) availableProfiles.push(prof);
      else unavailableProfiles.push({ profile: prof, reason });
    }
    return {
      availableCount: availableProfiles.length,
      totalCount: profiles.length,
      availableProfiles,
      unavailableProfiles,
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
    const { availableProfiles, unavailableProfiles } = getCellData(date, hour);
    onCellClick(date, hour, availableProfiles, unavailableProfiles);
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