import ConfirmBotton from '../forms/ConfirmBotton'
import './modal.css'

const Modal = ({modal, setModal}) => {
    

    return (
        <>
        {modal ? 
            <div className='modalbg-change-pass' onClick={()=> setModal(false)}>
                <div className='modalfg-change-pass' onClick={(event)=>event.stopPropagation()}>
                    <form>
                        <h2>Change your password</h2>
                        <label>
                            Old password:
                            <input type='password' name="oldPassword" />
                        </label>
                        <label>
                            New password:
                            <input type="password" name="newPassword" />
                        </label>
                        <label>
                            Repit new password:
                            <input type="password" name="repitNewPassword" />
                        </label>
                        <button>Change</button>
                    </form>
                </div>
            </div>
        : 
            null
        }
            <ConfirmBotton onClick={()=> setModal(!modal)} name={'Change your password'}/>
        </>

    )
}

export default Modal