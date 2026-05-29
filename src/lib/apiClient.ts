
import { Api } from '../api/Api';   // ← новый путь
import type { Tokens } from '../api/data-contracts';

const BASE_URL = 'http://127.0.0.1:8000';

export const api = new Api({
  baseUrl: BASE_URL,
  securityWorker: async (securityData: any) => {
    
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


const savedToken = localStorage.getItem('accessToken');
if (savedToken) {
  setAuthToken(savedToken);
}


export type { Tokens };


