import { Employee } from "@/mocks/teamData";
import "./risk.css";

interface Meeting {
  date: string;
  time: string;
  title: string;
}

interface EmployeeDetails {
  actuality: { status: string; days: number; percent: number };
  meetingsOutsideTime: Meeting[];
  conflicts: string[];
  load: number;
  timezone: string;
  integralRisk: number;
}

interface RiskDetailPanelProps {
  employee: Employee | null;
  details: EmployeeDetails | null;
}

export function RiskDetailPanel({ employee, details }: RiskDetailPanelProps) {
  if (!employee || !details) {
    return (
      <div className="placeholder-text">
        Выберите сотрудника, чтобы увидеть детальную информацию
      </div>
    );
  }

  const { actuality, meetingsOutsideTime, conflicts, load } = details;

  return (
    <div className="risk-detail-panel">
      <div className="detail-header">
        <h3>{employee.last_name} {employee.first_name}</h3>
      </div>
 
      <div className="detail-section">
        <div className="section-title-risk">Актуальность</div>
        <div className="act" >{actuality.status} {actuality.days} дней назад</div>
        <div className="act">{actuality.percent}%</div>
      </div>

      <div className="detail-section">
        <div className="section-title-risk">Встречи вне времени</div>
        {meetingsOutsideTime.length === 0 ? (
          <div className="empty">Нет</div>
        ) : (
          <ul className="meeting-list">
            {meetingsOutsideTime.map((m, idx) => (
              <li key={idx}>
                <span className="act">{m.date}</span>
                <span className="act"> {m.time}</span>
                <span className="act"> – {m.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="detail-section">
        <div className="section-title-risk">Нагрузка</div>
        <div className={`act ${load > 90 ? "critical" : ""}`}>
          {load}% {load > 90 && "(Превышена)"}
        </div>
      </div>

      <div className="detail-section">
        <div className="section-title-risk">Конфликт HR и Календаря</div>
        {conflicts.length === 0 ? (
          <div className="empty">Нет конфликтов</div>
        ) : (
          <ul className="act">
            {conflicts.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="detail-section">
        <div className="section-title-risk">Рекомендации</div>
        <div className="act">
          {load > 90 && "Пересмотреть нагрузку и количество задач. "}
          {meetingsOutsideTime.length > 0 && "Предложить перенести встречи в рабочее время или изменить часовой пояс. "}
          {conflicts.length > 0 && "Согласовать календарь с HR. "}
          {!(load > 90 || meetingsOutsideTime.length > 0 || conflicts.length > 0) && "Всё в порядке, риск минимален. "}
        </div>
      </div>
    </div>
  );
}