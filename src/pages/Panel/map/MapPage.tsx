import "./map.css"

export function MapPage(){

    return(
        <div className="map-page">
            
            <div className="map-filters"> 
                <div className="mep-period-f">
                    <select name="data">
                        <option value='apple'>Яблоко</option>
                        <option value='banana'>Банан</option>
                        <option value='orange'>Апельсин</option>
                    </select>
                </div>
                <div className="mep-otdel-f">
                    <select name="colors">
                        <option value="1">Синий</option>
                        <option value="2" selected>Зеленый</option>
                        <option value="3">Желтый</option>
                        <option value="4">Красный</option>
                        <option value="5">Оранжевый</option>
                        <option value="6">Черный</option>
                    </select>
                </div>
            </div>
            
            <div className="map-components">
                <div className="temp-map">temp-map</div>
                <div className="map-data-info">users info</div>
            </div>
            
        </div>
    )
}