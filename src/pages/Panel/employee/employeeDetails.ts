
export interface EmployeePersonal {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;       // "IT", "Маркетинг", "Администрация" и т.д.
  position: string;         // должность
  schedule: {
    days: string;           // "Пн-Пт"
    hours: string;          // "09:00-18:00"
    timezone: string;       // "MSK"
  };
  exceptions: {
    type: "vacation" | "sick" | "business_trip";
    startDate: string;      // "YYYY-MM-DD"
    endDate: string;
    comment?: string;
  }[];
}


export const employeeDetails: Record<number, EmployeePersonal> = {
  1: {
    id: 1,
    firstName: "Александр",
    lastName: "Иванов",
    email: "a.ivanov@example.com",
    department: "IT",
    position: "Senior Developer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [
      { type: "vacation", startDate: "2026-06-10", endDate: "2026-06-20", comment: "Отпуск" }
    ],
  },
  2: {
    id: 2,
    firstName: "Мария",
    lastName: "Петрова",
    email: "m.petrova@example.com",
    department: "Маркетинг",
    position: "Marketing Lead",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK+1" },
    exceptions: [],
  },
  3: {
    id: 3,
    firstName: "Константин",
    lastName: "Сидоров",
    email: "k.sidorov@example.com",
    department: "IT",
    position: "Team Lead",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  4: {
    id: 4,
    firstName: "Елена",
    lastName: "Козлова",
    email: "e.kozlova@example.com",
    department: "Администрация",
    position: "HR Manager",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK+2" },
    exceptions: [
      { type: "sick", startDate: "2026-05-20", endDate: "2026-05-22", comment: "Больничный" }
    ],
  },
  5: {
    id: 5,
    firstName: "Дмитрий",
    lastName: "Смирнов",
    email: "d.smirnov@example.com",
    department: "IT",
    position: "Developer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  6: {
    id: 6,
    firstName: "Анна",
    lastName: "Васильева",
    email: "a.vasilyeva@example.com",
    department: "Маркетинг",
    position: "Content Manager",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK" },
    exceptions: [],
  },
  7: {
    id: 7,
    firstName: "Игорь",
    lastName: "Михайлов",
    email: "i.mikhailov@example.com",
    department: "Администрация",
    position: "Accountant",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK-1" },
    exceptions: [],
  },
  8: {
    id: 8,
    firstName: "Татьяна",
    lastName: "Новикова",
    email: "t.novikova@example.com",
    department: "IT",
    position: "QA Engineer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  9: {
    id: 9,
    firstName: "Алексей",
    lastName: "Фёдоров",
    email: "a.fedorov@example.com",
    department: "Маркетинг",
    position: "SEO Specialist",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK" },
    exceptions: [],
  },
  10: {
    id: 10,
    firstName: "Ольга",
    lastName: "Морозова",
    email: "o.morozova@example.com",
    department: "IT",
    position: "Project Manager",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK+3" },
    exceptions: [],
  },
  11: {
    id: 11,
    firstName: "Владимир",
    lastName: "Волков",
    email: "v.volkov@example.com",
    department: "IT",
    position: "Backend Developer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  12: {
    id: 12,
    firstName: "Светлана",
    lastName: "Зайцева",
    email: "s.zaytseva@example.com",
    department: "Маркетинг",
    position: "SMM Manager",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK+1" },
    exceptions: [],
  },
  13: {
    id: 13,
    firstName: "Павел",
    lastName: "Соколов",
    email: "p.sokolov@example.com",
    department: "Администрация",
    position: "Lawyer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  14: {
    id: 14,
    firstName: "Наталья",
    lastName: "Лебедева",
    email: "n.lebedeva@example.com",
    department: "IT",
    position: "Frontend Developer",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  15: {
    id: 15,
    firstName: "Максим",
    lastName: "Козлов",
    email: "m.kozlov@example.com",
    department: "Маркетинг",
    position: "Analyst",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK" },
    exceptions: [],
  },
  16: {
    id: 16,
    firstName: "Екатерина",
    lastName: "Попова",
    email: "e.popova@example.com",
    department: "IT",
    position: "DevOps",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  17: {
    id: 17,
    firstName: "Андрей",
    lastName: "Орлов",
    email: "a.orlov@example.com",
    department: "Администрация",
    position: "Office Manager",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  18: {
    id: 18,
    firstName: "Юлия",
    lastName: "Крылова",
    email: "y.krylova@example.com",
    department: "Маркетинг",
    position: "PR Manager",
    schedule: { days: "Пн-Пт", hours: "10:00-19:00", timezone: "MSK-2" },
    exceptions: [],
  },
  19: {
    id: 19,
    firstName: "Николай",
    lastName: "Тимофеев",
    email: "n.timofeev@example.com",
    department: "IT",
    position: "System Administrator",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
  20: {
    id: 20,
    firstName: "Ирина",
    lastName: "Белова",
    email: "i.belova@example.com",
    department: "Администрация",
    position: "Recruiter",
    schedule: { days: "Пн-Пт", hours: "09:00-18:00", timezone: "MSK" },
    exceptions: [],
  },
};

// Удобная функция для получения данных сотрудника с fallback
export const getEmployeeDetails = (id: number): EmployeePersonal => {
  return employeeDetails[id] || {
    id,
    firstName: "Неизвестно",
    lastName: "Сотрудник",
    email: "",
    department: "—",
    position: "—",
    schedule: { days: "—", hours: "—", timezone: "—" },
    exceptions: [],
  };
};