import "./dash.css"
import { ChevronRight } from 'lucide-react';



export function StaySchedule(){
    return(
        <div className="components-data">
        
            <div className="title">
                Соблюдение графика
            </div>
            <div className="sh-row group">
            <div className="sh-item">
                <div className="sh-title">
                    Часовые пояса
                </div>
                <div className="sh-description">
                    2 сотрудника регулярно активны в другое время
                </div>
            </div>
            <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"/>
            </div>
            <div className="sh-row group">
            <div className="sh-item">
                <div className="sh-title">
                    Расхождение графика
                </div>
                <div className="sh-description">
                    5 сотрудников график в HR системе не совпадает с реальными событиями
                </div>
            </div>
            <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"/>
            </div>
            <div className="sh-row group">
            <div className="sh-item">
                <div className="sh-title">
                    Нарашение формата работы
                </div>
                <div className="sh-description">
                    3 сотруднка не указали формат работы
                </div>
            </div>
            <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"/>
            </div>
            <div className="sh-row group">
            <div className="sh-item">
                <div className="sh-title">
                    Переработка
                </div>
                <div className="sh-description">
                    2 сотрудника имеют нагруженность выше 90%
                </div>
            </div>
            <ChevronRight size={16} color="#000000" strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"/>
            </div>
            
        </div>
            
    )
}