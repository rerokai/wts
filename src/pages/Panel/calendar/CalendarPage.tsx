import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from '@/components/ui/select';

import './calendar.css';

export function CalendarPage(){
    return(
    <div className="calendar-page">
      <div className="calendar-filters">
        <div className="mep-period-f">
          <Select value="Date">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбрать месяц" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="4">Май 2026</SelectItem>
                <SelectItem value="5">Июнь 2026</SelectItem>
                <SelectItem value="6">Июль 2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mep-otdel-f">
          <Select value="Otdel">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбрать отдел" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Все отделы</SelectItem>
                <SelectItem value="1">IT отдел</SelectItem>
                <SelectItem value="2">Маркетинг</SelectItem>
                <SelectItem value="3">Администрация</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="calendar-components">
        <div className="calendar-area">
        </div>
        <div className="calendar-data-info"></div>
      </div>
    </div>
    )
}