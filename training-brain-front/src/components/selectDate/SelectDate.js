import {DatePicker} from '@material-ui/pickers'
import { useState } from 'react'

const SelectDate = ({selectData, setSelectDate}) => {

    //const [selectData, setSelectDate] = useState(new Date())
    return(
        <div className="contenedor">
            <div className="grupo">
                <label>Fecha</label>
                <DatePicker
                    value={selectData}
                    onChange={setSelectDate}
                />
            </div>
        </div>
    )
}

export default SelectDate