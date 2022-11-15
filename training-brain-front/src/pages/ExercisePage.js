import { useContext, useState } from "react"
import NewExercise from "../components/train/NewExercise"
import AddButton from "../components/buttons/AddButton"
import { AuthContext } from "../App"
import LoginError from "../components/error/LoginError"
import GetExercises from "../components/train/GetExercises"

const ExercisePage = () => {
    const {token} = useContext(AuthContext)
    const [addExercise, setAddExercise] = useState(false);

    
    return(
        <>
        {token ? 
        <>
            <h2>Exercise Page</h2>
            { addExercise ? <NewExercise addExercise={addExercise} setAddExercise={setAddExercise}/> : <AddButton name={'AddExercise'} onClick={()=>setAddExercise(true)}/>}
            <GetExercises addExercise={addExercise}/>
        </>
        : <LoginError route={'/login'}/>}

        </>
    )
}
export default ExercisePage