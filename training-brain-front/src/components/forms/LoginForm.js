import { useContext, useState } from 'react';
import InputElement from './inputs/InputElement';
import InputPassword from './inputs/InputPassword';
import Error from '../error/Error';

import { AuthContext } from '../../App'; 
import ConfirmBotton from './ConfirmBotton';
import { Navigate } from 'react-router-dom';


const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const [error, setError] = useState('');
    const [token, setToken] = useContext(AuthContext)


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
            const body = await res.json()
            console.log('soy body',body.data.token);


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
        <>
            {token && <Navigate to='/'/>}
            <form onSubmit={login}>
                <InputElement
                    type={'mail'} 
                    id={'loginEmail'} 
                    name={'loginEmail'} 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder={'Write your email here'}
                    required={'required'}
                />
                <InputPassword
                    type={'password'}
                    id={'loginPassword'}
                    name={'loginPassword'}
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)}}
                    placeholder={'Write your password here'}
                    required={'required'}
                />
                {error ? <Error>{error}</Error> : null}
                <ConfirmBotton name={'Enter'}/>
            </form>
        </>

    )
};

export default LoginForm;