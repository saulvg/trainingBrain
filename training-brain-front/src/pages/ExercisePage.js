import { useContext, useState } from "react"
import NewExercise from "../components/train/NewExercise"
import AddButton from "../components/buttons/AddButton"
import { AuthContext } from "../App"
import LoginError from "../components/error/LoginError"
import GetExercises from "../components/train/GetExercises"
import NewFolder from "../components/train/NewFolder"
import SelectFolder from "../components/train/SelectFolder"
import useTrainigFolders from "../hooks/useTrainingFolders"
import ModalAddFolder from "../components/modal/ModalAddFolder"


const ExercisePage = () => {
    const {token} = useContext(AuthContext)
    const [addExercise, setAddExercise] = useState(false);
    const [addFolder, setAddFolder] = useState(false);
    const [modal, setModal] = useState(false)
    

    /*  */
    
    const [craft, setCraft] = useState('exercises');
    const [error, setError] = useState('');

    
    return(
        <>
            <span onClick={() => setCraft('exercises')} style={{background: 'yellow'}}>Craft exercises</span>
            <span onClick={() => setCraft('trainings')} style={{background: 'pink'}}>Craft Trainings</span>
            <div>
                {craft === 'exercises' ? 
                <>
                    <GetExercises/>
                    <AddButton name={'AddExercise'} onClick={()=>setAddExercise(true)}/>
                </>
                : null}
                { craft === 'trainings' ? 
                <>
                    <SelectFolder  token={token} setError={setError} modal={modal} ></SelectFolder> 
                    <AddButton name={'Add folder'} onClick={() => setModal('open')} />
                </>
                : null}
            </div>
            <ModalAddFolder setModal={setModal} modal={modal}/>
            
        </>
    )
}
export default ExercisePage