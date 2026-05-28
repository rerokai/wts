import { Outlet } from "react-router-dom";
import PanelSidebar from "../sidebar/PanelSidebar";
import "./panel-layout.css"


export function PanelRouter(){
    return(
        <div className="panel-layout">
            <PanelSidebar/>
            <Outlet/>
        </div> 
    )
}