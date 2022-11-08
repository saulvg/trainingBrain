import { useNavigate } from "react-router-dom";
import ConfirmBotton from "../components/forms/ConfirmBotton";
import { useContext, useState } from 'react';
import InputElement from '../components/forms/inputs/InputElement';
import InputPassword from '../components/forms/inputs/InputPassword';
import Error from '../components/error/Error';
import { AuthContext } from '../App'; 
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const [error, setError] = useState('');
    const {token, setToken} = useContext(AuthContext)


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
    const navigate = useNavigate();
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
        <ConfirmBotton
            name='I forgot my password'
            onClick={()=>navigate('/')}
        />
    </>
)
};

export default LoginPage;