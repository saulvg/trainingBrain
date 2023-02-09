import "./modal.css"
import { useState } from "react";
import ConfirmBotton from "../buttons/ConfirmBotton";
import Loading from "../loading/Loading";


const ModalSingOff = ({setModal, modal, navigate, setToken}) => {
    const [done, setDone] = useState(false) 
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return(
        <div className={`${modal}`} onClick={()=>setModal('')} id='modal-container'>
            <section  id='modal-content' onClick={handleModalClick}>
                {!done ? (
                    <>
                    <p>Are you sure? </p>
                        <div>
                            <ConfirmBotton name={'Yes'} onClick={()=>{
                                setDone(true)
                                setTimeout(()=>{
                                    navigate('/')
                                    setToken('')
                                }, 5000)
                                
                            }}/>
                            <ConfirmBotton name={'No'} onClick={()=>setModal('')}/> 
                        </div>
                    </>
                ) : (
                    <Loading fatherClas={'modal-closing-sesion'} clas={'bg-orange'}>{'Closing session'}</Loading>
                )}
                
            </section>
        </div>
    )
}

export default ModalSingOff