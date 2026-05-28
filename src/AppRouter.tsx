import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PanelRouter } from "./pages/Panel/layout/PanelRouter";
import { Navigate } from "react-router-dom";

import { ProfilePage } from "./pages/Panel/profile/ProfilePage";
import { RiskPage } from "./pages/Panel/risk/RiskPage";
import { MapPage } from "./pages/Panel/map/MapPage";
import { IntroPage } from "./pages/Intro/IntroPage";

import { LoginPage } from "./pages/Intro/LoginPage";
import { RegisterPage } from "./pages/Intro/RegisterPage";
import { DashboardPage } from "./pages/Panel/dashboard/Dashboard";
import { CalendarPage } from "./pages/Panel/calendar/CalendarPage";
import { EmployeePage } from "./pages/Panel/employee/EmployeePage";
import { MeetingPage } from "./pages/Panel/meeting/MeetingPage";
import { WorkloadPage } from "./pages/Panel/workload/WorkloadPage";
import { IntegrationsPage } from "./pages/Panel/integrations/IntergationsPage";


export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<IntroPage />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          
          <Route
            path="/panel"
            element={
              <PrivateRoute>
                <PanelRouter />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="calendar" element={<CalendarPage/>}/>
            <Route path="risk" element={<RiskPage />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="meeting" element={<MeetingPage />} />
            <Route path="workload" element={<WorkloadPage />} />
            <Route path="integrations" element={<IntegrationsPage/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}