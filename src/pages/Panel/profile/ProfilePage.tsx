import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/apiClient';
import { PersonalData } from './PersonalData';
import { WorkShedule } from './WorkSchedule';
import { WorkExceptions } from './WorkExceptions';
import type { Employee, Team } from '@/api/backendApi';
import './profile.css';
import { Workload } from './Workload';

export function ProfilePage() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        // Получаем профиль сотрудника
        const empRes = await api.api.getMyEmployeeApiEmployeesMeGet();
        setEmployee(empRes.data);
        if (empRes.data.team_id) {
          const teamRes = await api.api.getTeamByIdApiTeamsIdGet(empRes.data.team_id);
          setTeam(teamRes.data);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных профиля', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div></div>;
  if (!employee) return <div>Нет данных сотрудника</div>;

  const fullName = `${employee.last_name} ${employee.first_name}`;

  return (
    <div className="profile-page">
      
      <div className="profile-components">
        <div className="personal-details">
          <PersonalData employee={employee} user={user!} team={team} />
        </div>
        <div className="work-schedule">
          <WorkShedule employeeId={employee.id} />
        </div>
        <div className="work-exceptions">
          <WorkExceptions employeeId={employee.id} />
        </div>
        <div className="risk-conflicts">risk-conflicts</div>
        <div className="workload"><Workload/></div>
      </div>
    </div>
  );
}