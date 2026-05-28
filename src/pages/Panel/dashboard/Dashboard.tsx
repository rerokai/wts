import { AccuracyDetails } from "./AccuracyDetails"
import { AccuracyDinamic } from "./AccuracyDinamic"
import "./dash.css"
import { Integration } from "./Integration"
import { StaySchedule } from "./StaySchedule"
import { AccuracyPrioritet } from "./AccuracyPrioritet"
import { LastEvents } from "./LastEvents"
import { WorkloadBalance } from "./WorkloadBalance"

export function DashboardPage(){
    return(
    <div className="dashboard-page">
    <div className="dashboard-components">
        <div className="accuracy-details">
            <AccuracyDetails/>
        </div>
        <div className="accuracy-dinamic">
            <AccuracyDinamic/>
        </div>
        <div className="integration">
            <Integration/>
        </div>
        <div className="stay-schedule">
            <AccuracyPrioritet/>
        </div>
        <div className="accuracy-prioritet">
            <StaySchedule/>
        </div>
        <div className="last-events">
            <WorkloadBalance/>
        </div>
        <div className="workload-balance">
              <LastEvents/>
        </div>
        </div>
    </div>
    )
}

