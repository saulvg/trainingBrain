import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import useGetExercises from "../../hooks/useGetExercises";

import ConfirmBotton from "../buttons/ConfirmBotton";
import Error from "../error/Error";
import LoginError from "../error/LoginError";
import InputElement from "../forms/inputs/InputElement";






const ModalEditExercise = ({setModalEditExercise, modalEditExercise}) => {
    const {token} = useContext(AuthContext);    
    const [errorPost, setErrorPost] = useState('')
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription,setExerciseDescription] = useState('');

    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    



    const newExercise = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/craft_training/exercises`, {
                method:'PUT',
                body: JSON.stringify({
                    exerciseName,
                    exerciseDescription
                }),
                headers:{
                    Authorization: token,
                },
            });

            const body = await res.json()

            if(res.ok){
                setModalEditExercise('')
                setExerciseName('')
                setExerciseDescription('')
            }else{
                setErrorPost(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className={`${modalEditExercise}`} onClick={()=>setModalEditExercise('')} id='modal-container'>
            <section  id='modal-content' className="section-modal-create-exercise" onClick={handleModalClick}>
            <span id="x-button" onClick={()=>setModalEditExercise('')}>X</span>
                <>
                    {token ? 
                        <form onSubmit={newExercise} id='form-modal-create-exercise'>
                            <InputElement
                                labelName={'* Name'}
                                clasLabel={'label-clas'}
                                type={'text'}
                                id={'editExerciseName'}
                                name={'editExerciseName'}
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
                            {errorPost ? <Error>{errorPost}</Error> : null}
                            <ConfirmBotton name={'Save'}/>
                        </form>
                    :
                        <LoginError route={'/login'}/>
                    }
                </>
            </section>
        </div>
    )
}

export default ModalEditExercise