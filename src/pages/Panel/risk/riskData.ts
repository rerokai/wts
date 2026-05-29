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
  
};