import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import useGetExercises from "../../hooks/useGetExercises";
import Error from "../error/Error";
import AddSerieToExercise from "./AddSerieToExercise";


const GetExercises = () => {
        const [idExercise, setIdExercise] = useState('')
        const [error, setError] = useState('');
        const {token} = useContext(AuthContext);


    const [toggleCraftExercise, setToggleCraftExercise] = useState(false)

    const {exercises} = useGetExercises(token, setError)

    return !error ? (
        <>
            <ul>
                {exercises.map((exercise) => {
                    return (
                        <li style={{border:'1px solid red'}} key={exercise.id} onClick={() =>{
                            setToggleCraftExercise(true) 
                            setIdExercise(exercise.id)
                        }}>
                            <div>
                                <p>Experience name: {exercise.exerciseName}</p>
                                <p>Experience description: {exercise.exerciseDescription}</p>
                                <div>Experience photo:
                                    {exercise.exercisePhoto ? (
                                        <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND}/uploads/${exercise.exercisePhoto})`, height:'9rem', width:'9rem'}}></div>
                                        ) : null}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {toggleCraftExercise ? <AddSerieToExercise setToggleCraftExercise={setToggleCraftExercise} idExercise={idExercise} token={token} setError={setError}/> : null}
            {/* {error ? <Error>{error}</Error> : null} */}
        </>
    ) : <Error>{error}</Error>
};

export default GetExercises