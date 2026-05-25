// src/mocks/teamData.ts

// src/mocks/teamData.ts

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  user_id: number;
  team_id: number;
  is_active: boolean;
  patronymic?: string;
  position?: string;
}

export interface MockSchedule {
  employee_id: number;
  work_days: number[];
  start_hour: number;
  end_hour: number;
  time_zone: string;
}

export interface MockException {
  employee_id: number;
  type: 'vacation' | 'sick_leave' | 'business_trip' | 'personal';
  start_date: string;
  end_date: string;
}

// ... остальные моки (mockEmployees, mockSchedules, mockExceptions) с типом Employee[]

// Сотрудники (расширенный массив)
export const mockEmployees = [
  // IT отдел (team_id: 1)
  { id: 1, first_name: 'Иван', last_name: 'Петров', user_id: 101, team_id: 1, is_active: true, patronymic: 'Иванович', position: 'Ведущий разработчик' },
  { id: 2, first_name: 'Петр', last_name: 'Сидоров', user_id: 102, team_id: 1, is_active: true, patronymic: 'Олегович', position: 'Разработчик' },
  { id: 3, first_name: 'Алексей', last_name: 'Смирнов', user_id: 103, team_id: 1, is_active: true, patronymic: 'Алексеевич', position: 'Аналитик' },
  { id: 4, first_name: 'Дмитрий', last_name: 'Козлов', user_id: 104, team_id: 1, is_active: true, patronymic: 'Дмитриевич', position: 'DevOps' },
  { id: 5, first_name: 'Екатерина', last_name: 'Волкова', user_id: 105, team_id: 1, is_active: true, patronymic: 'Андреевна', position: 'Тестировщик' },
  { id: 6, first_name: 'Михаил', last_name: 'Новиков', user_id: 106, team_id: 1, is_active: true, patronymic: 'Михайлович', position: 'Frontend' },
  { id: 7, first_name: 'Анна', last_name: 'Морозова', user_id: 107, team_id: 1, is_active: true, patronymic: 'Сергеевна', position: 'Backend' },
  { id: 8, first_name: 'Сергей', last_name: 'Лебедев', user_id: 108, team_id: 1, is_active: true, patronymic: 'Николаевич', position: 'Мобильный разработчик' },
  { id: 9, first_name: 'Ольга', last_name: 'Соколова', user_id: 109, team_id: 1, is_active: true, patronymic: 'Игоревна', position: 'Project Manager' },
  { id: 10, first_name: 'Игорь', last_name: 'Михайлов', user_id: 110, team_id: 1, is_active: true, patronymic: 'Владимирович', position: 'Системный администратор' },
  // Маркетинг (team_id: 2)
  { id: 11, first_name: 'Мария', last_name: 'Кузнецова', user_id: 111, team_id: 2, is_active: true, patronymic: 'Павловна', position: 'Маркетолог' },
  { id: 12, first_name: 'Елена', last_name: 'Попова', user_id: 112, team_id: 2, is_active: true, patronymic: 'Владимировна', position: 'SMM-менеджер' },
  { id: 13, first_name: 'Ирина', last_name: 'Васильева', user_id: 113, team_id: 2, is_active: true, patronymic: 'Алексеевна', position: 'PR-специалист' },
  { id: 14, first_name: 'Татьяна', last_name: 'Павлова', user_id: 114, team_id: 2, is_active: true, patronymic: 'Дмитриевна', position: 'Контент-мейкер' },
  { id: 15, first_name: 'Андрей', last_name: 'Федоров', user_id: 115, team_id: 2, is_active: true, patronymic: 'Андреевич', position: 'Аналитик маркетинга' },
  // Администрация (team_id: 3)
  { id: 16, first_name: 'Наталья', last_name: 'Орлова', user_id: 116, team_id: 3, is_active: true, patronymic: 'Константиновна', position: 'Бухгалтер' },
  { id: 17, first_name: 'Владимир', last_name: 'Титов', user_id: 117, team_id: 3, is_active: true, patronymic: 'Владимирович', position: 'Юрист' },
  { id: 18, first_name: 'Катерина', last_name: 'Белова', user_id: 118, team_id: 3, is_active: true, patronymic: 'Анатольевна', position: 'HR-менеджер' },
  { id: 19, first_name: 'Светлана', last_name: 'Некрасова', user_id: 119, team_id: 3, is_active: true, patronymic: 'Евгеньевна', position: 'Секретарь' },
  { id: 20, first_name: 'Григорий', last_name: 'Соловьев', user_id: 120, team_id: 3, is_active: true, patronymic: 'Борисович', position: 'Водитель' },
];

// Расписания для каждого сотрудника
export const mockSchedules: MockSchedule[] = mockEmployees.map(emp => {
  // Базовые часы по умолчанию
  let start = 9, end = 18;
  if (emp.team_id === 1) { // IT — гибкий
    start = 10;
    end = 19;
  } else if (emp.team_id === 2) { // Маркетинг — офис
    start = 9;
    end = 18;
  } else { // Администрация — стандарт
    start = 9;
    end = 18;
  }
  // Индивидуальные сдвиги
  if (emp.id === 2) { start = 8; end = 17; }
  if (emp.id === 6) { start = 11; end = 20; }
  if (emp.id === 12) { start = 10; end = 19; }
  if (emp.id === 17) { start = 9; end = 17; }

  return {
    employee_id: emp.id,
    work_days: [1,2,3,4,5],  // ПН-ПТ
    start_hour: start,
    end_hour: end,
    time_zone: 'Europe/Moscow',
  };
});

// Исключения (отпуска, больничные, командировки) в мае 2026
export const mockExceptions: MockException[] = [
  { employee_id: 1, type: 'vacation', start_date: '2026-05-10', end_date: '2026-05-20' },
  { employee_id: 5, type: 'sick_leave', start_date: '2026-05-15', end_date: '2026-05-18' },
  { employee_id: 8, type: 'business_trip', start_date: '2026-05-05', end_date: '2026-05-07' },
  { employee_id: 11, type: 'vacation', start_date: '2026-05-01', end_date: '2026-05-10' },
  { employee_id: 14, type: 'business_trip', start_date: '2026-05-20', end_date: '2026-05-22' },
  { employee_id: 17, type: 'sick_leave', start_date: '2026-05-25', end_date: '2026-05-28' },
  { employee_id: 19, type: 'personal', start_date: '2026-05-12', end_date: '2026-05-13' },
  { employee_id: 3, type: 'vacation', start_date: '2026-05-05', end_date: '2026-05-06' },   // короткий отпуск
  { employee_id: 7, type: 'sick_leave', start_date: '2026-05-18', end_date: '2026-05-19' },
  { employee_id: 13, type: 'business_trip', start_date: '2026-05-15', end_date: '2026-05-17' },
];