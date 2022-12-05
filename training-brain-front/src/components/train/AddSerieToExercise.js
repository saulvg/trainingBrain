import InputElement from "../forms/inputs/InputElement";
import ConfirmBotton from "../buttons/ConfirmBotton";
import { useState } from "react";
import SelectFolder from "./SelectFolder";
import decode from 'jwt-decode';



const AddSerieToExercise = ({setToggleCraftExercise, idExercise, token, setError}) => {
    const [expectedReps, setExpectedReps] = useState('');
    const [idFolder, setIdFolder] = useState('');
    const [chooseFolder, setChooseFolder] = useState(true);

    const addExercise = async (e)=>{
        e.preventDefault()
        setToggleCraftExercise(false)

        try {
            const decoded = decode(token)
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/serie`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    idUser: decoded.id,
                    idExercise:idExercise,
                    idFolder: idFolder,
                    expectedReps: expectedReps
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

export default AddSerieToExercise;