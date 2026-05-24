// src/lib/api.ts
import { Api } from '../api/backendApi';

const BASE_URL = 'http://127.0.0.1:8000';

export const api = new Api({
  baseUrl: BASE_URL,
  securityWorker: (securityData: { token: string } | null) => {
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