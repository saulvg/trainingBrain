import { useState } from "react";
import ConfirmBotton from "../buttons/ConfirmBotton";
import NewFolder from "../train/NewFolder";


const ModalAddFolder = ({setModal, modal}) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return(
        <div className={`${modal}`} onClick={()=>setModal('')} id='modal-container'>
            <section  id='modal-content' onClick={handleModalClick}>
                <NewFolder setModal={setModal}/>
            </section>
        </div>
    )
}

export default ModalAddFolder