import InputElement from "../forms/inputs/InputElement";
import SelectDate from "../selectDate/SelectDate";
import ConfirmBotton from "../buttons/ConfirmBotton";
import { useState } from "react";


const CraftExercise = ({setToggleCraftExercise, idExercise, token, setError}) => {
    const [seriesExercise, setSeriesExercise] = useState('');
    const [repetitionsExercise, setRepetitionsExercise] = useState('');
    const [selectData, setSelectDate] = useState(new Date());

    const addExercise = async (e)=>{
        e.preventDefault()
        setToggleCraftExercise(false)

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/day_crafting`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    idExercise:idExercise,
                    date: selectData.toISOString().slice(0, 10),
                    series:seriesExercise,
                    repetitions:repetitionsExercise,
                })
            });
            const body = await res.json();

            if(res.ok){
                setError('')
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <form onSubmit={addExercise}>
            <InputElement 
                labelName={'Series'}
                type={'text'}
                id={'seriesExercise'}
                name={'seriesExercise'}
                value={seriesExercise}
                onChange={(e)=>setSeriesExercise(e.target.value)}
            />
            <InputElement 
                labelName={'Repetitions'}
                type={'text'}
                id={'repetitionsExercise'}
                name={'repetitionsExercise'}
                value={repetitionsExercise}
                onChange={(e)=>setRepetitionsExercise(e.target.value)}
            />
            
            <SelectDate selectData={selectData} setSelectDate={setSelectDate}/>
            <ConfirmBotton name={'Add exercise'} />
            <ConfirmBotton name={'Cancel'} onClick={()=>setToggleCraftExercise(false)} />
        </form>
    )
}

export default CraftExercise;