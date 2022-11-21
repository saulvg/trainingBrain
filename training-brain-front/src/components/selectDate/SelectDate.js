import {DatePicker} from '@material-ui/pickers'

const SelectDate = ({selectData, setSelectDate}) => {

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