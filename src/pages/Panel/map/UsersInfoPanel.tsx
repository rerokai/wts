import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Profile } from '@/api/data-contracts';
import './map.css';

interface UsersInfoPanelProps {
  selectedDate: Date | null;
  selectedHour: number | null;
  availableProfiles: Profile[];
  unavailableProfiles: Array<{ profile: Profile; reason: string }>;
  onScheduleMeeting: () => void;
}

export function UsersInfoPanel({
  selectedDate,
  selectedHour,
  availableProfiles,
  unavailableProfiles,
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
  const total = availableProfiles.length + unavailableProfiles.length;
  const percent = total > 0 ? (availableProfiles.length / total) * 100 : 0;

  return (
    <div className="users-info-panel">
      <div className="panel-header">
        <h3>{formattedDate}, {selectedHour}:00</h3>
        <div className="availability-stats">
          Доступно: {availableProfiles.length} / {total} ({Math.round(percent)}%)
        </div>
      </div>

      <div className="panel-scrollable-content">
        <div className="users-section">
          <div className="section-title">Не доступны</div>
          <div className="unavailable-list">
            {unavailableProfiles.length === 0 ? (
              <div className="empty-message">Нет недоступных сотрудников</div>
            ) : (
              unavailableProfiles.map((item, idx) => (
                <div key={idx} className="unavailable-item">
                  <div className="user-name">
                    {item.profile.employee?.last_name} {item.profile.employee?.first_name}
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
            {availableProfiles.length === 0 ? (
              <div className="empty-message">Нет доступных сотрудников</div>
            ) : (
              availableProfiles.map((prof, idx) => (
                <div key={idx} className="available-item">
                  {prof.employee?.last_name} {prof.employee?.first_name}
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