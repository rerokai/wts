import { Employee, User, Team } from '@/api/backendApi';
import './profile.css';

interface PersonalDataProps {
  employee: Employee;
  user: User;
  team: Team | null;
}

export function PersonalData({ employee, user, team }: PersonalDataProps) {
  const fullName = `${employee.last_name} ${employee.first_name}`;
  // Поля position и patronymic пока отсутствуют в API – заглушки
  const position = '—';
  const patronymic = '';

  return (
    <div className="components-data">
      <div className="title">Личные данные</div>
      <div className="pers-data-list">
        <div className="pers-data-item">
          <div className="pers-data-title">ФИО</div>
          <div className="pers-data-info">{fullName} {patronymic}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Должность</div>
          <div className="pers-data-info">{position}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Отдел</div>
          <div className="pers-data-info">{team?.name || '—'}</div>
        </div>
        <div className="pers-data-item">
          <div className="pers-data-title">Email</div>
          <div className="pers-data-info">{user.email}</div>
        </div>
      </div>
    </div>
  );
}