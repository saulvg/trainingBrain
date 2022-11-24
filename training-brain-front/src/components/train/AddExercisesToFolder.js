import InputElement from "../forms/inputs/InputElement";
import ConfirmBotton from "../buttons/ConfirmBotton";
import { useState } from "react";
import SelectFolder from "./SelectFolder";


const AddExercisesToFolder = ({setToggleCraftExercise, idExercise, token, setError}) => {
    const [seriesExercise, setSeriesExercise] = useState('');
    const [repetitionsExercise, setRepetitionsExercise] = useState('');
    const [idFolder, setIdFolder] = useState('');
    const [chooseFolder, setChooseFolder] = useState(true)

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
                    idFolder: idFolder,
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
        <>
        {
            chooseFolder ? <SelectFolder setIdFolder={setIdFolder} token={token} setError={setError} setChooseFolder={setChooseFolder}/> 
        :  
            <form onSubmit={addExercise}>
                <InputElement 
                    labelName={'Series'}
                    type={'text'}
                    id={'seriesExercise'}
                    name={'seriesExercise'}
                    value={seriesExercise}
                    onChange={(e)=>setSeriesExercise(e.target.value)}
                    required={'required'}
                    />
                <InputElement 
                    labelName={'Repetitions'}
                    type={'text'}
                    id={'repetitionsExercise'}
                    name={'repetitionsExercise'}
                    value={repetitionsExercise}
                    onChange={(e)=>setRepetitionsExercise(e.target.value)}
                    required={'required'}
                    />
                
                <ConfirmBotton name={'Add exercise'} />
                <ConfirmBotton name={'Cancel'} onClick={()=> {
                    setToggleCraftExercise(false)
                    setError(false)
                }
            } />
            </form>
        }
        { chooseFolder ? null : <ConfirmBotton name={'Change folder'} onClick={()=>setChooseFolder(true)}/>}
        </>
    )
}

export default AddExercisesToFolder;