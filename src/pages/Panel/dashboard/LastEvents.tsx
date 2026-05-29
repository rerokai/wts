import { ChevronRight } from 'lucide-react';
import type { Event } from '@/api/data-contracts';

interface LastEventsProps {
  events: Event[];
}

export function LastEvents({ events }: LastEventsProps) {
  const recentEvents = events.slice(0, 5).map(e => ({
    time: new Date(e.start_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    title: e.title,
  }));

  return (
    <div className="components-data">
      <div className="title-event">События</div>
      {recentEvents.length === 0 ? (
        <div className="text-muted-foreground text-center py-4">Нет событий</div>
      ) : (
        recentEvents.map((ev, idx) => (
          <div key={idx} className="events-row group">
            <div className="event-time">{ev.time}</div>
            <div className="sh-item">
              <div className="event-title">{ev.title}</div>
            </div>
            <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex-shrink-0" />
          </div>
        ))
      )}
    </div>
  );
}