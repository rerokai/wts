import { ChevronRight } from 'lucide-react';
import type { RiskMetrics } from '../risk/riskCalculator';

interface StayScheduleProps {
  profiles: { metrics: RiskMetrics }[];
}

export function StaySchedule({ profiles }: StayScheduleProps) {
  const tzConflicts = profiles.filter(p => p.metrics.conflictsCount > 0).length;
  const overloaded = profiles.filter(p => p.metrics.load > 90).length;
  const outdated = profiles.filter(p => p.metrics.actuality.percent < 50).length;

  return (
    <div className="components-data">
      <div className="title">Соблюдение графика</div>
      <div className="sh-row group">
        <div className="sh-item">
          <div className="sh-title">Часовые пояса</div>
          <div className="sh-description">{tzConflicts} сотрудника регулярно активны в другое время</div>
        </div>
        <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
      </div>
      <div className="sh-row group">
        <div className="sh-item">
          <div className="sh-title">Расхождение графика</div>
          <div className="sh-description">{outdated} сотрудников график в HR системе не совпадает с реальными событиями</div>
        </div>
        <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
      </div>
      <div className="sh-row group">
        <div className="sh-item">
          <div className="sh-title">Нарушение формата работы</div>
          <div className="sh-description">3 сотрудника не указали формат работы</div>
        </div>
        <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
      </div>
      <div className="sh-row group">
        <div className="sh-item">
          <div className="sh-title">Переработка</div>
          <div className="sh-description">{overloaded} сотрудника имеют нагруженность выше 90%</div>
        </div>
        <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
      </div>
    </div>
  );
}