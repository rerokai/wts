// src/pages/Panel/risk/riskData.ts

// Типы для удобства
export interface Actuality {
  status: string;
  days: number;
  percent: number;
}

export interface Meeting {
  date: string;
  time: string;
  title: string;
}

export interface EmployeeRiskDetails {
  actuality: Actuality;
  meetingsOutsideTime: Meeting[];
  conflicts: string[];
  load: number;
  timezone: string;
  integralRisk: number;
}

// Генерируем данные для 20 сотрудников (id от 1 до 20)
export const riskData: Record<number, EmployeeRiskDetails> = {
  1: {
    actuality: { status: "Подтверждена", days: 27, percent: 73 },
    meetingsOutsideTime: [
      { date: "12.05", time: "20:00", title: "Еженедельный синк" },
      { date: "14.05", time: "21:30", title: "Код-ревью" },
      { date: "18.05", time: "19:15", title: "Планёрка" },
    ],
    conflicts: ["Часовой пояс MSK, а встречи после 20:00"],
    load: 92,
    timezone: "MSK",
    integralRisk: 85,
  },
  2: {
    actuality: { status: "Устарела", days: 45, percent: 45 },
    meetingsOutsideTime: [],
    conflicts: ["Не обновлял график 2 месяца"],
    load: 110,
    timezone: "MSK+1",
    integralRisk: 92,
  },
  3: {
    actuality: { status: "Подтверждена", days: 12, percent: 88 },
    meetingsOutsideTime: [{ date: "15.05", time: "09:30", title: "Утренний стендап" }],
    conflicts: [],
    load: 65,
    timezone: "MSK",
    integralRisk: 30,
  },
  4: {
    actuality: { status: "Просрочена", days: 60, percent: 20 },
    meetingsOutsideTime: [],
    conflicts: ["Не заполнил отпуска"],
    load: 120,
    timezone: "MSK+2",
    integralRisk: 95,
  },
  5: {
    actuality: { status: "Подтверждена", days: 5, percent: 95 },
    meetingsOutsideTime: [],
    conflicts: [],
    load: 45,
    timezone: "MSK",
    integralRisk: 15,
  },
  6: {
    actuality: { status: "Подтверждена", days: 18, percent: 82 },
    meetingsOutsideTime: [{ date: "10.05", time: "22:00", title: "Деплой" }],
    conflicts: ["Часовой пояс не совпадает"],
    load: 88,
    timezone: "MSK",
    integralRisk: 72,
  },
  7: {
    actuality: { status: "Устарела", days: 33, percent: 55 },
    meetingsOutsideTime: [],
    conflicts: ["Нет данных о графике"],
    load: 30,
    timezone: "MSK-1",
    integralRisk: 40,
  },
  8: {
    actuality: { status: "Подтверждена", days: 9, percent: 91 },
    meetingsOutsideTime: [{ date: "20.05", time: "20:30", title: "Встреча с заказчиком" }],
    conflicts: [],
    load: 78,
    timezone: "MSK",
    integralRisk: 55,
  },
  9: {
    actuality: { status: "Нет данных", days: 0, percent: 0 },
    meetingsOutsideTime: [],
    conflicts: ["Не заполнил профиль"],
    load: 0,
    timezone: "—",
    integralRisk: 100,
  },
  10: {
    actuality: { status: "Подтверждена", days: 3, percent: 97 },
    meetingsOutsideTime: [],
    conflicts: [],
    load: 50,
    timezone: "MSK+3",
    integralRisk: 25,
  },
  11: {
    actuality: { status: "Подтверждена", days: 22, percent: 76 },
    meetingsOutsideTime: [{ date: "22.05", time: "21:00", title: "Код-ревью" }],
    conflicts: ["Перегрузка"],
    load: 115,
    timezone: "MSK",
    integralRisk: 88,
  },
  12: {
    actuality: { status: "Устарела", days: 50, percent: 35 },
    meetingsOutsideTime: [],
    conflicts: ["Долго не обновлял"],
    load: 95,
    timezone: "MSK+1",
    integralRisk: 80,
  },
  13: {
    actuality: { status: "Подтверждена", days: 14, percent: 86 },
    meetingsOutsideTime: [],
    conflicts: [],
    load: 60,
    timezone: "MSK",
    integralRisk: 35,
  },
  14: {
    actuality: { status: "Подтверждена", days: 7, percent: 93 },
    meetingsOutsideTime: [{ date: "25.05", time: "19:30", title: "Ретроспектива" }],
    conflicts: [],
    load: 72,
    timezone: "MSK",
    integralRisk: 48,
  },
  15: {
    actuality: { status: "Просрочена", days: 70, percent: 10 },
    meetingsOutsideTime: [],
    conflicts: ["Отсутствует связь"],
    load: 0,
    timezone: "—",
    integralRisk: 98,
  },
  16: {
    actuality: { status: "Подтверждена", days: 2, percent: 98 },
    meetingsOutsideTime: [],
    conflicts: [],
    load: 40,
    timezone: "MSK",
    integralRisk: 20,
  },
  17: {
    actuality: { status: "Подтверждена", days: 25, percent: 75 },
    meetingsOutsideTime: [{ date: "28.05", time: "20:00", title: "Планирование" }],
    conflicts: ["Конфликт с календарём"],
    load: 85,
    timezone: "MSK",
    integralRisk: 68,
  },
  18: {
    actuality: { status: "Устарела", days: 40, percent: 50 },
    meetingsOutsideTime: [],
    conflicts: ["Не обновлял задачи"],
    load: 70,
    timezone: "MSK-2",
    integralRisk: 65,
  },
  19: {
    actuality: { status: "Подтверждена", days: 10, percent: 90 },
    meetingsOutsideTime: [],
    conflicts: [],
    load: 55,
    timezone: "MSK",
    integralRisk: 28,
  },
  20: {
    actuality: { status: "Нет данных", days: 0, percent: 0 },
    meetingsOutsideTime: [],
    conflicts: ["Не активен"],
    load: 0,
    timezone: "—",
    integralRisk: 100,
  },
};