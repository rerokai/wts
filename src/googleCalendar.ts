// src/utils/googleCalendar.ts
import { google } from '@philippdormann/calendar-link';

interface Employee {
  email: string;
  // ... другие поля, если нужны
}

interface GoogleCalendarEvent {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  guests?: string[];
}

export const openGoogleCalendar = (event: GoogleCalendarEvent) => {
  // Убедитесь, что массив с email существует
  const guestsList = event.guests?.filter(email => email && email.includes('@')) || [];
  if (guestsList.length === 0) {
    console.warn("Список участников пуст, ссылка откроется без приглашённых.");
  }

  // Создаём объект события для библиотеки
  const calendarEvent = {
    title: event.title || "Новая встреча",
    description: event.description || "",
    start: event.start?.toISOString() || new Date().toISOString(),
    end: event.end?.toISOString() || new Date(Date.now() + 3600000).toISOString(),
    guests: guestsList,
  };

  // Генерируем ссылку для Google Календаря
  const url = google(calendarEvent);
  // Открываем её в новой вкладке браузера
  window.open(url, '_blank');
};