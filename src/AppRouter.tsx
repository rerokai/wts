import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePage } from "./pages/Panel/profile/ProfilePage";
import { RiskPage } from "./pages/Panel/RiskPage";
import { MapPage } from "./pages/Panel/MapPage";
import { IntroPage } from "./pages/Intro/IntroPage";
import { PanelRouter } from "./pages/Panel/layout/PanelRouter";
import { LoginPage } from "./pages/Intro/LoginPage";
import { RegisterPage } from "./pages/Intro/RegisterPage";

export function AppRouter(){
    return(

        <BrowserRouter>

            <Routes>
                <Route path="/" element ={<IntroPage/>}>
                    <Route path="login" element ={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/panel" element = {<PanelRouter/>}>
                    <Route path="profile" element={<ProfilePage/>} />
                    <Route path="map" element ={<MapPage/>}/>
                    <Route path="risk" element={<RiskPage />} />
                </Route>
            </Routes>

        </BrowserRouter>

    )
}