import './stylePages.css'
import { useContext, useState } from "react";

import {AuthContext} from '../App'
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import { useNavigate } from "react-router-dom";
import LoginError from "../components/error/LoginError";
import useUserData from '../hooks/useUserData'
import ModalSingOff from '../components/modal/ModalSingOff';



const SimpleProfilePage = () => {

    const {token, setToken} = useContext(AuthContext)
    const [modal, setModal] = useState('') 
    
    const navigate = useNavigate();
    const {error} = useUserData(token);

    
    
    if(error){
        setToken('')
    }

    
    return(
    <>
        {token ?
            <section id='profile-page'>
        
                <ConfirmBotton onClick={()=> navigate('/editPassword')} name={'Change your password'} clas={'big-button'}/>
                <ConfirmBotton onClick={()=> setModal('open')} name={'Sing off'}/>
                <ConfirmBotton onClick={()=> navigate('/deleteAcount')} name={'Delete account'} clas={'big-button'}/>
                
                <ModalSingOff setModal={setModal} modal={modal} navigate={navigate} setToken={setToken}/>
                            
            </section>
        : 
            <LoginError route={'/login'}/>
        }
        
        </>
    )
}
export default SimpleProfilePage