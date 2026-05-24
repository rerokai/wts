// src/lib/apiClient.ts
import { Api } from '../api/backendApi';

// Базовый URL бэкенда (может быть из переменных окружения)
const BASE_URL = 'http://127.0.0.1:8000';

// Создаём экземпляр API
export const apiClient = new Api({
  baseURL: BASE_URL,
  // Настройка заголовков (будет динамически добавлять токен)
});

// Функция для установки токена после логина
export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.instance.defaults.headers.common['Authorization'];
  }
}