import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../App";

const FolderDay = () => {
    const {token} = useContext(AuthContext)
    const {idFolder } = useParams();
    const [trainDay, setTrainDay] = useState();
    const [error, setError] = useState();
    const [toggleExercise, setToggleExercise] = useState(false)
    const [infoExercise, setInfoExecise] = useState([])
    
    
    useEffect(()=>{
    const loadDayExercises = async () =>{
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/train_day/${idFolder}`,{
                method:'GET',
                headers:{
                    Authorization: token
                }
            });
            const body = await res.json();
            
            if(res.ok){
                setTrainDay(body.data)
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    loadDayExercises();
    },[idFolder, token])

    /* Funcion manejadora del evento de guardado de datos (borrar el objeto prueba creado) */
    const saveChanges = (e) =>{
        e.preventDefault()
        console.log('si');
    }

    const OpenExercise = () => {
        const [effortTraining, setEffortTraining] = useState({
            0: {
                weight: 50,
                reps: 10
            },
            1:
            {
                weight: 60,
                reps: 8
            },
            2:
            {
                weight: 70,
                reps: 6
            },
            
        })
        
        return(
            <>
                <h4>{infoExercise[0].exerciseName}</h4>
                {infoExercise[0].exercisePhoto ? <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND}/uploads/${infoExercise[0].exercisePhoto})`, height:'9rem', width:'9rem'}}/> : null}
                <p>Exercise description: {infoExercise[0].exerciseDescription}</p>
                <p>{infoExercise[0].repetitions.length} x {infoExercise[0].repetitions.join(' / ')}</p>
                <form onSubmit={saveChanges}>
                    {infoExercise[0].repetitions.map((reps, index)=>{
                        
                    return(
                    <label key={index}>
                        <input
                        type={'text'}
                        placeholder={'reps'}
                        value={effortTraining[index].reps} 
                        onChange={(e)=>setEffortTraining({...effortTraining, [index]: {...effortTraining[index], ['reps']: e.target.value}})}
                        />
                        
                        x
                        <input
                        type={'text'}
                        placeholder={'weight'}
                        value={effortTraining[index].weight} 
                        onChange={(e)=>setEffortTraining({...effortTraining, [index]: {...effortTraining[index], ['weight']: e.target.value}})}
                        />
                        
                        {console.log(effortTraining)}
                        TEXTO SEPARARDOR ACUERDATE DE BORRARME
                    </label>
                    )
                })}
                <button>Save</button>
                </form>
            </>
        )
    }

    return(
        <>
            <h3>{trainDay?.folderName}</h3>
            <ul>
                
               {trainDay?.exercises.map((exercise, index)=>{
                return(
                    <li key={exercise[0].id} onClick={()=> {
                        setToggleExercise(!toggleExercise)
                        setInfoExecise(exercise)
                    }}>
                        {`${index + 1}.  
                        ${exercise[0].exerciseName} 
                        -> ${exercise[0].series} x 
                        ${exercise[0].repetitions}`}
                    </li>
                )
               })} 
            </ul>
            {toggleExercise ? <OpenExercise/> : null}

            {error ? <p>There are no exercises for the moment for this day</p> : null}
        </>
    )
}

export default FolderDay