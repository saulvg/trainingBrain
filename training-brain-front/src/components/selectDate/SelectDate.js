
import {DatePicker} from '@material-ui/pickers'
import { useState } from 'react'

const SelectDate = ({selectDate, setSelectDate}) => {
    const [openCalendar, setOpenCalendar] = useState(false)
    const [startDate, setStartDate] = useState(new Date())

    return(
        <div className="contenedor" >
            <div className="grupo">
                <label>Fecha</label>
                {/* <button onClick={()=> setOpenCalendar(true)}>Add Date</button>
                
                { openCalendar ? <DatePicker
                style={{background:'red'}}
                    value={selectDate}
                    onChange={setSelectDate}
                /> : null} */}
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                    />
            </div>
        </div>
    )
}

export default SelectDate