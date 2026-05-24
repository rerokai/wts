import { PersonalData } from "./PersonalData"
import { WorkShedule } from "./WorkSchedule"
import { WorkExceptions } from "./WorkExceptions"
import "./profile.css"

export function ProfilePage(){
    return(
        <div className="profile-page">

            <h1 className="user-name"> Иванов Иван Иванович </h1>
            
            <div className="profile-components">
                <div className="personal-details"><PersonalData/></div>
                <div className="work-schedule"><WorkShedule/></div>
                <div className="work-exceptions"><WorkExceptions/></div>
                <div className="risk-conflicts">risk-conflicts</div>
                <div className="workload">workload</div>
            </div>
            
        </div>
    )
}