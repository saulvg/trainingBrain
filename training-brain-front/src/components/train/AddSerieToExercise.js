import InputElement from "../forms/inputs/InputElement";
import ConfirmBotton from "../buttons/ConfirmBotton";
import { useState } from "react";



const AddSerieToExercise = ({ idExercise, setIdExercise, token, idFolder, setModal}) => {
    console.log('sigue idFolder', idFolder);
    const [expectedReps, setExpectedReps] = useState('');
    const [error, setError] = useState('')

    const addExercise = async (e)=>{
        e.preventDefault()
        setIdExercise(false)

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/craft_training/serie`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    idExercise:idExercise,
                    idFolder: idFolder,
                    expectedReps: expectedReps
                })
            });
            const body = await res.json();

            if(res.ok){
                setModal('')
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
            <form onSubmit={addExercise}>
                <InputElement 
                    labelName={'Expected repetitions'}
                    type={'text'}
                    id={'expectedReps'}
                    name={'expectedReps'}
                    value={expectedReps}
                    onChange={(e)=>setExpectedReps(e.target.value)}
                    required={'required'}
                    />               
                <ConfirmBotton name={'Add serie'} />
                <ConfirmBotton name={'Cancel'} onClick={()=> {
                    setIdExercise('')
                    setError(false)
                }}/>
            
            </form>
        </>
    )
}

export default AddSerieToExercise;