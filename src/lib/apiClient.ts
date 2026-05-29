// src/lib/api.ts
import { Api } from '../api/Api';   // ← новый путь
import type { Tokens } from '../api/data-contracts';

const BASE_URL = 'http://127.0.0.1:8000';

export const api = new Api({
  baseUrl: BASE_URL,
  securityWorker: async (securityData: any) => {
    // securityData – это то, что мы передаём через setSecurityData
    if (securityData?.token) {
      return {
        headers: {
          Authorization: `Bearer ${securityData.token}`,
        },
      };
    }
    return {};
  },
});

export function setAuthToken(token: string | null) {
  if (token) {
    // В новой версии setSecurityData принимает объект, который попадёт в securityWorker
    api.setSecurityData({ token });
    localStorage.setItem('accessToken', token);
  } else {
    api.setSecurityData(null);
    localStorage.removeItem('accessToken');
  }
}

// Восстанавливаем токен при загрузке
const savedToken = localStorage.getItem('accessToken');
if (savedToken) {
  setAuthToken(savedToken);
}

// Если вам нужны типы ответов, например Tokens, экспортируйте их
export type { Tokens };


