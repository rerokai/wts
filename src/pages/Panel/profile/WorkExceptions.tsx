import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select";
import './profile.css';
import { DatePickerDemo } from '@/components/ui/date-picker';

// Иконка для больничного 
const SickIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2037 11.7296C14.0543 11.5569 14.8104 11.0743 15.3251 10.3755C15.8399 9.67663 16.0767 8.81145 15.9895 7.94788C15.9022 7.0843 15.4972 6.28395 14.8531 5.70219C14.209 5.12042 13.3716 4.79875 12.5037 4.79962H11.6217C11.3897 3.90175 10.9385 3.07552 10.3084 2.39511C9.6783 1.71471 8.8891 1.20143 8.01164 0.901368C7.13418 0.601301 6.19595 0.523836 5.28116 0.675929C4.36637 0.828022 3.50367 1.20491 2.77052 1.77276C2.03736 2.34061 1.4567 3.08164 1.08067 3.92932C0.704634 4.777 0.544998 5.7048 0.616092 6.62942C0.687186 7.55403 0.986784 8.44652 1.48799 9.22675C1.9892 10.007 2.67632 10.6505 3.48766 11.0996" stroke="#284C50" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.00312 7.6001L6.20312 11.8001H10.4031L7.60312 16.0001" stroke="#284C50" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Иконка для отпуска 
const VacationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59921 12.2366C10.6075 12.2366 12.2355 10.6086 12.2355 8.60025C12.2355 6.59193 10.6075 4.96387 8.59921 4.96387C6.59093 4.96387 4.96289 6.59193 4.96289 8.60025C4.96289 10.6086 6.59093 12.2366 8.59921 12.2366Z" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.59961 0.600098V2.05465" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.59961 15.1455V16.6001" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.94141 2.94189L3.97412 3.97463" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.2256 13.2256L14.2583 14.2583" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.599609 8.6001H2.05414" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.1455 8.6001H16.6" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.94141 14.2583L3.97412 13.2256" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.2256 3.97463L14.2583 2.94189" stroke="#2B585C" strokeOpacity="1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Иконка для командировки 
const BusinessTripIcon = () => (
  <svg width="16" height="18" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 7.04545C13.5 12.1364 7 16.5 7 16.5C7 16.5 0.5 12.1364 0.5 7.04545C0.5 5.30949 1.18482 3.64463 2.40381 2.41712C3.62279 1.18961 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18961 11.5962 2.41712C12.8152 3.64463 13.5 5.30949 13.5 7.04545Z" stroke="#2B585C" strokeWidth="1.1" strokeOpacity="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.99967 9.22741C8.19629 9.22741 9.16634 8.25057 9.16634 7.04559C9.16634 5.8406 8.19629 4.86377 6.99967 4.86377C5.80306 4.86377 4.83301 5.8406 4.83301 7.04559C4.83301 8.25057 5.80306 9.22741 6.99967 9.22741Z" stroke="#2B585C" strokeWidth="1.1" strokeOpacity="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface WorkExceptionsProps {
  employeeId: number;
}

interface ExceptionItem {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
}

// Преобразование типа в читаемый текст
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'sick': return 'Больничный';
    case 'vacation': return 'Отпуск';
    case 'business_trip': return 'Командировка';
    default: return type;
  }
};

// Выбор иконки в зависимости от типа
const getIcon = (type: string) => {
  switch (type) {
    case 'sick': return <SickIcon />;
    case 'vacation': return <VacationIcon />;
    case 'business_trip': return <BusinessTripIcon />;
    default: return <BusinessTripIcon />;
  }
};

// Форматирование даты из YYYY-MM-DD в DD.MM.YY
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year.slice(-2)}`;
};

export function WorkExceptions({ employeeId }: WorkExceptionsProps) {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>([
    { id: 1, type: 'business_trip', startDate: '2026-04-13', endDate: '2026-04-18' },
    { id: 2, type: 'vacation', startDate: '2026-04-13', endDate: '2026-04-18' },
  ]);

  const [newType, setNewType] = useState('vacation');
  const [newStartDate, setNewStartDate] = useState<Date | undefined>(undefined);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined);

  const handleAddException = () => {
    if (!newStartDate || !newEndDate) {
      alert('Выберите даты');
      return;
    }
    if (newStartDate > newEndDate) {
      alert('Дата начала не может быть позже даты конца');
      return;
    }
    const newId = Date.now();
    setExceptions([
      ...exceptions,
      {
        id: newId,
        type: newType,
        startDate: newStartDate.toISOString().split('T')[0],
        endDate: newEndDate.toISOString().split('T')[0],
      },
    ]);
    setNewStartDate(undefined);
    setNewEndDate(undefined);
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year.slice(-2)}`;
  };


  return (
    <div className="components-data">
      <div className="title">Исключения</div>
      <div className="pers-data-list-exceptions">
        {exceptions.map((exc) => (
          <div key={exc.id} className="excep-item">
            <div className="excep-item-title">{getIcon(exc.type)}</div>
            <div className="except-info">
              {getTypeLabel(exc.type)} {formatDate(exc.startDate)} - {formatDate(exc.endDate)}
            </div>
          </div>
        ))}
      </div>

      <div className="add-except">
        <div className="title-q">Добавить исключение</div>
        <div className="new-except-info">
          <div>Категория:</div>
          <Select value={newType} onValueChange={setNewType}>
            <SelectTrigger className="w-[180px] pl-[10px]">
              <SelectValue placeholder="Выбрать категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="vacation">Отпуск</SelectItem>
                <SelectItem value="sick">Больничный</SelectItem>
                <SelectItem value="business_trip">Командировка</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="new-except-info">
          <div>Дата начала:</div>
          <DatePickerDemo date={newStartDate} setDate={setNewStartDate} />
        </div>
        <div className="new-except-info">
          <div>Дата конца:</div>
          <DatePickerDemo date={newEndDate} setDate={setNewEndDate} />
        </div>
        <button className="new-except-buttn" onClick={handleAddException}>
          Добавить исключение
        </button>
      </div>
    </div>
  );
}