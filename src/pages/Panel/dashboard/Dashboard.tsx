
import { useEffect, useState } from 'react';
import { api } from '@/lib/apiClient';
import type { Profile, Event } from '@/api/data-contracts';
import { calculateRiskMetrics } from '../risk/riskCalculator';
import { AccuracyDetails } from './AccuracyDetails';
import { AccuracyDinamic } from './AccuracyDinamic';
import { Integration } from './Integration';
import { StaySchedule } from './StaySchedule';
import { AccuracyPrioritet } from './AccuracyPrioritet';
import { LastEvents } from './LastEvents';
import { WorkloadBalance } from './WorkloadBalance';
import './dash.css';

export function DashboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profilesRes, eventsRes] = await Promise.all([
          api.getAllProfilesApiProfilesGet(),
          api.getMyEventsApiEventsMeGet(),
        ]);
        setProfiles(Array.isArray(profilesRes.data) ? profilesRes.data : []);
        setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
      } catch (err) {
        console.error('Ошибка загрузки данных дашборда', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Загрузка дашборда...</div>;

  const profilesWithMetrics = profiles.map(profile => ({
    profile,
    metrics: calculateRiskMetrics(profile, 'month'),
  }));

  return (
    <div className="dashboard-page">
      <div className="dashboard-components">
        <div className="accuracy-details">
          <AccuracyDetails profiles={profilesWithMetrics} />
        </div>
        <div className="accuracy-dinamic">
          <AccuracyDinamic />
        </div>
        <div className="integration">
          <Integration />
        </div>
        <div className="stay-schedule">
          <StaySchedule profiles={profilesWithMetrics} />
        </div>
        <div className="accuracy-prioritet">
          <AccuracyPrioritet profiles={profilesWithMetrics} />
        </div>
        <div className="last-events">
          <WorkloadBalance profiles={profilesWithMetrics} />
        </div>
        <div className="workload-balance">
          <LastEvents events={events} />
        </div>
      </div>
    </div>
  );
}