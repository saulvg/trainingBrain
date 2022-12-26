import './stylePages.css'

import { useContext, useState } from "react";

import {AuthContext} from '../App'
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import { useNavigate } from "react-router-dom";
import DeleteUserForm from "../components/forms/inputs/DeleteUserForm";
import LoginError from "../components/error/LoginError";
import useUserData from '../hooks/useUserData'



const SimpleProfilePage = () => {

    const {token, setToken} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [deleteUser, setDeleteUser] = useState(false);  
    
    const navigate = useNavigate();

    useUserData(
        token, setUsername 
    );

    
    return(
    <>
        {token ?
        <section id='profile-page'>
                {!deleteUser ? (
                    <>
                    <ConfirmBotton onClick={()=> navigate('/editPassword')} name={'Change your password'}/>
                    <ConfirmBotton onClick={()=> {
                                navigate('/')
                                setToken('')
                            }
                        } 
                        name={'Cerrar sesion'}/>
                    <ConfirmBotton onClick={()=>setDeleteUser(true)} name={'Delete acound'}/>
                </>
                ) : <DeleteUserForm username={username}/>}
            </section>
        : 
            <LoginError route={'/login'}/>
        }
        
        </>
    )
}
export default SimpleProfilePage