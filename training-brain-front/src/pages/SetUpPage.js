import "./stylePages.css"
import { useContext, useState } from "react"
import { AuthContext } from "../App"
import GetExercises from "../components/train/GetExercises"
import SelectFolder from "../components/train/SelectFolder"
import ModalAddFolder from "../components/modal/ModalAddFolder"
import ModalCreateExercise from "../components/modal/ModalCreateExercise"
import ConfirmBotton from "../components/buttons/ConfirmBotton"



const SetUpPage = () => {
    const {token} = useContext(AuthContext)
    const [modalFolder, setModalFolder] = useState('');
    const [modalCreateExercise, setModalCreateExercise] = useState('')
    const [craft, setCraft] = useState('trainings');

    
    return(
        <section id="exercise-page">
            <div className="header-choose exercise-page">
                <span className={`choose-option ${craft}`} 
                id='choose-exercises' onClick={() => setCraft('exercises')}>Craft exercises</span>
                <span className={`choose-option ${craft}`} id='choose-trainings' onClick={() => setCraft('trainings')}>Craft Trainings</span>

            </div>
            <div>
                {craft === 'exercises' ? 
                <section className="section-setup">
                    <GetExercises token={token} modalCreateExercise={modalCreateExercise}/>
                    <ConfirmBotton name={'CreatExercise'} onClick={()=>setModalCreateExercise('open')}/>
                </section>
                : null}
                { craft === 'trainings' ? 
                <section className="section-setup">
                    <SelectFolder  token={token}  modalFolder={modalFolder} ></SelectFolder> 
                    <ConfirmBotton name={'Add folder'} onClick={() => setModalFolder('open')} />
                </section>
                : null}
            </div>
            <ModalAddFolder setModalFolder={setModalFolder} modalFolder={modalFolder} />
            <ModalCreateExercise setModalCreateExercise={setModalCreateExercise} modalCreateExercise={modalCreateExercise}/>
        </section>
    )
}
export default SetUpPage