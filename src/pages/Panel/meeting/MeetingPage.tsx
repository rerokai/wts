
import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { mockEmployees } from "@/mocks/teamData";
import { MeetingSuggestionPanel } from "./MeetingSuggestionPanel";
import "./meeting.css";

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");


function DatePickerWithRange({ buttonClassName, value, onChange }: { buttonClassName?: string; value?: DateRange; onChange?: (range: DateRange | undefined) => void }) {
  const [date, setDate] = useState<DateRange | undefined>(value);
  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (onChange) onChange(newDate);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground", buttonClassName)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Выберите диапазон</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={handleSelect} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
}

interface Participant { id: number; name: string; email: string; }

export function MeetingPage() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);

  const allEmployees = mockEmployees.map((emp) => ({
    id: emp.id,
    name: `${emp.last_name} ${emp.first_name}`,
    email: emp.email || "",
  }));

  const availableParticipants = allEmployees.filter((emp) => !participants.some((p) => p.id === emp.id));
  const filteredEmployees = searchQuery
    ? availableParticipants.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : availableParticipants;

  const isFormFilled = useMemo(() => {
    return meetingTitle.trim().length > 0 && duration !== "" && dateRange?.from && dateRange?.to && participants.length > 0;
  }, [meetingTitle, duration, dateRange, participants]);

  const handleSelectParticipant = (employee: typeof allEmployees[0]) => {
    setParticipants((prev) => [...prev, employee]);
    setSearchQuery("");
    setIsComboboxOpen(false);
  };

  const handleRemoveParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateMeeting = () => {
    if (!isFormFilled) return;
    alert(`
      Встреча: ${meetingTitle}
      Длительность: ${duration} мин
      Диапазон дат: ${format(dateRange!.from!, "dd.MM.yyyy")} – ${format(dateRange!.to!, "dd.MM.yyyy")}
      Участники: ${participants.map((p) => p.name).join(", ")}
    `);
  };

  return (
    <div className="meeting-page">
      <div className="meeting-components">
        <div className="meeting-area">
          <div className="title">Параметры встречи</div>

          <div className="meeting-param">
            <span className="label">Название:</span>
            <Input className="w-80 !px-[12px]" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="Еженедельный синк" />
          </div>

          <div className="meeting-param">
            <span className="label">Длительность:</span>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Выберите длительность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 минут</SelectItem>
                <SelectItem value="30">30 минут</SelectItem>
                <SelectItem value="45">45 минут</SelectItem>
                <SelectItem value="60">60 минут</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="meeting-param">
            <span className="label">Дата:</span>
            <DatePickerWithRange value={dateRange} onChange={setDateRange} buttonClassName="w-80 !pl-[12px]" />
          </div>

          <div className="meeting-param">
            <span className="label">Участники:</span>
            <div className="flex flex-col gap-2 w-80">
              <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={isComboboxOpen} className="w-full justify-between !px-[12px]">
                    {searchQuery || "Выбрать участника..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Поиск сотрудника..." value={searchQuery} onValueChange={setSearchQuery} />
                    <CommandList>
                      <CommandEmpty>Сотрудник не найден.</CommandEmpty>
                      <CommandGroup>
                        {filteredEmployees.map((emp) => (
                          <CommandItem key={emp.id} value={emp.name} onSelect={() => handleSelectParticipant(emp)}>
                            <Check className={cn("mr-2 h-4 w-4", participants.some((p) => p.id === emp.id) ? "opacity-100" : "opacity-0")} />
                            {emp.name} ({emp.email})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2 mt-2">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                    <span>{p.name}</span>
                    <button type="button" onClick={() => handleRemoveParticipant(p.id)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14 !p-20">
            <Button
              onClick={handleCreateMeeting}
              variant="outline"
              className={cn("w-80 transition-colors", !isFormFilled && "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed")}
              disabled={!isFormFilled}
            >
              Создать встречу
            </Button>
          </div>
        </div>

        <div className="meeting-found">
          <MeetingSuggestionPanel />
        </div>
      </div>
    </div>
  );
}