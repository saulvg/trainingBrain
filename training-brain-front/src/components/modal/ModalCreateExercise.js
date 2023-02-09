import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import useGetExercises from "../../hooks/useGetExercises";

import ConfirmBotton from "../buttons/ConfirmBotton";
import Error from "../error/Error";
import LoginError from "../error/LoginError";
import InputElement from "../forms/inputs/InputElement";
import AddSerieToExercise from "../train/AddSerieToExercise";






const ModalCreateExercise = ({setModalCreateExercise, modalCreateExercise}) => {
    const {token} = useContext(AuthContext);    
    const [errorPost, setErrorPost] = useState('')
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription,setExerciseDescription] = useState('');
    const [exercisePhoto, setExercisePhoto] = useState()

    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    



    const newExercise = async (e) => {
        e.preventDefault();

        try {

            const dataExercise ={
                exerciseName,
                exerciseDescription,
                exercisePhoto
            }

            const payload = new FormData();
            //Object.entries devuelve una matriz de pares [[exerciseName, elNombre], [exerciseDescription, elNombre], [], ...]
            //Y en cada vuelta del bucle añadimos new Format()
            for (const [key, value] of Object.entries(dataExercise)) {
                payload.append(key, value);
            }
            
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/craft_training/exercises`, {
                method:'POST',
                body: payload,
                headers:{
                    Authorization: token,
                },
            });

            const body = await res.json()

            if(res.ok){
                setModalCreateExercise('')
                setExerciseName('')
                setExerciseDescription('')
                setExercisePhoto('')
                /* setAddExercise(false) */
            }else{
                setErrorPost(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className={`${modalCreateExercise}`} onClick={()=>setModalCreateExercise('')} id='modal-container'>
            <section  id='modal-content' className="section-modal-create-exercise" onClick={handleModalClick}>
            <span id="x-button" onClick={()=>setModalCreateExercise('')}>X</span>
                <>
                    {token ? 
                        <form onSubmit={newExercise} id='form-modal-create-exercise'>
                            <InputElement
                                labelName={'* Name'}
                                clasLabel={'label-clas'}
                                type={'text'}
                                id={'exerciseName'}
                                name={'exerciseName'}
                                value={exerciseName}
                                onChange={(e)=>{setExerciseName(e.target.value)}}
                                required={'required'}
                            />
                            <label className="label-clas">
                                Description 
                                <textarea
                                    cols='30'
                                    rows='7'
                                    value={exerciseDescription}
                                    onChange={(e)=>{setExerciseDescription(e.target.value)}}
                                />
                            </label>
                            <label className="label-clas">
                                Photo
                                <input 
                                    type={'file'}
                                    onChange={(e)=>{setExercisePhoto(e.target.files[0])}}
                                />
                            </label>
                            {errorPost ? <Error>{errorPost}</Error> : null}
                            <ConfirmBotton name={'Save'}/>
                            {/* <ConfirmBotton name={'Cancel'} onClick={()=>setAddExercise(false)}/> */}
                        </form>
                    :
                        <LoginError route={'/login'}/>
                    }
                </>
            </section>
        </div>
    )
}

export default ModalCreateExercise