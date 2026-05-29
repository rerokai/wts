// src/pages/Panel/profile/ProfilePage.tsx
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/apiClient';
import { PersonalData } from './PersonalData';
import { WorkSchedule } from './WorkSchedule';
import { WorkExceptions } from './WorkExceptions';
import type { Profile } from '@/api/data-contracts';
import './profile.css';
import { Workload } from './Workload';
import { RiskDetailPanel } from '../risk/RiskDetailPanel';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const res = await api.getMyProfileApiProfilesMeGet();
      setProfile(res.data);
    } catch (err) {
      console.error('Ошибка загрузки профиля', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) return <div>Загрузка...</div>;
  if (!profile || !profile.employee) return <div>Нет данных сотрудника</div>;

  return (
    <div className="profile-page">
      <div className="profile-components">
        <div className="personal-details">
          <PersonalData employee={profile.employee} user={profile.user} team={profile.team} />
        </div>
        <div className="work-schedule">
          <WorkSchedule schedule={profile.schedule} onRefresh={refreshProfile} />
        </div>
        <div className="work-exceptions">
          <WorkExceptions
            exceptions={profile.schedule_exceptions || []}
            employeeId={profile.employee.id}
            onExceptionAdded={refreshProfile}
          />
        </div>
        <div className="risk-conflicts">
          <RiskDetailPanel profile={profile} period="month" />
        </div>
        <div className="workload">
          <Workload schedule={profile.schedule} events={profile.events || []} />
        </div>
      </div>
    </div>
  );
}