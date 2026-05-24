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

/** Role */
export enum Role {
  Employee = "employee",
  Manager = "manager",
  Hr = "hr",
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
  team_id: number;
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
  team_id: number;
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
  team_id: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** RefreshTokenRequest */
export interface RefreshTokenRequest {
  /** Refresh Token */
  refresh_token: string;
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title WorkTime Sync
 * @version 1.4.8.8
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Выполняет логин пользователя, возвращает access и refresh JWT
     *
     * @tags auth
     * @name LoginApiAuthLoginPost
     * @summary Login
     * @request POST:/api/auth/login
     */
    loginApiAuthLoginPost: (
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
      }),

    /**
     * @description Выдает новый access JWT по refresh JWT
     *
     * @tags auth
     * @name RefreshTokenApiAuthRefreshPost
     * @summary Refresh Token
     * @request POST:/api/auth/refresh
     */
    refreshTokenApiAuthRefreshPost: (
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
      }),

    /**
     * @description Получение собственного пользователя.
     *
     * @tags users
     * @name GetMyUserApiUsersMeGet
     * @summary Get My User
     * @request GET:/api/users/me
     * @secure
     */
    getMyUserApiUsersMeGet: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение пользователя по его id. Доступно роли "HR".
     *
     * @tags users
     * @name GetUserByIdApiUsersIdGet
     * @summary Get User By Id
     * @request GET:/api/users/{id}
     * @secure
     */
    getUserByIdApiUsersIdGet: (id: number, params: RequestParams = {}) =>
      this.request<User, HTTPValidationError>({
        path: `/api/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление пользователя от роли "HR".
     *
     * @tags users
     * @name UpdateUserApiUsersIdPatch
     * @summary Update User
     * @request PATCH:/api/users/{id}
     * @secure
     */
    updateUserApiUsersIdPatch: (
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
      }),

    /**
     * @description Деактивация пользователя от роли "HR".
     *
     * @tags users
     * @name DeactivateUserApiUsersIdDelete
     * @summary Deactivate User
     * @request DELETE:/api/users/{id}
     * @secure
     */
    deactivateUserApiUsersIdDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, HTTPValidationError>({
        path: `/api/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Регистрация нового пользователя без авторизации с ролью "employee".
     *
     * @tags users
     * @name RegisterEmployeeApiUsersRegisterPost
     * @summary Register Employee
     * @request POST:/api/users/register
     */
    registerEmployeeApiUsersRegisterPost: (
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
      }),

    /**
     * @description Регистрация нового пользователя от роли "HR".
     *
     * @tags users
     * @name RegisterAnyUserApiUsersPost
     * @summary Register Any User
     * @request POST:/api/users/
     * @secure
     */
    registerAnyUserApiUsersPost: (
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
      }),

    /**
     * @description Активация пользователя от роли "HR".
     *
     * @tags users
     * @name ActivateUserApiUsersIdActivatePatch
     * @summary Activate User
     * @request PATCH:/api/users/{id}/activate
     * @secure
     */
    activateUserApiUsersIdActivatePatch: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/users/${id}/activate`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Получение всех команд для ролей "employee", "manager", "HR". "HR" доступны все команды, "manager" только свои.
     *
     * @tags teams
     * @name GetAllTeamsApiTeamsGet
     * @summary Get All Teams
     * @request GET:/api/teams/
     * @secure
     */
    getAllTeamsApiTeamsGet: (params: RequestParams = {}) =>
      this.request<Team[], any>({
        path: `/api/teams/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание команды для ролей "manager", "HR". "HR" может создать команду с любым руководителем, "manager" только для себя.
     *
     * @tags teams
     * @name CreateTeamApiTeamsPost
     * @summary Create Team
     * @request POST:/api/teams/
     * @secure
     */
    createTeamApiTeamsPost: (data: TeamCreate, params: RequestParams = {}) =>
      this.request<Team, HTTPValidationError>({
        path: `/api/teams/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение своей команды.
     *
     * @tags teams
     * @name GetMyTeamApiTeamsMeGet
     * @summary Get My Team
     * @request GET:/api/teams/me
     * @secure
     */
    getMyTeamApiTeamsMeGet: (params: RequestParams = {}) =>
      this.request<Team, any>({
        path: `/api/teams/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение команды по id для ролей "manager", "HR". "HR" доступны все команды, "manager" только свои.
     *
     * @tags teams
     * @name GetTeamByIdApiTeamsIdGet
     * @summary Get Team By Id
     * @request GET:/api/teams/{id}
     * @secure
     */
    getTeamByIdApiTeamsIdGet: (id: number, params: RequestParams = {}) =>
      this.request<Team, HTTPValidationError>({
        path: `/api/teams/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление команды для ролей "manager", "HR". "HR" может обновлять любые команды, "manager" только свои.
     *
     * @tags teams
     * @name UpdateTeamApiTeamsIdPut
     * @summary Update Team
     * @request PUT:/api/teams/{id}
     * @secure
     */
    updateTeamApiTeamsIdPut: (
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
      }),

    /**
     * @description Деактивация команды для ролей "manager", "HR". "HR" может деактивировать любые команды, "manager" только свои.
     *
     * @tags teams
     * @name DeactivateTeamApiTeamsIdDelete
     * @summary Deactivate Team
     * @request DELETE:/api/teams/{id}
     * @secure
     */
    deactivateTeamApiTeamsIdDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, HTTPValidationError>({
        path: `/api/teams/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Активация команды для ролей "manager", "HR". "HR" может деактивировать любые команды, "manager" только свои.
     *
     * @tags teams
     * @name ActivateTeamApiTeamsIdPatch
     * @summary Activate Team
     * @request PATCH:/api/teams/{id}
     * @secure
     */
    activateTeamApiTeamsIdPatch: (id: number, params: RequestParams = {}) =>
      this.request<void, HTTPValidationError>({
        path: `/api/teams/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Получение всех данных сотрудников для ролей "manager", "HR". "HR" просматривает всех сотрудников, "manager" только тех, кто а его командах.
     *
     * @tags employees
     * @name GetAllEmployeesApiEmployeesGet
     * @summary Get All Employees
     * @request GET:/api/employees/
     * @secure
     */
    getAllEmployeesApiEmployeesGet: (params: RequestParams = {}) =>
      this.request<Employee[], any>({
        path: `/api/employees/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление данных сотрудника для ролей "manager", "HR". "HR" может добавить любого сотрудника, "manager" только в свою команду.
     *
     * @tags employees
     * @name CreateEmployeeApiEmployeesPost
     * @summary Create Employee
     * @request POST:/api/employees/
     * @secure
     */
    createEmployeeApiEmployeesPost: (
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
      }),

    /**
     * @description Обновление данных сотрудника для ролей "manager", "HR". "HR" может поменять данные любого сотрудника, "manager" только тех, кто в его команде.
     *
     * @tags employees
     * @name UpdateEmployeeApiEmployeesPut
     * @summary Update Employee
     * @request PUT:/api/employees/
     * @secure
     */
    updateEmployeeApiEmployeesPut: (
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
      }),

    /**
     * @description Получение собственных данных.
     *
     * @tags employees
     * @name GetMyEmployeeApiEmployeesMeGet
     * @summary Get My Employee
     * @request GET:/api/employees/me
     * @secure
     */
    getMyEmployeeApiEmployeesMeGet: (params: RequestParams = {}) =>
      this.request<Employee, any>({
        path: `/api/employees/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение данных сотрудника по ID для ролей "manager", "HR". "HR" может просмотреть любого сотрудника, "manager" только тех, кто в его командах.
     *
     * @tags employees
     * @name GetEmployeeByIdApiEmployeesIdGet
     * @summary Get Employee By Id
     * @request GET:/api/employees/{id}
     * @secure
     */
    getEmployeeByIdApiEmployeesIdGet: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<Employee, HTTPValidationError>({
        path: `/api/employees/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @tags health
     * @name HealthHealthGet
     * @summary Health
     * @request GET:/health
     */
    healthHealthGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
