import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerDemoProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
}

export function DatePickerDemo({ date: externalDate, setDate: externalSetDate }: DatePickerDemoProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(undefined);
  
  // Если переданы пропсы – используем их, иначе внутреннее состояние
  const date = externalDate !== undefined ? externalDate : internalDate;
  const setDate = externalSetDate || setInternalDate;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-[180px] !px-[10px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Выбрать дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}