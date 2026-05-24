import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom"
import "./intro.css"

export function IntroPage(){
    return(
        <div className="intro">
        <h1 className="q">Твоя жирная мамаша придет сегодня ночью??</h1>
        <div>
            <NavLink  to="/panel" end>
                <button className="intro-start">
                    DA
                </button>
            </NavLink>
        </div>
        <Outlet/>
        </div>
    )
}