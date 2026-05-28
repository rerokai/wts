// src/pages/Panel/profile/ProfilePage.tsx
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/apiClient';
import { PersonalData } from './PersonalData';
import { WorkSchedule } from './WorkSchedule';
import { WorkExceptions } from './WorkExceptions';
import type { Employee, Team, Schedule, ScheduleException, Event as ApiEvent } from '@/api/data-contracts';
import './profile.css';
import { Workload } from './Workload';
import { RiskDetailPanel } from '../risk/RiskDetailPanel';
import { riskData } from '../risk/riskData';

export function ProfilePage() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [exceptions, setExceptions] = useState<ScheduleException[]>([]);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExceptions = useCallback(async () => {
    if (!employee) return;
    try {
      const res = await api.getAllScheduleExceptionsApiScheduleExceptionsGet();
      const allExceptions = Array.isArray(res.data) ? res.data : [];
      const myExceptions = allExceptions.filter(exc => exc.employee_id === employee.id);
      setExceptions(myExceptions);
    } catch (err) {
      console.error('Ошибка загрузки исключений', err);
    }
  }, [employee]);

  const loadEvents = useCallback(async () => {
    try {
      const res = await api.getMyEventsApiEventsMeGet();
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.warn('Ошибка загрузки событий', err);
    }
  }, []);

  const refreshSchedule = useCallback(async () => {
    try {
      const schedRes = await api.getMyScheduleApiSchedulesMeGet();
      setSchedule(schedRes.data);
    } catch (err) {
      console.warn('Ошибка обновления графика', err);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const empRes = await api.getMyEmployeeApiEmployeesMeGet();
        setEmployee(empRes.data);
        if (empRes.data.team_id) {
          const teamRes = await api.getTeamByIdApiTeamsIdGet(empRes.data.team_id);
          setTeam(teamRes.data);
        }
        try {
          const schedRes = await api.getMyScheduleApiSchedulesMeGet();
          setSchedule(schedRes.data);
        } catch {
          setSchedule(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (employee) {
      loadExceptions();
      loadEvents();
    }
  }, [employee, loadExceptions, loadEvents]);

  if (loading) return <div>Загрузка...</div>;
  if (!employee) return <div>Нет данных сотрудника</div>;

  const employeeDetails = riskData[employee.id] || null;
  return (
    <div className="profile-page">
      <div className="profile-components">
        <div className="personal-details">
          <PersonalData employee={employee} user={user!} team={team} />
        </div>
        <div className="work-schedule">
          <WorkSchedule schedule={schedule} onRefresh={refreshSchedule} />
        </div>
        <div className="work-exceptions">
          <WorkExceptions
            exceptions={exceptions}
            employeeId={employee.id}
            onExceptionAdded={loadExceptions}
          />
        </div>
        <div className="risk-conflicts">
          <RiskDetailPanel employee={employee} details={employeeDetails} />
        </div>
        <div className="workload">
          <Workload schedule={schedule} events={events} />
        </div>
      </div>
    </div>
  );
}