
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../App";
import Error from '../components/error/Error';
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import InputElement from "../components/forms/inputs/InputElement";
import InputPassword from "../components/forms/inputs/InputPassword";
import Loading from "../components/loading/Loading";

const RegisterPage = () => {

    const {token} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [reapeatPassword, setReapeatPassword] = useState('');
    const [passwordMatch, setPasswordMarch] = useState('');
    const [passwordStructure, setPasswordStructure] = useState('')
    const [emailStructure, setEmailStructure] = useState('')

    const [error, setError] = useState('')
    const [done, setDone] = useState('')
    const [body, setBody] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        const regExpPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})/
        const regExpEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        
        console.log(regExpEmail.test(email));

        if (regExpEmail.test(email) === true) {
            setEmailStructure(true)
        }
        if(regExpPass.test(password) === true){
            setPasswordStructure(true)
            if(password === reapeatPassword ){
                setPasswordMarch(true);
            }else{
                setPasswordMarch(false);
            }
        }else{
            setPasswordStructure(false)
        }
    },[password, reapeatPassword, email]);


    const register = async (e) => {
        e.preventDefault();

        if(!emailStructure){
            setError("the email must have the following structure: email@example.es")
            return;
        }

        if (!passwordStructure) {
            setError("The password must be between 8 to 16 characters long and have at least one uppercase letter, one lowercase letter, one number, and one special character(! @ # $ % ^ & * -).")
            return;
        }
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
                    username,
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
        {token && <Navigate to='/'/>}
        {!done ? (

            <form onSubmit={register}>
                <InputElement 
                    type={'text'} 
                    id={'registerUsername'} 
                    name={'registerUsername'} 
                    value={username} 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    placeholder={'Write your username here'}
                    required={'required'}
                />
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
                
                {error ? <Error>{error} {/* {<button onClick={()=>{navigate('/login')}}>Sing in</button>} */}</Error> : null }
                <ConfirmBotton name='Register'/>
            </form>
        ): (
            <Loading className='confirmation'>
                {body.message}
            </Loading>
        )}
        </>
)
};

export default RegisterPage;