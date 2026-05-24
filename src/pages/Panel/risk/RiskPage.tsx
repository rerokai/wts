import "./risk.css"
import { Accuracy } from "../Accuracy"

export function RiskPage(){
    return(
        <div className="risk-page">
            
            <div className="risk-filters"> 
                <div className="risk-period-f">
                    <select name="data">
                        <option value='apple'>Яблоко</option>
                        <option value='banana'>Банан</option>
                        <option value='orange'>Апельсин</option>
                    </select>
                </div>
                <div className="risk-otdel-f">
                    <select name="colors">
                        <option value="1">Синий</option>
                        <option value="2" selected>Зеленый</option>
                        <option value="3">Желтый</option>
                        <option value="4">Красный</option>
                        <option value="5">Оранжевый</option>
                        <option value="6">Черный</option>
                    </select>
                </div>
                <div className="risk-group-f">
                    <select name="colors">
                        <option value="1">Синий</option>
                        <option value="2" selected>Зеленый</option>
                        <option value="3">Желтый</option>
                        <option value="4">Красный</option>
                        <option value="5">Оранжевый</option>
                        <option value="6">Черный</option>
                    </select>
                </div>
                <div className="risk-sort-f">
                    <select name="colors">
                        <option value="1">Синий</option>
                        <option value="2" selected>Зеленый</option>
                        <option value="3">Желтый</option>
                        <option value="4">Красный</option>
                        <option value="5">Оранжевый</option>
                        <option value="6">Черный</option>
                    </select>
                </div>
                <div className="risk-search-f">
                    <input type="search" name="query" placeholder="Поиск по сайту..."></input>
                </div>
            </div>
            
            <div className="risk-components">
                <div className="risk-table"><Accuracy/></div>
                <div className="risk-user-info">user stats</div>
            </div>
            
        </div>
    )
}