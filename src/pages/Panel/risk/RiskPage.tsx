import "./risk.css"
import { Accuracy } from "../Accuracy"
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function RiskPage(){
    return(
        <div className="risk-page">
            
            <div className="risk-filters"> 
                <div className="risk-period-f">
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
                <div className="risk-otdel-f">
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
                <div className="risk-group-f">
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
                <div className="risk-sort-f">
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
                <div className="risk-search-f">
                    <InputGroup className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] !px-[10px] gap-2 rounded-md">
                        <InputGroupInput id="inline-start-input" placeholder="Search..."  />
                        <InputGroupAddon align="inline-start">
                        <SearchIcon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            
            <div className="risk-components">
                <div className="risk-table"><Accuracy/></div>
                <div className="risk-user-info">user stats</div>
            </div>
            
        </div>
    )
}