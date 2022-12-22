import "./stylePages.css"
import { useEffect, useState } from "react"
import InputElement from "../components/forms/inputs/InputElement"
import Error from "../components/error/Error";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import InputPassword from "../components/forms/inputs/InputPassword";

const ResetPasswordPage = () => {
    const [recoverCode, setRecoverCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repitPassword, setRepitPassword] = useState('');
    const [passwordMatch, setPasswordMarch] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState('');
    
    const navigate = useNavigate()

    useEffect(()=>{
        newPassword === repitPassword ? setPasswordMarch(true) : setPasswordMarch(false)
    },[newPassword, repitPassword])
   

    const resetPass = async (e) => {
        e.preventDefault()

        if (!passwordMatch) {
            setError("Password don't match")
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/password/reset`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(
                    {
                        recoverCode,
                        newPassword
                    }
                )
            });
            const body = await res.json();


            if(res.ok){
                setLoad(body.message)
                setTimeout(()=>navigate('/'), 5000)
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }

    }
     
    return(
        <>
        
        {!load ? 
            <form onSubmit={resetPass} className='general-forms'>
                <InputElement
                    type={'text'} 
                    id={'resetPass'} 
                    name={'resetPass'} 
                    value={recoverCode} 
                    onChange={(e)=>{setRecoverCode(e.target.value)}}
                    placeholder={'Code here'}
                    required={'required'}
                />
                <InputPassword
                    type={'password'} 
                    id={'newPass'} 
                    name={'newPass'} 
                    value={newPassword} 
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                    placeholder={'New password'}
                    required={'required'}
                />
                <InputPassword
                    type={'password'} 
                    id={'repitNewPass'} 
                    name={'repitNewPass'} 
                    value={repitPassword} 
                    onChange={(e)=>{setRepitPassword(e.target.value)}}
                    placeholder={'Repit password'}
                    required={'required'}
                />

                {error ? <Error>{error}</Error> : null}

                <ConfirmBotton name={'Update'}/>
            </form>
        : <Loading>{load}</Loading>
        }
        </>
    )
}

export default ResetPasswordPage