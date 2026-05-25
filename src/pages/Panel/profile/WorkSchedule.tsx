import { Accuracy } from '../Accuracy';
import './profile.css';

interface WorkSheduleProps {
  employeeId: number;
}

export function WorkShedule({ employeeId }: WorkSheduleProps) {
  // TODO: когда появится GET /api/schedules/me – замени на реальный запрос
  return (
    <div className="components-data">
      <div className="title">Рабочее расписание</div>
      <div className="pers-data-list">
        <div className="pers-data-item">
          <div className="pers-data-title">Рабочие дни</div>
          <div className="pers-data-info">ПН–ПТ</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Время начала</div>
          <div className="pers-data-info">09:00</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Перерыв</div>
          <div className="pers-data-info">12:00–13:00</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Время окончания</div>
          <div className="pers-data-info">18:00</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Часовой пояс</div>
          <div className="pers-data-info">MSK</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Формат работы</div>
          <div className="pers-data-info">Офис</div>
        </div>
      </div>
      <div className="last-update">
        <div className="lat-update-title">Дата последнего обновления</div>
        <div className="lat-update-date">—</div>
      </div>
      <div className="accu-btn"><Accuracy /></div>
    </div>
  );
}