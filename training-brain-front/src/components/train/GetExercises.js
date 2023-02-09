import { useState } from "react";
import useGetExercises from "../../hooks/useGetExercises";
import Error from "../error/Error";
import ModalAreYouSure from "../modal/ModalAreYouSure";



const GetExercises = ({token, modalCreateExercise}) => {
    
    const [idExercise, setIdExercise] = useState('')
    const [modalAreYouSure, setModalAreYouSure] = useState('')
    const {exercises, error} = useGetExercises(token, modalCreateExercise, modalAreYouSure)

    return (
        <>
            <ul id="exercise-list">
                {exercises.map((exercise) => {
                    return (
                            <li key={exercise.id} onClick = {()=> idExercise === exercise.id ? setIdExercise('') : setIdExercise(exercise.id)}>
                                <div className="header-li">
                                    <div className="style-list">
                                        <p>Name: {exercise.exerciseName}</p> 
                                    </div>
                                    <span onClick={()=>setModalAreYouSure('open')} style={{display:'inline-block', height:'1rem', width:'1rem' ,backgroundImage: `url('${process.env.REACT_APP_FRONTEND}/img/papelera-de-reciclaje.png')`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'contain'}}></span>
                                </div>
                                {idExercise === exercise.id ? 
                                    <div className="style-list">
                                        <p>Description: <span>{exercise.exerciseDescription}</span></p>
                                        <figure>Photo:
                                            <span>
                                                {exercise.exercisePhoto ? (
                                                    <div className="exercise-photo" style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND}/uploads/${exercise.exercisePhoto})`, textAlign:'center'}}></div>
                                                ) : null}
                                            </span>
                                        </figure> 
                                    </div>
                                : 
                                    null
                                }
                            </li>
                    )
                })}
                <ModalAreYouSure modalAreYouSure={modalAreYouSure} setModalAreYouSure={setModalAreYouSure} token={token} idExercise={idExercise}/>
            </ul>
            {error ? <Error clas={'error-with-padding'}>{error}</Error> : null}
        </>
    )
}

export default GetExercises