
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

export const riskData: Record<number, EmployeeRiskDetails> = {
  
};