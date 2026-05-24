import "./profile.css"

export function ProfilePage(){
    return(
        <div className="profile-page">
            
            <h1 className="user-name"> Иванов Иван Иванович </h1>
            
            <div className="profile-components">
                <div className="personal-details">personal-details</div>
                <div className="work-schedule">work-schedule</div>
                <div className="work-exceptions">work-exceptions</div>
                <div className="risk-conflicts">risk-conflicts</div>
                <div className="workload">workload</div>
            </div>
            
        </div>
    )
}