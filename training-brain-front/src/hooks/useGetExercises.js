import { useEffect, useState } from "react";


const useGetExercises = (token, modalCreateExercise) =>{
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('')


    useEffect(()=>{
        const loadExercises = async () =>{
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/craft_training/exercises`,{
                    method:'GET',
                    headers:{
                        Authorization: token
                    }
                });
                const body = await res.json();
                
                if(res.ok){
                    setError('')
                    setExercises(body.data.exercises)
                }else{
                    setError(body.message)
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadExercises();
    },[token, setError, modalCreateExercise])

    return{exercises, error}
};

export default useGetExercises;