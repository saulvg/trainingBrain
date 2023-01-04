import "./stylePages.css"
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import { useContext, useEffect, useState } from 'react';
import InputElement from '../components/forms/inputs/InputElement';
import InputPassword from '../components/forms/inputs/InputPassword';
import Error from '../components/error/Error';
import { AuthContext } from '../App'; 
import { Navigate } from 'react-router-dom';
import RedirectingText from "../components/error/RedirectingText";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const [error, setError] = useState('');
    const {token, setToken} = useContext(AuthContext)

    useEffect(()=>{
        setError('')
    },[email, password])


    const login = async (e) => {
        e.preventDefault();

        try {
            
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const body = await res.json();
            
            if(res.ok) {
                setToken(body.data.token);
            }else{
                setError(body.message);
            }
        } catch (error) {
            console.error(error);
        }
    
        
    }
return(
    <section id="login-page">
        {token && <Navigate to='/'/>}
            <form onSubmit={login} id="login-form" className="general-forms">
                <InputElement
                    type={'mail'} 
                    id={'loginEmail'} 
                    name={'loginEmail'} 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder={'Email here'}
                    required={'required'}
                    clas={'type-one'}
                />
                <InputPassword
                    type={'password'}
                    id={'loginPassword'}
                    name={'loginPassword'}
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)}}
                    placeholder={'Password here'}
                    required={'required'}
                    clas={'type-one'}
                />
                {error ? <Error>{error}</Error> : null}
                <ConfirmBotton name={'Login'}/>
            </form>
            <RedirectingText route={'/recover_password'}>I forgot my password</RedirectingText>
        
    </section>
)
};

export default LoginPage;