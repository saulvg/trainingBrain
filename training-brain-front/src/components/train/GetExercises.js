import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import Error from "../error/Error";


const GetExercises = ({addExercise}) => {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    const {token} = useContext(AuthContext);

    useEffect(()=>{
        const loadExperiences = async () =>{
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises`,{
                    method:'GET',
                    headers:{
                        Authorization: token
                    }
                });
                const body = await res.json();
                console.log('BODY',body.data.exercises);

                if(res.ok){
                    setExercises(body.data.exercises)
                }else{
                    setError(body.message)
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadExperiences();
    },[token, addExercise])

    return exercises.length > 0 ? (
        <>
            <ul>
                {exercises.map((exercise) => {
                    return (
                        <li key={exercise.id}>
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
            {error ? <Error>{error}</Error> : null}
        </>
    ) : <p>You still have no experiences</p>
};

export default GetExercises