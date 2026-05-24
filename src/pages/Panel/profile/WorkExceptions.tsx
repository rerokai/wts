import "./profile.css"
import { Select, SelectContent, SelectItem, SelectValue, SelectGroup, SelectTrigger } from "@/components/ui/select"
import { DatePickerDemo } from "@/components/ui/date-picker"

export function WorkExceptions(){
    return(
        <div className="components-data">
            <div className="title">
                Исключения
            </div>
            <div className="pers-data-list">
                <div className="excep-item">
                    <div className="excep-item-title">
                        <svg width="16" height="18" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 7.04545C13.5 12.1364 7 16.5 7 16.5C7 16.5 0.5 12.1364 0.5 7.04545C0.5 5.30949 1.18482 3.64463 2.40381 2.41712C3.62279 1.18961 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18961 11.5962 2.41712C12.8152 3.64463 13.5 5.30949 13.5 7.04545Z" stroke="#2B585C" stroke-width="1.1" stroke-opacity="1" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.99967 9.22741C8.19629 9.22741 9.16634 8.25057 9.16634 7.04559C9.16634 5.8406 8.19629 4.86377 6.99967 4.86377C5.80306 4.86377 4.83301 5.8406 4.83301 7.04559C4.83301 8.25057 5.80306 9.22741 6.99967 9.22741Z" stroke="#2B585C" stroke-width="1.1" stroke-opacity="1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="except-info">
                        Командировка 13.04.26 - 18.04.26
                    </div>
                </div>
                <div className="excep-item">
                    <div className="excep-item-title">
                        <svg width="16" height="18" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 7.04545C13.5 12.1364 7 16.5 7 16.5C7 16.5 0.5 12.1364 0.5 7.04545C0.5 5.30949 1.18482 3.64463 2.40381 2.41712C3.62279 1.18961 5.27609 0.5 7 0.5C8.72391 0.5 10.3772 1.18961 11.5962 2.41712C12.8152 3.64463 13.5 5.30949 13.5 7.04545Z" stroke="#2B585C" stroke-width="1.1" stroke-opacity="1" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.99967 9.22741C8.19629 9.22741 9.16634 8.25057 9.16634 7.04559C9.16634 5.8406 8.19629 4.86377 6.99967 4.86377C5.80306 4.86377 4.83301 5.8406 4.83301 7.04559C4.83301 8.25057 5.80306 9.22741 6.99967 9.22741Z" stroke="#2B585C" stroke-width="1.1" stroke-opacity="1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="except-info">
                        Отпуск 13.04.26 - 18.04.26
                    </div>
                </div>
            </div>
            
            <div className="add-except">
                <div className="title">
                Добавить исключение
            </div>
                <div className="new-except-info">
                    <div>Категория:</div>
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
                <div className="new-except-info">
                    <div>Дата начала:</div>
                    <DatePickerDemo/>
                </div>
                <div className="new-except-info">
                    <div>Дата конца:</div>
                    <DatePickerDemo/>
                </div>
                <button className="new-except-buttn">
                    Добавить исключение
                </button>
            </div>
        </div>
    )
}