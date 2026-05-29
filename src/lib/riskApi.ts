
import { api } from "@/lib/apiClient";

// Типы для ответов (можно скопировать из бэкенда или описать самим)
export interface EmployeeRiskMetrics {
  employee_id: number;
  full_name: string;
  department_id: number | null;
  department_name: string | null;
  integral_risk: number;
  actuality_score: number;
  days_since_update: number;
  load_level: number;
  out_of_schedule_ratio: number;
  tz_conflict_detected: boolean;
  hr_calendar_conflict: boolean;
  recent_exceptions: { type: string; start_date: string; end_date: string }[];
  meetings_outside_schedule: { date: string; time: string; title: string }[];
  conflicts: string[];
  recommendations: string[];
}

export interface TeamRiskSummary {
  employees: EmployeeRiskMetrics[];
  total_employees: number;
  outdated_count: number;
  overloaded_count: number;
  tz_conflict_count: number;
  high_risk_count: number;
}

// Расширяем API-клиент
export const riskApi = {
  getRiskTable: async (params: {
    period_days?: number;
    department_id?: number;
    sort_by?: string;
    sort_desc?: boolean;
  }): Promise<TeamRiskSummary> => {
    const response = await fetch(
      `${api.baseUrl}/api/risk-analytics/?` + new URLSearchParams({
        period_days: (params.period_days || 30).toString(),
        department_id: params.department_id?.toString() || '',
        sort_by: params.sort_by || 'integral_risk',
        sort_desc: (params.sort_desc !== false).toString(),
      } as any),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch risk table');
    return response.json();
  },

  getEmployeeRisk: async (employeeId: number, periodDays = 30): Promise<EmployeeRiskMetrics> => {
    const response = await fetch(
      `${api.baseUrl}/api/risk-analytics/${employeeId}?period_days=${periodDays}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch employee risk');
    return response.json();
  },
};