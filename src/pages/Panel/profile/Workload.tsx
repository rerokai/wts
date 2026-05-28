// src/pages/Panel/profile/Workload.tsx
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Schedule, Event } from '@/api/data-contracts';

interface WorkloadProps {
  schedule: Schedule | null;
  events: Event[];
}

export function Workload({ schedule, events }: WorkloadProps) {
  const chartData = useMemo(() => {
    if (!schedule) return [];

    const days = 10; // количество дней для отображения
    const today = new Date();
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

      // Преобразуем день недели в 1-пн...7-вс (как в schedule.work_days)
      let jsDay = date.getDay(); // 0 вс, 1 пн, ..., 6 сб
      const day1Based = jsDay === 0 ? 7 : jsDay;
      const isWorkDay = schedule.work_days.includes(day1Based);

      if (!isWorkDay) {
        result.push({ date: dateStr, нагрузка: 0 });
        continue;
      }

      // Рабочие часы
      const [startHour, startMin] = schedule.start_at.split(':').map(Number);
      const [endHour, endMin] = schedule.end_at.split(':').map(Number);
      let workHours = (endHour + endMin / 60) - (startHour + startMin / 60);
      if (workHours <= 0) workHours = 8;

      // События за этот день
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayEvents = events.filter(e => {
        const startAt = new Date(e.start_at);
        return startAt >= dayStart && startAt <= dayEnd;
      });

      // Суммарная занятость (часы)
      let busyHours = 0;
      for (const e of dayEvents) {
        const duration = (new Date(e.end_at).getTime() - new Date(e.start_at).getTime()) / (1000 * 60 * 60);
        busyHours += duration;
      }

      let loadPercent = Math.min(100, Math.round((busyHours / workHours) * 100));
      if (isNaN(loadPercent)) loadPercent = 0;

      result.push({ date: dateStr, нагрузка: loadPercent });
    }

    return result;
  }, [schedule, events]);

  if (!schedule || chartData.length === 0) {
    return (
      <div className="workload-chart-container">
        <div className="workload-chart-header">Сводка по нагруженности</div>
        <div className="no-data">Нет данных для графика</div>
      </div>
    );
  }

  const avgLoad = Math.round(chartData.reduce((sum, item) => sum + item.нагрузка, 0) / chartData.length);
  const trend = "+5.2%"; // опционально, можно вычислить динамику

  return (
    <div className="workload-chart-container">
      <div className="workload-chart-header">Сводка по нагруженности</div>
      <div className="workload-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66FF75" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#66FF75" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#BCFFC3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="workload-tooltip">
                      <div>{payload[0].payload.date}</div>
                      <div>Нагрузка: <strong>{payload[0].value}%</strong></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="нагрузка" stroke="rgba(var(--green), 1)" strokeWidth={2} fill="url(#colorLoad)" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="workload-chart-footer">
        <span>Средняя нагрузка {avgLoad}%</span>
        <span>{trend} за месяц</span>
      </div>
    </div>
  );
}