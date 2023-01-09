import { useState } from "react";
import useGetExercises from "../../hooks/useGetExercises";
import ConfirmBotton from "../buttons/ConfirmBotton";
import AddSerieToExercise from "../train/AddSerieToExercise";



const ModalAddExercise = ({setModal, modal, token, idFolder}) => {
    /* const [done, setDone] = useState(false)  */
    const [error, setError] = useState('')
    const {exercises} = useGetExercises(token, setError);
    const [idExercise, setIdExercise] = useState('')
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return(
        <div className={`${modal}`} onClick={()=>setModal('')} id='modal-container'>
            <section  id='modal-content' onClick={handleModalClick}>
            <button onClick={()=>setModal('')}>X</button>
                <p>Your exercises </p>
                <ul>
                    {exercises.map((exercise)=>{
                        return(
                            <li onClick={()=>setIdExercise(exercise.id)} key={exercise.id}>{exercise.exerciseName}</li>
                        )
                    })}

                </ul>
                {idExercise ? <AddSerieToExercise idExercise={idExercise} setIdExercise={setIdExercise} token={token} setError={setError} idFolder={idFolder} setModal={setModal}/> : null}
            </section>
        </div>
    )
}

export default ModalAddExercise