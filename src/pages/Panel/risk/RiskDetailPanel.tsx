// src/pages/Panel/risk/RiskDetailPanel.tsx
import type { Profile } from '@/api/data-contracts';
import { calculateRiskMetrics } from './riskCalculator';
import "./risk.css";

interface RiskDetailPanelProps {
  profile: Profile | null;
  period?: 'week' | 'month' | 'quarter';
}

export function RiskDetailPanel({ profile, period = 'month' }: RiskDetailPanelProps) {
  if (!profile || !profile.employee) {
    return <div className="placeholder-text">Выберите сотрудника, чтобы увидеть детальную информацию</div>;
  }

  const metrics = calculateRiskMetrics(profile, period);
  const employee = profile.employee;

  return (
    <div className="risk-detail-panel">
      <div className="detail-header">
        <h3>{employee.last_name} {employee.first_name}</h3>
      </div>
      <div className="detail-section">
        <div className="section-title-risk">Актуальность</div>
        <div>{metrics.actuality.status} ({metrics.actuality.days} дней назад)</div>
        <div>{metrics.actuality.percent}%</div>
      </div>
      <div className="detail-section">
        <div className="section-title-risk">Встречи вне времени</div>
        {metrics.meetingsOutsideTimeList.length === 0 ? (
          <div className="empty">Нет</div>
        ) : (
          <ul>
            {metrics.meetingsOutsideTimeList.map((m, idx) => (
              <li key={idx}>{m.date} {m.time} – {m.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="detail-section">
        <div className="section-title-risk">Нагрузка</div>
        <div className={metrics.load > 90 ? "critical" : ""}>{metrics.load}% {metrics.load > 90 && "(Превышена)"}</div>
      </div>
      <div className="detail-section">
        <div className="section-title-risk">Конфликты</div>
        <div>{metrics.conflictsCount > 0 ? `Обнаружено ${metrics.conflictsCount} конфликтов` : "Нет конфликтов"}</div>
      </div>
      <div className="detail-section">
        <div className="section-title-risk">Рекомендации</div>
        <div>{metrics.recommendations}</div>
      </div>
    </div>
  );
}