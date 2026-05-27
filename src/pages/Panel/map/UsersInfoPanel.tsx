import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Employee } from '@/mocks/teamData';
import './map.css';

import { openGoogleCalendar } from '@/googleCalendar';


interface UsersInfoPanelProps {
  selectedDate: Date | null;
  selectedHour: number | null;
  availableEmployees: Employee[];
  unavailableEmployees: Array<{ employee: Employee; reason: string }>;
  onScheduleMeeting: () => void;
}

export function UsersInfoPanel({
  selectedDate,
  selectedHour,
  availableEmployees,
  unavailableEmployees,
  onScheduleMeeting,
}: UsersInfoPanelProps) {
  if (!selectedDate || selectedHour === null) {
    return (
      <div className="users-info-panel">
        <div className="placeholder-text">
          Нажмите на ячейку тепловой карты,<br />
          чтобы увидеть доступность сотрудников
        </div>
      </div>
    );
  }

  const formattedDate = format(selectedDate, 'd MMMM, yyyy', { locale: ru });
  const total = availableEmployees.length + unavailableEmployees.length;
  const percent = total > 0 ? (availableEmployees.length / total) * 100 : 0;

  return (
    <div className="users-info-panel">
      <div className="panel-header">
        <h3>{formattedDate}, {selectedHour}:00</h3>
        <div className="availability-stats">
          Доступно: {availableEmployees.length} / {total} ({Math.round(percent)}%)
        </div>
      </div>

      <div className="panel-scrollable-content">
        {/* Не доступны */}
        <div className="users-section">
          <div className="section-title">Не доступны</div>
          <div className="unavailable-list">
            {unavailableEmployees.length === 0 ? (
              <div className="empty-message">Нет недоступных сотрудников</div>
            ) : (
              unavailableEmployees.map((item, idx) => (
                <div key={idx} className="unavailable-item">
                  <div className="user-name">
                    {item.employee.last_name} {item.employee.first_name}
                  </div>
                  <div className="user-reason">{item.reason}</div>
                </div>
              ))
            )}
          </div>
        </div>

        
        <div className="users-section">
          <div className="section-title">Доступны</div>
          <div className="available-list">
            {availableEmployees.length === 0 ? (
              <div className="empty-message">Нет доступных сотрудников</div>
            ) : (
              availableEmployees.map((emp, idx) => (
                <div key={idx} className="available-item">
                  {emp.last_name} {emp.first_name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      
      <button className="schedule-meeting-btn-small" onClick={onScheduleMeeting}>
        Назначить встречу
      </button>
    </div>
  );
}