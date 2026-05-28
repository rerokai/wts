import type { Schedule } from '@/api/data-contracts';
import { Accuracy } from '../Accuracy';
import './profile.css';

interface WorkScheduleProps {
  schedule: Schedule | null;
  onRefresh: () => Promise<void>;
}

export function WorkSchedule({ schedule, onRefresh }: WorkScheduleProps) {
  if (!schedule) {
    return (
      <div className="components-data">
        <div className="title">Рабочее расписание</div>
        <div className="no-data">График не заполнен</div>
      </div>
    );
  }

  const daysMap: Record<number, string> = {
    0: 'ПН', 1: 'ВТ', 2: 'СР', 3: 'ЧТ', 4: 'ПТ', 5: 'СБ', 6: 'ВС'
  };
  const workDays = schedule.work_days.map(d => daysMap[d]).join(', ');
  const formatTime = (time: string) => time.slice(0, 5);
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ru-RU');

  return (
    <div className="components-data">
      <div className="title">Рабочее расписание</div>
      <div className="pers-data-list">
        <div className="pers-data-item">
          <div className="pers-data-title">Рабочие дни</div>
          <div className="pers-data-info">{workDays}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Время работы</div>
          <div className="pers-data-info">{formatTime(schedule.start_at)} – {formatTime(schedule.end_at)}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Часовой пояс</div>
          <div className="pers-data-info">{schedule.time_zone}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Формат работы</div>
          <div className="pers-data-info">
            {schedule.work_format === 'office' && 'Офис'}
            {schedule.work_format === 'remote' && 'Удалённо'}
            {schedule.work_format === 'hybrid' && 'Гибрид'}
          </div>
        </div>
      </div>
      <div className="last-update">
        <div className="lat-update-title">Дата последнего обновления</div>
        <div className="lat-update-date">{formatDate(schedule.updated_at)}</div>
      </div>
      <div className="accu-btn">
        <Accuracy scheduleId={schedule.id} onConfirm={onRefresh} />
      </div>
    </div>
  );
}