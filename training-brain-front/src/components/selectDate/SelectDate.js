import {DatePicker} from '@material-ui/pickers'

const SelectDate = ({selectDate, setSelectDate}) => {

    return(
        <div className="contenedor">
            <div className="grupo">
                <label>Fecha</label>
                <DatePicker
                    value={selectDate}
                    onChange={setSelectDate}
                />
            </div>
        </div>
    )
}

export default SelectDate