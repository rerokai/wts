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

import {
  AvailabilityResponse,
  BodyLoginApiAuthLoginPost,
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
  Event,
  EventCreate,
  EventUpdate,
  HTTPValidationError,
  Profile,
  RefreshTokenRequest,
  Schedule,
  ScheduleCreate,
  ScheduleException,
  ScheduleExceptionCreate,
  ScheduleExceptionUpdate,
  ScheduleUpdate,
  Team,
  TeamCreate,
  TeamUpdate,
  Tokens,
  User,
  UserCreate,
  UserFullCreate,
  UserUpdate,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Выполняет логин пользователя, возвращает access и refresh JWT
   *
   * @tags auth
   * @name LoginApiAuthLoginPost
   * @summary Login
   * @request POST:/api/auth/login
   */
  loginApiAuthLoginPost = (
    data: BodyLoginApiAuthLoginPost,
    params: RequestParams = {},
  ) =>
    this.request<Tokens, HTTPValidationError>({
      path: `/api/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });
  /**
   * @description Выдает новый access JWT по refresh JWT
   *
   * @tags auth
   * @name RefreshTokenApiAuthRefreshPost
   * @summary Refresh Token
   * @request POST:/api/auth/refresh
   */
  refreshTokenApiAuthRefreshPost = (
    data: RefreshTokenRequest,
    params: RequestParams = {},
  ) =>
    this.request<Tokens, HTTPValidationError>({
      path: `/api/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение собственного пользователя.
   *
   * @tags users
   * @name GetMyUserApiUsersMeGet
   * @summary Get My User
   * @request GET:/api/users/me
   * @secure
   */
  getMyUserApiUsersMeGet = (params: RequestParams = {}) =>
    this.request<User, any>({
      path: `/api/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение пользователя по его id. Доступно роли "HR".
   *
   * @tags users
   * @name GetUserByIdApiUsersIdGet
   * @summary Get User By Id
   * @request GET:/api/users/{id}
   * @secure
   */
  getUserByIdApiUsersIdGet = (id: number, params: RequestParams = {}) =>
    this.request<User, HTTPValidationError>({
      path: `/api/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Обновление пользователя от роли "HR".
   *
   * @tags users
   * @name UpdateUserApiUsersIdPatch
   * @summary Update User
   * @request PATCH:/api/users/{id}
   * @secure
   */
  updateUserApiUsersIdPatch = (
    id: number,
    data: UserUpdate,
    params: RequestParams = {},
  ) =>
    this.request<User, HTTPValidationError>({
      path: `/api/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Деактивация пользователя от роли "HR".
   *
   * @tags users
   * @name DeactivateUserApiUsersIdDelete
   * @summary Deactivate User
   * @request DELETE:/api/users/{id}
   * @secure
   */
  deactivateUserApiUsersIdDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, HTTPValidationError>({
      path: `/api/users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Регистрация нового пользователя без авторизации с ролью "employee".
   *
   * @tags users
   * @name RegisterEmployeeApiUsersRegisterPost
   * @summary Register Employee
   * @request POST:/api/users/register
   */
  registerEmployeeApiUsersRegisterPost = (
    data: UserCreate,
    params: RequestParams = {},
  ) =>
    this.request<User, HTTPValidationError>({
      path: `/api/users/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Регистрация нового пользователя от роли "HR".
   *
   * @tags users
   * @name RegisterAnyUserApiUsersPost
   * @summary Register Any User
   * @request POST:/api/users/
   * @secure
   */
  registerAnyUserApiUsersPost = (
    data: UserFullCreate,
    params: RequestParams = {},
  ) =>
    this.request<User, HTTPValidationError>({
      path: `/api/users/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Активация пользователя от роли "HR".
   *
   * @tags users
   * @name ActivateUserApiUsersIdActivatePatch
   * @summary Activate User
   * @request PATCH:/api/users/{id}/activate
   * @secure
   */
  activateUserApiUsersIdActivatePatch = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/api/users/${id}/activate`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Получение всех команд для ролей "employee", "manager", "HR". "HR" доступны все команды, "manager" только свои.
   *
   * @tags teams
   * @name GetAllTeamsApiTeamsGet
   * @summary Get All Teams
   * @request GET:/api/teams/
   * @secure
   */
  getAllTeamsApiTeamsGet = (params: RequestParams = {}) =>
    this.request<Team[], any>({
      path: `/api/teams/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создание команды для ролей "manager", "HR". "HR" может создать команду с любым руководителем, "manager" только для себя.
   *
   * @tags teams
   * @name CreateTeamApiTeamsPost
   * @summary Create Team
   * @request POST:/api/teams/
   * @secure
   */
  createTeamApiTeamsPost = (data: TeamCreate, params: RequestParams = {}) =>
    this.request<Team, HTTPValidationError>({
      path: `/api/teams/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение своей команды.
   *
   * @tags teams
   * @name GetMyTeamApiTeamsMeGet
   * @summary Get My Team
   * @request GET:/api/teams/me
   * @secure
   */
  getMyTeamApiTeamsMeGet = (params: RequestParams = {}) =>
    this.request<Team, any>({
      path: `/api/teams/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение команды по id для ролей "manager", "HR". "HR" доступны все команды, "manager" только свои.
   *
   * @tags teams
   * @name GetTeamByIdApiTeamsIdGet
   * @summary Get Team By Id
   * @request GET:/api/teams/{id}
   * @secure
   */
  getTeamByIdApiTeamsIdGet = (id: number, params: RequestParams = {}) =>
    this.request<Team, HTTPValidationError>({
      path: `/api/teams/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Обновление команды для ролей "manager", "HR". "HR" может обновлять любые команды, "manager" только свои.
   *
   * @tags teams
   * @name UpdateTeamApiTeamsIdPut
   * @summary Update Team
   * @request PUT:/api/teams/{id}
   * @secure
   */
  updateTeamApiTeamsIdPut = (
    id: number,
    data: TeamUpdate,
    params: RequestParams = {},
  ) =>
    this.request<Team, HTTPValidationError>({
      path: `/api/teams/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Деактивация команды для ролей "manager", "HR". "HR" может деактивировать любые команды, "manager" только свои.
   *
   * @tags teams
   * @name DeactivateTeamApiTeamsIdDelete
   * @summary Deactivate Team
   * @request DELETE:/api/teams/{id}
   * @secure
   */
  deactivateTeamApiTeamsIdDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, HTTPValidationError>({
      path: `/api/teams/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Активация команды для ролей "manager", "HR". "HR" может деактивировать любые команды, "manager" только свои.
   *
   * @tags teams
   * @name ActivateTeamApiTeamsIdPatch
   * @summary Activate Team
   * @request PATCH:/api/teams/{id}
   * @secure
   */
  activateTeamApiTeamsIdPatch = (id: number, params: RequestParams = {}) =>
    this.request<void, HTTPValidationError>({
      path: `/api/teams/${id}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Получение всех данных сотрудников для ролей "manager", "HR". "HR" просматривает всех сотрудников, "manager" только тех, кто а его командах.
   *
   * @tags employees
   * @name GetAllEmployeesApiEmployeesGet
   * @summary Get All Employees
   * @request GET:/api/employees/
   * @secure
   */
  getAllEmployeesApiEmployeesGet = (params: RequestParams = {}) =>
    this.request<Employee[], any>({
      path: `/api/employees/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Добавление данных сотрудника для ролей "manager", "HR". "HR" может добавить любого сотрудника, "manager" только в свою команду.
   *
   * @tags employees
   * @name CreateEmployeeApiEmployeesPost
   * @summary Create Employee
   * @request POST:/api/employees/
   * @secure
   */
  createEmployeeApiEmployeesPost = (
    data: EmployeeCreate,
    params: RequestParams = {},
  ) =>
    this.request<Employee, HTTPValidationError>({
      path: `/api/employees/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Обновление данных сотрудника для ролей "manager", "HR". "HR" может поменять данные любого сотрудника, "manager" только тех, кто в его команде.
   *
   * @tags employees
   * @name UpdateEmployeeApiEmployeesPut
   * @summary Update Employee
   * @request PUT:/api/employees/
   * @secure
   */
  updateEmployeeApiEmployeesPut = (
    query: {
      /** Id */
      id: number;
    },
    data: EmployeeUpdate,
    params: RequestParams = {},
  ) =>
    this.request<Employee, HTTPValidationError>({
      path: `/api/employees/`,
      method: "PUT",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение собственных данных.
   *
   * @tags employees
   * @name GetMyEmployeeApiEmployeesMeGet
   * @summary Get My Employee
   * @request GET:/api/employees/me
   * @secure
   */
  getMyEmployeeApiEmployeesMeGet = (params: RequestParams = {}) =>
    this.request<Employee, any>({
      path: `/api/employees/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение данных сотрудника по ID для ролей "manager", "HR". "HR" может просмотреть любого сотрудника, "manager" только тех, кто в его командах.
   *
   * @tags employees
   * @name GetEmployeeByIdApiEmployeesIdGet
   * @summary Get Employee By Id
   * @request GET:/api/employees/{id}
   * @secure
   */
  getEmployeeByIdApiEmployeesIdGet = (id: number, params: RequestParams = {}) =>
    this.request<Employee, HTTPValidationError>({
      path: `/api/employees/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение всех графиков для ролей "manager", "hr". "hr" получает все графики, "manager" графики только тех, кто состоит в его командах.
   *
   * @tags schedules
   * @name GetAllSchedulesApiSchedulesGet
   * @summary Get All Schedules
   * @request GET:/api/schedules/
   * @secure
   */
  getAllSchedulesApiSchedulesGet = (params: RequestParams = {}) =>
    this.request<Schedule[], any>({
      path: `/api/schedules/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создание графика дял всех ролей. "hr" может создавать график для всех, "manager" для тех,кто в его командах, "employee" для себя. Создать график можно только для сотрудника с ролью "employee".
   *
   * @tags schedules
   * @name CreateScheduleApiSchedulesPost
   * @summary Create Schedule
   * @request POST:/api/schedules/
   * @secure
   */
  createScheduleApiSchedulesPost = (
    data: ScheduleCreate,
    params: RequestParams = {},
  ) =>
    this.request<Schedule, HTTPValidationError>({
      path: `/api/schedules/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение собственного графика.
   *
   * @tags schedules
   * @name GetMyScheduleApiSchedulesMeGet
   * @summary Get My Schedule
   * @request GET:/api/schedules/me
   * @secure
   */
  getMyScheduleApiSchedulesMeGet = (params: RequestParams = {}) =>
    this.request<Schedule, any>({
      path: `/api/schedules/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение всех графика по его ID для ролей "manager", "hr". "hr" может получить все графики, "manager" графики только тех, кто состоит в его командах.
   *
   * @tags schedules
   * @name GetScheduleByIdApiSchedulesIdGet
   * @summary Get Schedule By Id
   * @request GET:/api/schedules/{id}
   * @secure
   */
  getScheduleByIdApiSchedulesIdGet = (id: number, params: RequestParams = {}) =>
    this.request<Schedule, HTTPValidationError>({
      path: `/api/schedules/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Обновление графика дял всех ролей. "hr" может обновлять график для всех, "manager" для тех,кто в его командах, "employee" для себя. Создать график можно только для сотрудника с ролью "employee".
   *
   * @tags schedules
   * @name UpdateScheduleApiSchedulesIdPut
   * @summary Update Schedule
   * @request PUT:/api/schedules/{id}
   * @secure
   */
  updateScheduleApiSchedulesIdPut = (
    id: number,
    data: ScheduleUpdate,
    params: RequestParams = {},
  ) =>
    this.request<Schedule, HTTPValidationError>({
      path: `/api/schedules/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение всех временных исключений для любой роли. "hr" просматривает все, "manager" только сотрудников, в чьей команде он состоит "employee" только свои.
   *
   * @tags schedule_exceptions
   * @name GetAllScheduleExceptionsApiScheduleExceptionsGet
   * @summary Get All Schedule Exceptions
   * @request GET:/api/schedule_exceptions/
   * @secure
   */
  getAllScheduleExceptionsApiScheduleExceptionsGet = (
    params: RequestParams = {},
  ) =>
    this.request<ScheduleException[], any>({
      path: `/api/schedule_exceptions/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создание временного исключения для любой роли. "hr" может создать для всех, "manager" только для сотрудника в его командах "employee" только для себя.
   *
   * @tags schedule_exceptions
   * @name CreateScheduleExceptionApiScheduleExceptionsPost
   * @summary Create Schedule Exception
   * @request POST:/api/schedule_exceptions/
   * @secure
   */
  createScheduleExceptionApiScheduleExceptionsPost = (
    data: ScheduleExceptionCreate,
    params: RequestParams = {},
  ) =>
    this.request<ScheduleException, HTTPValidationError>({
      path: `/api/schedule_exceptions/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение своих временных исключений.
   *
   * @tags schedule_exceptions
   * @name GetAllMyApiScheduleExceptionsMeGet
   * @summary Get All My
   * @request GET:/api/schedule_exceptions/me
   * @secure
   */
  getAllMyApiScheduleExceptionsMeGet = (params: RequestParams = {}) =>
    this.request<ScheduleException, any>({
      path: `/api/schedule_exceptions/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение временного исключения по id для любой роли. "hr" просматривает все, "manager" только сотрудников, в чьих командах он состоит "employee" только свои.
   *
   * @tags schedule_exceptions
   * @name GetScheduleExceptionByIdApiScheduleExceptionsIdGet
   * @summary Get Schedule Exception By Id
   * @request GET:/api/schedule_exceptions/{id}
   * @secure
   */
  getScheduleExceptionByIdApiScheduleExceptionsIdGet = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<ScheduleException, HTTPValidationError>({
      path: `/api/schedule_exceptions/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Оьновление временного исключения по id для любой роли. "hr" может обновлять для всех, "manager" только для сотрудника в его командах "employee" только для себя.
   *
   * @tags schedule_exceptions
   * @name UpdateScheduleExceptionApiScheduleExceptionsIdPut
   * @summary Update Schedule Exception
   * @request PUT:/api/schedule_exceptions/{id}
   * @secure
   */
  updateScheduleExceptionApiScheduleExceptionsIdPut = (
    id: number,
    data: ScheduleExceptionUpdate,
    params: RequestParams = {},
  ) =>
    this.request<ScheduleException, HTTPValidationError>({
      path: `/api/schedule_exceptions/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение всех событий для любой роли. "hr" получает все, "manager" только те, в которых участвует хотя бы один сотрудник из его команд, "employee" только свои.
   *
   * @tags events
   * @name GetAllEventsApiEventsGet
   * @summary Get All Events
   * @request GET:/api/events/
   * @secure
   */
  getAllEventsApiEventsGet = (params: RequestParams = {}) =>
    this.request<Event[], any>({
      path: `/api/events/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Создание события для ролей "manager", "hr". "hr" может создать для любого сотрудника, "manager" только для сотрудников из своих команд.
   *
   * @tags events
   * @name CreateEventApiEventsPost
   * @summary Create Event
   * @request POST:/api/events/
   * @secure
   */
  createEventApiEventsPost = (data: EventCreate, params: RequestParams = {}) =>
    this.request<Event, HTTPValidationError>({
      path: `/api/events/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение собственных событий для любой роли.
   *
   * @tags events
   * @name GetMyEventsApiEventsMeGet
   * @summary Get My Events
   * @request GET:/api/events/me
   * @secure
   */
  getMyEventsApiEventsMeGet = (params: RequestParams = {}) =>
    this.request<Event[], any>({
      path: `/api/events/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение события по ID для любой роли. "hr" может получить любое, "manager" только если в нём есть сотрудник из его команд, "employee" только своё.
   *
   * @tags events
   * @name GetEventByIdApiEventsIdGet
   * @summary Get Event By Id
   * @request GET:/api/events/{id}
   * @secure
   */
  getEventByIdApiEventsIdGet = (id: number, params: RequestParams = {}) =>
    this.request<Event, HTTPValidationError>({
      path: `/api/events/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Обновление события для ролей "manager", "hr". "hr" может обновить любое, "manager" только если в нём есть сотрудник из его команд.
   *
   * @tags events
   * @name UpdateEventApiEventsIdPut
   * @summary Update Event
   * @request PUT:/api/events/{id}
   * @secure
   */
  updateEventApiEventsIdPut = (
    id: number,
    data: EventUpdate,
    params: RequestParams = {},
  ) =>
    this.request<Event, HTTPValidationError>({
      path: `/api/events/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Получение участников события по ID события. "hr" видит всех, "manager" только сотрудников из своих команд, "employee" всех сотрудников из своей команды участвующих в событии.
   *
   * @tags events
   * @name GetEmployeesByEventIdApiEventsIdEmployeesGet
   * @summary Get Employees By Event Id
   * @request GET:/api/events/{id}/employees
   * @secure
   */
  getEmployeesByEventIdApiEventsIdEmployeesGet = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<Employee[], HTTPValidationError>({
      path: `/api/events/${id}/employees`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Добавление сотрудника к событию. "hr" может добавить любого, "manager" только из своих команд.
   *
   * @tags events
   * @name AddEmployeeToEventApiEventsEventIdEmployeesEmployeeIdPost
   * @summary Add Employee To Event
   * @request POST:/api/events/{event_id}/employees/{employee_id}
   * @secure
   */
  addEmployeeToEventApiEventsEventIdEmployeesEmployeeIdPost = (
    eventId: number,
    employeeId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/api/events/${eventId}/employees/${employeeId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Удаление сотрудника из события. "hr" может удалить любого, "manager" только из своих команд.
   *
   * @tags events
   * @name RemoveEmployeeFromEventApiEventsEventIdEmployeesEmployeeIdDelete
   * @summary Remove Employee From Event
   * @request DELETE:/api/events/{event_id}/employees/{employee_id}
   * @secure
   */
  removeEmployeeFromEventApiEventsEventIdEmployeesEmployeeIdDelete = (
    eventId: number,
    employeeId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/api/events/${eventId}/employees/${employeeId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Получение всех профилей. "hr" получает все, "manager" только из своих команд.
   *
   * @tags profiles
   * @name GetAllProfilesApiProfilesGet
   * @summary Get All Profiles
   * @request GET:/api/profiles/
   * @secure
   */
  getAllProfilesApiProfilesGet = (params: RequestParams = {}) =>
    this.request<Profile[], any>({
      path: `/api/profiles/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение собственного профиля для любой роли.
   *
   * @tags profiles
   * @name GetMyProfileApiProfilesMeGet
   * @summary Get My Profile
   * @request GET:/api/profiles/me
   * @secure
   */
  getMyProfileApiProfilesMeGet = (params: RequestParams = {}) =>
    this.request<Profile, any>({
      path: `/api/profiles/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Получение профиля по user_id. "hr" может получить любой, "manager" только из своих команд.
   *
   * @tags profiles
   * @name GetProfileByIdApiProfilesUserIdGet
   * @summary Get Profile By Id
   * @request GET:/api/profiles/{user_id}
   * @secure
   */
  getProfileByIdApiProfilesUserIdGet = (
    userId: number,
    params: RequestParams = {},
  ) =>
    this.request<Profile, HTTPValidationError>({
      path: `/api/profiles/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags availability_map
   * @name GetAvailabilityMapApiAvailabilityMapGet
   * @summary Get Availability Map
   * @request GET:/api/availability_map/
   * @secure
   */
  getAvailabilityMapApiAvailabilityMapGet = (
    query: {
      /**
       * Month
       * @min 1
       * @max 12
       */
      month: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<AvailabilityResponse, HTTPValidationError>({
      path: `/api/availability_map/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
