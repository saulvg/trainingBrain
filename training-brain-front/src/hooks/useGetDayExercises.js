import { useEffect, useState } from "react"


const useGetDayExercises = (idFolder, token, modal, setError) => {
    const [exercisesDay, setExercisesDay] = useState();
    //const [error, setError] = useState()
    
    useEffect(()=>{
        const loadDayExercises = async () =>{
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/training/folder/${idFolder}`,{
                    method:'GET',
                    headers:{
                        Authorization: token
                    }
                });
                const body = await res.json();
                
                if(res.ok){
                   /*  setError('') */
                    setExercisesDay(body.data)
                    console.log('toy');
                }else{
                    setError(body.message);
                    /* setExercisesDay(''); */
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadDayExercises();
        },[idFolder, token, setError, setExercisesDay, modal])

        return {exercisesDay}
}

export default useGetDayExercises;