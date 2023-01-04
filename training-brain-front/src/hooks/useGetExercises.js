import { useEffect, useState } from "react";


const useGetExercises = (token, addExercise, setError) =>{
    const [exercises, setExercises] = useState([]);


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
                    setExercises(body.data.exercises)
                }else{
                    setError(body.message)
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadExercises();
    },[token, addExercise, setError])

    return{exercises}
};

export default useGetExercises;