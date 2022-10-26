import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Error from "../error/Error";
import Loading from "../loading/Loading";
import ConfirmBotton from "./ConfirmBotton";
import InputElement from "./inputs/InputElement";
import InputPassword from "./inputs/InputPassword";





const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reapeatPassword, setReapeatPassword] = useState('');
    const [passwordMatch, setPasswordMarch] = useState('');

    const [error, setError] = useState('')
    const [done, setDone] = useState('')
    const [body, setBody] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        if(password === reapeatPassword ){
            setPasswordMarch(true);
        }else{
            setPasswordMarch(false);
        }
    },[password, reapeatPassword]);


    const register = async (e) => {
        e.preventDefault();

        if(!passwordMatch){
            setError("Passwords don't match")
            return;
        }
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, 
                    password
                }),
            });

            const body = await res.json();
            setBody(body)


            if(res.ok){
                setDone(true);
                setTimeout(() => {
                    navigate('/')
                }, 5000);
            }else{
                setError(body.message)
            }
        }catch(error){
            console.error(error);
        }
    };

    return(
        <>
        {!done ? (

            <form onSubmit={register}>
                <InputElement 
                    type={'mail'} 
                    id={'registerEmail'} 
                    name={'registerEmail'} 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder={'Write your email here'}
                    required={'required'}
                />
                <InputPassword
                    type={'password'} 
                    id={'registerPassword'} 
                    name={'registerPassword'} 
                    value={password} 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder={'Write your password here'}
                    required={'required'}
                />
                <InputPassword
                    type={'password'} 
                    id={'reapeatPassword'} 
                    name={'reapeatPassword'} 
                    value={reapeatPassword} 
                    onChange={(e)=>{setReapeatPassword(e.target.value)}}
                    placeholder={'Repeat your password'}
                    required={'required'}
                />
                
                {error ? <Error>{error}</Error> : null }
                <ConfirmBotton name='Register'/>
            </form>
        ): (
            <Loading className='confirmation'>
                {body.message}
            </Loading>
        )}
        </>
    )
}


export default RegisterForm;