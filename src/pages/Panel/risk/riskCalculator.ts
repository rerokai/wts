// src/pages/Panel/risk/riskCalculator.ts
import type { Profile } from '@/api/data-contracts';

export interface RiskMetrics {
  actuality: { status: string; days: number; percent: number };
  meetingsOutsideTimeCount: number;
  meetingsOutsideTimeList: { date: string; time: string; title: string }[];
  conflictsCount: number;
  load: number;
  integralRisk: number;
  recommendations: string;
}

// Вспомогательная функция: количество дней между датами
function daysDiff(dateStr: string): number {
  const updated = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - updated.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Проверка, находится ли событие вне рабочего времени
function isEventOutside(event: { start_at: string; end_at: string }, schedule: Profile['schedule']): boolean {
  if (!schedule) return false;
  const startDate = new Date(event.start_at);
  const endDate = new Date(event.end_at);
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  const [workStartHour, workStartMin] = schedule.start_at.split(':').map(Number);
  const [workEndHour, workEndMin] = schedule.end_at.split(':').map(Number);
  const workStart = workStartHour + workStartMin / 60;
  const workEnd = workEndHour + workEndMin / 60;
  return startHour < workStart || endHour > workEnd;
}

export function calculateRiskMetrics(profile: Profile, period: 'week' | 'month' | 'quarter'): RiskMetrics {
  const employee = profile.employee!;
  const schedule = profile.schedule;
  const events = profile.events || [];
  const exceptions = profile.schedule_exceptions || [];

  // 1. Актуальность графика (по schedule.updated_at)
  let days = 0;
  let status = "Нет данных";
  let percent = 0;
  if (schedule) {
    days = daysDiff(schedule.updated_at);
    const maxDays = 90; // D = 90 дней
    percent = Math.max(0, Math.min(100, Math.round(100 * Math.exp(-days / maxDays))));
    status = days === 0 ? "Только что обновлён" : days < 30 ? "Актуален" : days < 60 ? "Устаревает" : "Критичен";
  }

  // 2. Встречи вне времени
  let meetingsOutside = [] as { date: string; time: string; title: string }[];
  if (schedule) {
    meetingsOutside = events
      .filter(e => isEventOutside(e, schedule))
      .map(e => ({
        date: new Date(e.start_at).toLocaleDateString('ru-RU'),
        time: new Date(e.start_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        title: e.title,
      }));
  }
  const meetingsOutsideTimeCount = meetingsOutside.length;

  // 3. Конфликты (пока простейшая логика – например, пересечение событий или расхождение с исключениями)
  // Для MVP можно просто подсчитать количество исключений, попадающих на период
  const now = new Date();
  let periodStart = new Date();
  if (period === 'week') periodStart.setDate(now.getDate() - 7);
  else if (period === 'month') periodStart.setMonth(now.getMonth() - 1);
  else periodStart.setMonth(now.getMonth() - 3);
  const activeExceptions = exceptions.filter(e => new Date(e.start_date) <= now && new Date(e.end_date) >= periodStart);
  const conflictsCount = activeExceptions.length; // упрощённо

  // 4. Нагрузка (за выбранный период)
  let load = 0;
  if (schedule) {
    const relevantEvents = events.filter(e => new Date(e.start_at) >= periodStart);
    let totalEventHours = 0;
    for (const e of relevantEvents) {
      const duration = (new Date(e.end_at).getTime() - new Date(e.start_at).getTime()) / (1000 * 60 * 60);
      totalEventHours += duration;
    }
    // Рабочие часы в день
    const [sh, sm] = schedule.start_at.split(':').map(Number);
    const [eh, em] = schedule.end_at.split(':').map(Number);
    const workHoursPerDay = (eh + em/60) - (sh + sm/60);
    const workDaysPerWeek = schedule.work_days.length;
    const daysInPeriod = Math.ceil((now.getTime() - periodStart.getTime()) / (1000*60*60*24));
    const totalWorkHours = workHoursPerDay * workDaysPerWeek * (daysInPeriod / 7);
    load = Math.min(100, Math.round((totalEventHours / totalWorkHours) * 100));
    if (isNaN(load)) load = 0;
  }

  // 5. Интегральный риск (веса эмпирические)
  const riskAct = Math.max(0, (100 - percent) / 100);
  const riskMeetings = Math.min(1, meetingsOutsideTimeCount / 20);
  const riskLoad = Math.min(1, load / 100);
  const integralRisk = Math.round(100 * (0.4 * riskAct + 0.3 * riskMeetings + 0.3 * riskLoad));

  // 6. Рекомендации
  const recommendations = [];
  if (load > 90) recommendations.push("Пересмотреть нагрузку и количество задач.");
  if (meetingsOutsideTimeCount > 0) recommendations.push("Предложить перенести встречи в рабочее время или изменить часовой пояс.");
  if (percent < 50) recommendations.push("Запросить подтверждение графика.");
  if (recommendations.length === 0) recommendations.push("Всё в порядке, риск минимален.");

  return {
    actuality: { status, days, percent },
    meetingsOutsideTimeCount,
    meetingsOutsideTimeList: meetingsOutside,
    conflictsCount,
    load,
    integralRisk,
    recommendations: recommendations.join(" "),
  };
}