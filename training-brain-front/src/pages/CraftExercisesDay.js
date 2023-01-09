import { useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthContext } from "../App";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import ModalAddExercise from "../components/modal/ModalAddExercise";
import useGetDayExercises from "../hooks/useGetDayExercises";




const CraftExercisesDay = () => {
    const {token } = useContext(AuthContext)

    const {idFolder} = useParams();
    const [modal, setModal] = useState(false)
    const {exercisesDay} = useGetDayExercises(idFolder, token, modal);

    
    return(
        <div>
                
            <p>Modal</p>
            {exercisesDay ? 
                <ul>
                    {exercisesDay.exercises.map((exercise, index)=>{
                        return(
                            <li key={exercise[0].id}>
                                {`${index + 1}.  
                                ${exercise[0].exerciseName} 
                                -> ${exercise[0].series} x 
                                ${exercise[0].repetitions.map(expected_reps => expected_reps.expected_reps)}`}
                                <button onClick={()=>console.log('add serie al ejerciico')}> + </button>
                                <button onClick={()=>console.log(`Esto borrara el ejercicio ${exercise[0].id}`)}> X </button>
                            </li>
                        )
                    })}
                    
                </ul> 
            : 
                <p>Aun no tiens ejercicios en esta carpeta</p>
            }
            
            
            <ConfirmBotton name={'Add Exercise'} onClick={()=>setModal('open')}/>
            <ModalAddExercise setModal={setModal} modal={modal} token={token} idFolder={idFolder}/>
            
        </div> 
    )
}

export default CraftExercisesDay