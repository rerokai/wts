import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { ProfilePage } from "./pages/Panel/profile/ProfilePage";
import { RiskPage } from "./pages/Panel/risk/RiskPage";
import { MapPage } from "./pages/Panel/map/MapPage";
import { IntroPage } from "./pages/Intro/IntroPage";
import { PanelRouter } from "./pages/Panel/layout/PanelRouter";
import { LoginPage } from "./pages/Intro/LoginPage";
import { RegisterPage } from "./pages/Intro/RegisterPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<IntroPage />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Защищённые маршруты панели */}
          <Route
            path="/panel"
            element={
              <PrivateRoute>
                <PanelRouter />
              </PrivateRoute>
            }
          >
            <Route path="profile" element={<ProfilePage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="risk" element={<RiskPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}