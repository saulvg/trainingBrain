import { useState } from "react"
import NewExercise from "../components/train/NewExercise"
import AddButton from "../components/buttons/AddButton"

const ExercisePage = () => {
    const [addExercise, setAddExercise] = useState(false);

    
    return(
        <>
            <h2>Exercise Page</h2>
            { addExercise ? <NewExercise addExercise={addExercise} setAddExercise={setAddExercise}/> : <AddButton name={'AddExercise'} onClick={()=>setAddExercise(true)}/>}
            <p>E1</p>
            <p>E2</p>
            <p>E3</p>
            <p>E4</p>
            <p>E5</p>
            <p>E6</p>
            <p>E7</p>

        </>
    )
}
export default ExercisePage