import { api } from "@/lib/apiClient";
import { useState } from "react";

interface AccuracyProps {
  scheduleId: number;
  onConfirm: () => Promise<void>;
}

export function Accuracy({ scheduleId, onConfirm }: AccuracyProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!scheduleId) return;
    setLoading(true);
    try {
      const current = await api.getScheduleByIdApiSchedulesIdGet(scheduleId);
      const schedule = current.data;
      
      const updatePayload = {
        work_days: schedule.work_days,
        time_zone: schedule.time_zone,
        work_format: schedule.work_format,
        start_at: schedule.start_at,
        end_at: schedule.end_at,
      };
      await api.updateScheduleApiSchedulesIdPut(scheduleId, updatePayload);
      await onConfirm();
      alert("Актуальность подтверждена!");
    } catch (err: any) {
      console.error("Ошибка подтверждения:", err);
      if (err.response?.data?.detail) {
        alert(`Ошибка: ${JSON.stringify(err.response.data.detail)}`);
      } else if (err.message) {
        alert(`Ошибка: ${err.message}`);
      } else {
        alert("Не удалось подтвердить актуальность");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleConfirm} disabled={loading} className="accuracy-button">
      <div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0335 8.1202V8.87154C17.0325 10.6326 16.4623 12.3462 15.4078 13.7567C14.3534 15.1672 12.8712 16.1991 11.1824 16.6984C9.4936 17.1977 7.68862 17.1378 6.03668 16.5274C4.38474 15.9171 2.97433 14.7892 2.01581 13.3118C1.0573 11.8344 0.602025 10.0868 0.717898 8.32953C0.833771 6.57226 1.51458 4.89954 2.65879 3.56081C3.803 2.22209 5.3493 1.2891 7.06708 0.900989C8.78486 0.512879 10.5821 0.690445 12.1907 1.4072"
            stroke="rgba(var(--greendark), 1)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.0337 2.33887L8.86699 10.5137L6.41699 8.0637"
            stroke="rgba(var(--greendark), 1)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>{loading ? "Сохранение..." : "Подтвердить актуальность"}</div>
    </button>
  );
}