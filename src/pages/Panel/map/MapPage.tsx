import "./map.css"
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select"

export function MapPage(){

    return(
        <div className="map-page">
            
            <div className="map-filters"> 
                <div className="mep-period-f">
                    <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выбрать месяц" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="it">Май</SelectItem>
                        <SelectItem value="mark">Июнь</SelectItem>
                        <SelectItem value="reklama">Июль</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
                <div className="mep-otdel-f">
                    <Select>
                    <SelectTrigger className="w-[180px] pl-[10px]">
                        <SelectValue placeholder="Выбрать отдел" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="it">ИТ</SelectItem>
                        <SelectItem value="mark">Маркетинг</SelectItem>
                        <SelectItem value="reklama">Реклама</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="map-components">
                <div className="temp-map">temp-map</div>
                <div className="map-data-info">users info</div>
            </div>
            
        </div>
    )
}