import "./modal.css"
import { useState } from "react";
import ConfirmBotton from "../buttons/ConfirmBotton";
import Loading from "../loading/Loading";


const ModalAreYouSure = ({modalAreYouSure, setModalAreYouSure, token, idExercise}) => {
    const [done, setDone] = useState('') 
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    const deleteExercise = async () =>{
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/craft_training/exercises/delete`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: token
                },
                body:JSON.stringify({
                    idExercise
                })
            });
            const body = await res.json();

            if(res.ok){
                setDone(body.message)
                setTimeout(()=>setModalAreYouSure(''),3000)
            }else{
                setDone('Error')
                setTimeout(()=>setModalAreYouSure(''),3000)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className={`${modalAreYouSure}`} onClick={()=>setModalAreYouSure('')} id='modal-container'>
            <section  id='modal-content' onClick={handleModalClick}>
                {!done ? (
                    <>
                    <p>Are you sure? </p>
                        <div>
                            <ConfirmBotton name={'Yes'} onClick={()=>{deleteExercise() }}/>
                            <ConfirmBotton name={'No'} onClick={()=>setModalAreYouSure('')}/> 
                        </div>
                    </>
                ) : (
                    <Loading fatherClas={'modal-closing-sesion'} clas={'bg-orange'}>{done}</Loading>
                )}
                
            </section>
        </div>
    )
}

export default ModalAreYouSure