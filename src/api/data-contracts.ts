/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** WorkFormat */
export enum WorkFormat {
  Office = "office",
  Remote = "remote",
  Hybrid = "hybrid",
}

/** ScheduleExceptionType */
export enum ScheduleExceptionType {
  Vacation = "vacation",
  SickLeave = "sick_leave",
  Personal = "personal",
  BusinessTrip = "business_trip",
}

/** Role */
export enum Role {
  Employee = "employee",
  Manager = "manager",
  Hr = "hr",
}

/** EventType */
export enum EventType {
  Task = "task",
  Meeting = "meeting",
}

/** AvailabilityResponse */
export interface AvailabilityResponse {
  /** Month */
  month: number;
  /** Year */
  year: number;
  /** Total */
  total: number;
  /** Slots */
  slots: AvailabilitySlot[];
}

/** AvailabilitySlot */
export interface AvailabilitySlot {
  /** Date */
  date: string;
  /** Hour */
  hour: number;
  /** Available */
  available: number;
  /** Total */
  total: number;
  /** Unavailable Employee Ids */
  unavailable_employee_ids: number[];
}

/** Body_login_api_auth_login_post */
export interface BodyLoginApiAuthLoginPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /**
   * Password
   * @format password
   */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /**
   * Client Secret
   * @format password
   */
  client_secret?: string | null;
}

/** Employee */
export interface Employee {
  /**
   * Id
   * Уникальный идентификатор профиля сотрудника
   */
  id: number;
  /**
   * First Name
   * Имя сотрудника
   */
  first_name: string;
  /**
   * Last Name
   * Фамилия сотрудника
   */
  last_name: string;
  /**
   * Is Active
   * Активность профиля сотрудника
   */
  is_active: boolean;
  /**
   * User Id
   * ID пользователя, на которого зарегистрирован профиль
   */
  user_id: number;
  /**
   * Team Id
   * ID команды, в которой состоит сотрудник
   */
  team_id: number | null;
}

/** EmployeeCreate */
export interface EmployeeCreate {
  /**
   * First Name
   * Имя сотрудника, до 255 символов
   * @maxLength 255
   */
  first_name: string;
  /**
   * Last Name
   * Фамилия сотрудника, до 255 символов
   * @maxLength 255
   */
  last_name: string;
  /**
   * Team Id
   * ID команды, в которой состоит сотрудник
   */
  team_id: number | null;
  /**
   * User Id
   * ID пользователя, к которому прикреплены данные
   */
  user_id: number;
}

/** EmployeeUpdate */
export interface EmployeeUpdate {
  /**
   * First Name
   * Имя сотрудника, до 255 символов
   * @maxLength 255
   */
  first_name: string;
  /**
   * Last Name
   * Фамилия сотрудника, до 255 символов
   * @maxLength 255
   */
  last_name: string;
  /**
   * Team Id
   * ID команды, в которой состоит сотрудник
   */
  team_id: number | null;
}

/** Event */
export interface Event {
  /**
   * Id
   * Уникальный идентификатор события
   */
  id: number;
  /** Тип события */
  type: EventType;
  /**
   * Title
   * Название события
   */
  title: string;
  /**
   * Description
   * Описание события
   */
  description: string;
  /**
   * Start At
   * Дата и время начала события
   * @format date-time
   */
  start_at: string;
  /**
   * End At
   * Дата и время конца события
   * @format date-time
   */
  end_at: string;
  /**
   * Is Active
   * Активность события
   */
  is_active: boolean;
}

/** EventCreate */
export interface EventCreate {
  /** Тип события */
  type: EventType;
  /**
   * Title
   * Название события
   * @maxLength 150
   */
  title: string;
  /**
   * Description
   * Описание события
   * @maxLength 500
   */
  description: string;
  /**
   * Start At
   * Дата и время начала события
   * @format date-time
   */
  start_at: string;
  /**
   * End At
   * Дата и время конца события
   * @format date-time
   */
  end_at: string;
}

