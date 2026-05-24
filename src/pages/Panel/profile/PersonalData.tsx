import "./profile.css"

export function PersonalData(){
    return(
        <div className="components-data">
            <div className="title">
                Личные данные
            </div>
            <div className="pers-data-list">
                <div className="pers-data-item">
                    <div className="pers-data-title">
                        ФИО
                    </div>
                    <div className="pers-data-info">
                        Иванов Иван Иванович
                    </div>
                </div>
                <div className="pers-data-item">
                    <div className="pers-data-title">
                        Должность
                    </div>
                    <div className="pers-data-info">
                        Разраб
                    </div>
                </div>
                <div className="pers-data-item">
                    <div className="pers-data-title">
                        Отдел
                    </div>
                    <div className="pers-data-info">
                        ИИ
                    </div>
                </div>
                <div className="pers-data-item">
                    <div className="pers-data-title">
                        Gmail
                    </div>
                    <div className="pers-data-info">
                        loveyourmother@gmail.com
                    </div>
                </div>
            </div>
        </div>
    )
}