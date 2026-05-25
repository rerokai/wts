import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, RiskRowData } from "./riskTableColumns";
import { RiskDetailPanel } from "./RiskDetailPanel";
import { mockEmployees } from "@/mocks/teamData";
import { riskData } from "./riskData";
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import "./risk.css";

// Маппинг отдела по team_id
const departmentMap: Record<number, string> = {
  1: "it",
  2: "marketing",
  3: "admin",
};

// Функция определения группы риска на основе интегрального риска
const getRiskGroup = (integralRisk: number): string => {
  if (integralRisk >= 80) return "high";
  if (integralRisk >= 50) return "medium";
  return "low";
};

export function RiskPage() {
  // Состояния фильтров
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRiskGroup, setSelectedRiskGroup] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  // Состояние выбранного сотрудника
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedDetails, setSelectedDetails] = useState<any>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  // Фильтрация сотрудников
  const filteredEmployees = useMemo(() => {
    let filtered = [...mockEmployees];

    // Фильтр по отделу
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(emp => departmentMap[emp.team_id] === selectedDepartment);
    }

    // Фильтр по поиску (по фио)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(emp =>
        `${emp.last_name} ${emp.first_name}`.toLowerCase().includes(query)
      );
    }

    // Фильтр по группе риска
    if (selectedRiskGroup !== "all") {
      filtered = filtered.filter(emp => {
        const details = riskData[emp.id];
        const group = getRiskGroup(details?.integralRisk ?? 0);
        return group === selectedRiskGroup;
      });
    }

    // Сортировка
    filtered.sort((a, b) => {
      const detailsA = riskData[a.id];
      const detailsB = riskData[b.id];
      switch (selectedSort) {
        case "name":
          return `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`);
        case "risk":
          return (detailsB?.integralRisk ?? 0) - (detailsA?.integralRisk ?? 0);
        case "load":
          return (detailsB?.load ?? 0) - (detailsA?.load ?? 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedDepartment, searchQuery, selectedRiskGroup, selectedSort]);

  // Формирование данных для таблицы
  const getRiskData = useMemo((): RiskRowData[] => {
    return filteredEmployees.map(emp => {
      const detail = riskData[emp.id];
      return {
        id: emp.id,
        fullName: `${emp.last_name} ${emp.first_name}`,
        actuality: detail?.actuality || { status: "—", percent: 0 },
        meetingsOutsideTimeCount: detail?.meetingsOutsideTime?.length || 0,
        conflictsCount: detail?.conflicts?.length || 0,
        load: detail?.load || 0,
        timezone: detail?.timezone || "—",
        integralRisk: detail?.integralRisk || 0,
      };
    });
  }, [filteredEmployees]);

  const handleRowClick = (rowData: RiskRowData) => {
    setSelectedRowId(rowData.id);
    const employee = mockEmployees.find(emp => emp.id === rowData.id);
    const details = riskData[rowData.id];
    setSelectedEmployee(employee);
    setSelectedDetails(details);
  };

  return (
    <div className="risk-page">
      <div className="risk-filters">
        {/* Период */}
        <div className="risk-period-f">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] pl-[10px]">
              <SelectValue placeholder="Выбрать период" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
                <SelectItem value="quarter">Квартал</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Отдел */}
        <div className="risk-otdel-f">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px] pl-[10px]">
              <SelectValue placeholder="Выбрать отдел" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Все отделы</SelectItem>
                <SelectItem value="it">ИТ</SelectItem>
                <SelectItem value="marketing">Маркетинг</SelectItem>
                <SelectItem value="admin">Администрация</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Группа риска */}
        <div className="risk-group-f">
          <Select value={selectedRiskGroup} onValueChange={setSelectedRiskGroup}>
            <SelectTrigger className="w-[180px] pl-[10px]">
              <SelectValue placeholder="Группа риска" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Все группы</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="low">Низкий</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Сортировка */}
        <div className="risk-sort-f">
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px] pl-[10px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="name">По имени</SelectItem>
                <SelectItem value="risk">По риску (выс-низ)</SelectItem>
                <SelectItem value="load">По нагрузке (выс-низ)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="risk-search-f">
          <InputGroup className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[10px] gap-2 rounded-md">
            <InputGroupInput
              id="inline-start-input"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="risk-components">
        <div className="risk-table">
          <DataTable
            columns={columns}
            data={getRiskData}
            onRowClick={handleRowClick}
            selectedRowId={selectedRowId}
          />
        </div>
        <div className="risk-user-info">
          <RiskDetailPanel employee={selectedEmployee} details={selectedDetails} />
        </div>
      </div>
    </div>
  );
}