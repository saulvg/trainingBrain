import './stylePages.css'

import { useContext, useState } from "react";

import {AuthContext} from '../App'
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import { useNavigate } from "react-router-dom";
import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import DeleteUserForm from "../components/forms/inputs/DeleteUserForm";
import LoginError from "../components/error/LoginError";
import useUserData from '../hooks/useUserData'



const SimpleProfilePage = () => {

    const {token, setToken} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [load, setLoad] = useState('');
    const [deleteUser, setDeleteUser] = useState(false);
    
    
    
    const navigate = useNavigate();

    useUserData(
        token, setUsername 
    );

    
    return(
    <>
        {token ?
        <section id='profile-page'>
            {!load ? (
                <>
                {!deleteUser ? (
                    <>
                    <ConfirmBotton onClick={()=> navigate('/editPassword')} name={'Change your password'}/>
                    <ConfirmBotton onClick={()=> setToken('')} name={'Cerrar sesion'}/>
                    <ConfirmBotton onClick={()=>setDeleteUser(true)} name={'Delete acound'}/>
                </>
                ) : <DeleteUserForm username={username}/>}
                </>
                ) 
            : 
                <Loading>Profile update successful</Loading>
            } 
            </section>
        : 
            <LoginError route={'/login'}/>
        }
        
        </>
    )
}
export default SimpleProfilePage