// src/pages/Panel/risk/RiskPage.tsx
import { useState, useMemo, useEffect, useCallback } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, RiskRowData } from "./riskTableColumns";
import { RiskDetailPanel } from "./RiskDetailPanel";
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { api } from "@/lib/apiClient";
import type { Profile, Team } from "@/api/data-contracts";
import { calculateRiskMetrics } from "./riskCalculator";
import "./risk.css";

export function RiskPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRiskGroup, setSelectedRiskGroup] = useState("all");
  const [selectedSort, setSelectedSort] = useState("risk");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [profilesRes, teamsRes] = await Promise.all([
        api.getAllProfilesApiProfilesGet(),
        api.getAllTeamsApiTeamsGet(),
      ]);
      setProfiles(Array.isArray(profilesRes.data) ? profilesRes.data : []);
      setTeams(Array.isArray(teamsRes.data) ? teamsRes.data : []);
    } catch (err) {
      console.error("Ошибка загрузки данных", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Расчёт данных для таблицы (сортировка, фильтрация)
  const tableData = useMemo((): RiskRowData[] => {
    if (profiles.length === 0) return [];

    // Преобразуем профили в строки с рассчитанными метриками
    let rows: RiskRowData[] = profiles.map(profile => {
      const metrics = calculateRiskMetrics(profile, 
        selectedPeriod === "7" ? "week" : selectedPeriod === "30" ? "month" : "quarter"
      );
      return {
        id: profile.employee!.id,
        fullName: `${profile.employee!.last_name} ${profile.employee!.first_name}`,
        actuality: metrics.actuality,
        meetingsOutsideTimeCount: metrics.meetingsOutsideTimeCount,
        conflictsCount: metrics.conflictsCount,
        load: metrics.load,
        timezone: profile.schedule?.time_zone || "—",
        integralRisk: metrics.integralRisk,
      };
    });

    // Фильтр по отделу
    if (selectedDepartment !== "all") {
      rows = rows.filter(row => {
        const profile = profiles.find(p => p.employee?.id === row.id);
        return profile?.employee?.team_id === parseInt(selectedDepartment);
      });
    }

    // Фильтр по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      rows = rows.filter(row => row.fullName.toLowerCase().includes(query));
    }

    // Фильтр по группе риска
    if (selectedRiskGroup !== "all") {
      rows = rows.filter(row => {
        if (selectedRiskGroup === "high") return row.integralRisk >= 80;
        if (selectedRiskGroup === "medium") return row.integralRisk >= 50 && row.integralRisk < 80;
        if (selectedRiskGroup === "low") return row.integralRisk < 50;
        return true;
      });
    }

    // Сортировка
    rows.sort((a, b) => {
      switch (selectedSort) {
        case "name":
          return a.fullName.localeCompare(b.fullName);
        case "risk":
          return b.integralRisk - a.integralRisk;
        case "load":
          return b.load - a.load;
        default:
          return 0;
      }
    });

    return rows;
  }, [profiles, selectedDepartment, searchQuery, selectedRiskGroup, selectedSort, selectedPeriod]);

  const handleRowClick = (row: RiskRowData) => {
    setSelectedRowId(row.id);
    const profile = profiles.find(p => p.employee?.id === row.id) || null;
    setSelectedProfile(profile);
  };

  if (loading) return <div className="risk-loading">Загрузка данных...</div>;
  if (profiles.length === 0) return <div className="risk-empty">Нет данных о сотрудниках</div>;

  return (
    <div className="risk-page">
      <div className="risk-filters">
        {/* Период */}
        <div className="risk-period-f">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Неделя</SelectItem>
              <SelectItem value="30">Месяц</SelectItem>
              <SelectItem value="90">Квартал</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Отдел */}
        <div className="risk-otdel-f">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Отдел" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все отделы</SelectItem>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id.toString()}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Группа риска */}
        <div className="risk-group-f">
          <Select value={selectedRiskGroup} onValueChange={setSelectedRiskGroup}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Группа риска" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="high">Высокий (≥80)</SelectItem>
              <SelectItem value="medium">Средний (50–79)</SelectItem>
              <SelectItem value="low">Низкий (&lt;50)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Сортировка */}
        <div className="risk-sort-f">
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">По имени</SelectItem>
              <SelectItem value="risk">По риску</SelectItem>
              <SelectItem value="load">По нагрузке</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="risk-search-f">
          <InputGroup className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[10px] gap-2 rounded-md">
            <InputGroupInput
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
            data={tableData}
            onRowClick={handleRowClick}
            selectedRowId={selectedRowId}
          />
        </div>
        <div className="risk-user-info">
          <RiskDetailPanel profile={selectedProfile} period={
            selectedPeriod === "7" ? "week" : selectedPeriod === "30" ? "month" : "quarter"
          } />
        </div>
      </div>
    </div>
  );
}