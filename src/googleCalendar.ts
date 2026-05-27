
import { google } from '@philippdormann/calendar-link';

interface Employee {
  email: string;
}

interface GoogleCalendarEvent {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  guests?: string[];
}

export const openGoogleCalendar = (event: GoogleCalendarEvent) => {

  const guestsList = event.guests?.filter(email => email && email.includes('@')) || [];
  if (guestsList.length === 0) {
    console.warn("Список участников пуст, ссылка откроется без приглашённых.");
  }

  const calendarEvent = {
    title: event.title || "Новая встреча",
    description: event.description || "",
    start: event.start?.toISOString() || new Date().toISOString(),
    end: event.end?.toISOString() || new Date(Date.now() + 3600000).toISOString(),
    guests: guestsList,
  };


  const url = google(calendarEvent);

  window.open(url, '_blank');
};