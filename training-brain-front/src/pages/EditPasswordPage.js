import { useContext, useEffect, useState } from "react";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import InputPassword from "../components/forms/inputs/InputPassword";
import Error from "../components/error/Error";
import decode from "jwt-decode";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";



const EditPasswordPage = () =>{

    const {token, setToken} = useContext(AuthContext)

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [done, setDone] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        if(newPassword === confirmPassword){
            setPasswordMatch(true)
        }else{
            setPasswordMatch(false)
        }
    },[newPassword, confirmPassword]);

    const editPassword = async (e) =>{
        e.preventDefault();

        if(!passwordMatch){
            setError('The password do not match');
            return
        }

        try {
            const decoded = decode(token)  
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND}/users/${decoded.id}/password`,
                {
                    method:'PUT',
                    headers: {
                        Authorization: token,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({oldPassword, newPassword})
                }    
            );

            const body = await res.json();
            console.log('sopy body',body);

            const redirect = () => navigate('/login')

            if(res.ok){
                setToken('');
                setDone(true)
                setTimeout(redirect, 5000);
                
            }else{
                setError(body.message)
            }


        } catch (error) {
            console.error(error);
        }


    };

    return(
        <>
            <div>EditPassword</div>
            {!done ? 
                <form onSubmit={editPassword}>
                    <InputPassword
                        labelName={'Old password'}
                        type={'password'}
                        id={'oldPassword'}
                        name={'oldPassword'}
                        value={oldPassword}
                        onChange={(e)=>{setOldPassword(e.target.value)}}
                        placeholder={'Write your password here'}
                        required={'required'}
                    />
                    <InputPassword
                        labelName={'New password'}
                        type={'password'}
                        id={'newPassword'}
                        name={'newPassword'}
                        value={newPassword}
                        onChange={(e)=>{setNewPassword(e.target.value)}}
                        placeholder={'Write your password here'}
                        required={'required'}
                    />
                    <InputPassword
                        labelName={'Repit new password'}
                        type={'password'}
                        id={'confirmPassword'}
                        name={'confirmPassword'}
                        value={confirmPassword}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        placeholder={'Write your password here'}
                        required={'required'}
                        />
                        {error ? <Error>{error}</Error>:null}
                    <ConfirmBotton name={'Change'}/>
                </form>
            : 
                <Loading>Your password has been updated</Loading>
            }
        </>
    );
};

export default EditPasswordPage;