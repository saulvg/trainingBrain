import { useState } from "react";
import useGetExercises from "../../hooks/useGetExercises";
import Error from "../error/Error";
import ModalEditExercise from "../modal/ModalEditExercise";


const GetExercises = ({token, modalCreateExercise}) => {
    
    const [idExercise, setIdExercise] = useState('')
    const {exercises, error} = useGetExercises(token, modalCreateExercise)
    const [modalEditExercise, setModalEditExercise] = useState(false)

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
                                    <span onClick={()=>setModalEditExercise('open')} style={{display:'inline-block', height:'1rem', width:'1rem' ,backgroundImage: `url('${process.env.REACT_APP_FRONTEND}/img/pencil.png')`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'contain'}}></span>
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
            <ModalEditExercise setModalEditExercise={setModalEditExercise} modalEditExercise={modalEditExercise}/>

            </ul>
            {error ? <Error clas={'error-with-padding'}>{error}</Error> : null}
        </>
    )
}

export default GetExercises