/** EventUpdate */
export interface EventUpdate {
  /** Тип события */
  type: EventType;
  /**
   * Title
   * Название события
   * @maxLength 150
   */
  title: string;
  /**
   * Description
   * Описание события
   * @maxLength 500
   */
  description: string;
  /**
   * Start At
   * Дата и время начала события
   * @format date-time
   */
  start_at: string;
  /**
   * End At
   * Дата и время конца события
   * @format date-time
   */
  end_at: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** Profile */
export interface Profile {
  user: User;
  employee: Employee | null;
  team: Team | null;
  schedule: Schedule | null;
  /** Schedule Exceptions */
  schedule_exceptions: ScheduleException[];
  /** Events */
  events: Event[];
}

/** RefreshTokenRequest */
export interface RefreshTokenRequest {
  /** Refresh Token */
  refresh_token: string;
}

/** Schedule */
export interface Schedule {
  /**
   * Id
   * Уникальный идентификатор поля
   */
  id: number;
  /**
   * Work Days
   * Дни, в которые работает сотрудник
   */
  work_days: number[];
  /**
   * Time Zone
   * Часовой пояс сотрудника
   */
  time_zone: string;
  /** Формат работы сотрудника */
  work_format: WorkFormat;
  /**
   * Start At
   * Начало работы сотрудника
   * @format time
   */
  start_at: string;
  /**
   * End At
   * Конец работы сотрудника
   * @format time
   */
  end_at: string;
  /**
   * Updated At
   * Время последнего обновления графика сотрудника
   * @format date-time
   */
  updated_at: string;
  /**
   * Is Active
   * Активность графика сотрудника
   */
  is_active: boolean;
  /**
   * Employee Id
   * ID сотрудника, которому принадлежит график
   */
  employee_id: number;
}

/** ScheduleCreate */
export interface ScheduleCreate {
  /**
   * Work Days
   * Дни, в которые работает сотрудник
   */
  work_days: number[];
  /**
   * Time Zone
   * Часовой пояс сотрудника
   */
  time_zone: string;
  /** Формат работы сотрудника */
  work_format: WorkFormat;
  /**
   * Start At
   * Начало работы сотрудника
   * @format time
   */
  start_at: string;
  /**
   * End At
   * Конец работы сотрудника
   * @format time
   */
  end_at: string;
  /**
   * Employee Id
   * @default "ID сотрудника, которому принадлежит график"
   */
  employee_id?: number;
}

/** ScheduleException */
export interface ScheduleException {
  /**
   * Id
   * Уникальный идентификатор временного исключения
   */
  id: number;
  /** Тип временного исключения */
  type: ScheduleExceptionType;
  /**
   * Description
   * Описание временного исключения
   */
  description: string | null;
  /**
   * Start Date
   * Дата начала временного исключения
   * @format date
   */
  start_date: string;
  /**
   * End Date
   * Дата конца временного исключения
   * @format date
   */
  end_date: string;
  /**
   * Is Active
   * Активность временного исключения
   */
  is_active: boolean;
  /**
   * Employee Id
   * ID сотрудника, которому принадлежит временное исключение
   */
  employee_id: number;
}

/** ScheduleExceptionCreate */
export interface ScheduleExceptionCreate {
  /** Тип временного исключения */
  type: ScheduleExceptionType;
  /**
   * Description
   * Описание временного исключения, до 500 символов
   */
  description: string | null;
  /**
   * Start Date
   * Дата начала временного исключения
   * @format date
   */
  start_date: string;
  /**
   * End Date
   * Дата конца временного исключения
   * @format date
   */
  end_date: string;
  /**
   * Employee Id
   * ID сотрудника, которому принадлежит временное исключение
   */
  employee_id: number;
}

/** ScheduleExceptionUpdate */
export interface ScheduleExceptionUpdate {
  /** Тип временного исключения */
  type: ScheduleExceptionType;
  /**
   * Description
   * Описание временного исключения, до 500 символов
   */
  description: string | null;
  /**
   * Start Date
   * Дата начала временного исключения
   * @format date
   */
  start_date: string;
  /**
   * End Date
   * Дата конца временного исключения
   * @format date
   */
  end_date: string;
}

/** ScheduleUpdate */
export interface ScheduleUpdate {
  /**
   * Work Days
   * Дни, в которые работает сотрудник
   */
  work_days: number[];
  /**
   * Time Zone
   * Часовой пояс сотрудника
   */
  time_zone: string;
  /** Формат работы сотрудника */
  work_format: WorkFormat;
  /**
   * Start At
   * Начало работы сотрудника
   * @format time
   */
  start_at: string;
  /**
   * End At
   * Конец работы сотрудника
   * @format time
   */
  end_at: string;
}

/** Team */
export interface Team {
  /**
   * Id
   * Уникальный идентификатор команды
   */
  id: number;
  /**
   * Name
   * Название команды
   */
  name: string;
  /**
   * Description
   * Описание команды
   */
  description: string | null;
  /**
   * Is Active
   * Активность команды
   */
  is_active: boolean;
  /**
   * Manager Id
   * ID менеджера команды
   */
  manager_id: number;
}

/** TeamCreate */
export interface TeamCreate {
  /**
   * Name
   * Название команды, до 255 символов
   */
  name: string;
  /**
   * Description
   * Описание команды, до 500 символов
   */
  description: string | null;
  /**
   * Manager Id
   * ID менеджера команды
   */
  manager_id: number;
}

/** TeamUpdate */
export interface TeamUpdate {
  /**
   * Name
   * Название команды, до 255 символов
   */
  name: string;
  /**
   * Description
   * Описание команды, до 500 символов
   */
  description: string | null;
  /**
   * Manager Id
   * ID менеджера команды
   */
  manager_id: number;
}

/** Tokens */
export interface Tokens {
  /** Access Token */
  access_token: string;
  /** Refresh Token */
  refresh_token: string;
  /**
   * Token Type
   * @default "bearer"
   */
  token_type?: string;
}

/** User */
export interface User {
  /**
   * Id
   * Уникальный индентификатор пользователя
   */
  id: number;
  /**
   * Email
   * Электронная почта пользователя
   */
  email: string;
  /** Роль пользователя */
  role: Role;
  /**
   * Is Active
   * Активность пользователя
   */
  is_active: boolean;
}

/** UserCreate */
export interface UserCreate {
  /**
   * Email
   * Электронная почта пользователя, до 255 символов
   * @format email
   * @maxLength 255
   */
  email: string;
  /**
   * Password
   * Пароль, до 255 символов
   * @maxLength 255
   */
  password: string;
}

/** UserFullCreate */
export interface UserFullCreate {
  /**
   * Email
   * Электронная почта пользователя, до 255 символов
   * @format email
   * @maxLength 255
   */
  email: string;
  /**
   * Password
   * Пароль, до 255 символов
   * @maxLength 255
   */
  password: string;
  /** Роль пользователя: manager, HR или employee */
  role: Role;
}

/** UserUpdate */
export interface UserUpdate {
  /**
   * Email
   * Электронная почта пользователя, до 255 символов
   */
  email: string | null;
  /** Роль пользователя: manager, HR или employee */
  role: Role | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}
