// src/pages/Panel/meeting/MeetingSuggestionPanel.tsx
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, XCircle } from "lucide-react";
import "./meeting.css";

const mockSuggestion = {
  date: "28 мая 2026",
  time: "14:00 – 15:00",
  totalParticipants: 5,
  availableCount: 4,
  unavailable: [
    { name: "Иванов А.А.", reason: "Занят (встреча в 14:30)" },
    { name: "Петрова М.И.", reason: "Отпуск" },
  ],
};

export function MeetingSuggestionPanel() {
  const handleSelectTime = () => {
    alert("Выбрано время: " + mockSuggestion.date + " " + mockSuggestion.time);
  };

  return (
    <div className="meeting-suggestion-panel">
      <div className="suggestion-datetime">
        <Calendar className="suggestion-icon" />
        <span className="suggestion-date">{mockSuggestion.date}</span>
        <Clock className="suggestion-icon suggestion-icon-margin" />
        <span className="suggestion-time">{mockSuggestion.time}</span>
      </div>
      <div className="availability">
        <div className="availability-header">
          <Users className="availability-icon" />
          <span>Доступно: {mockSuggestion.availableCount} из {mockSuggestion.totalParticipants}</span>
        </div>
        {mockSuggestion.unavailable.length > 0 && (
          <div className="unavailable-list">
            <div className="unavailable-title">Недоступны:</div>
            {mockSuggestion.unavailable.map((u, idx) => (
              <div key={idx} className="unavailable-item">
                <span>{u.name} — {u.reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button className="suggestion-button" variant="outline" onClick={handleSelectTime}>
        Выбрать это время для встречи
      </Button>
    </div>
  );
}