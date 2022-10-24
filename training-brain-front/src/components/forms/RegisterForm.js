import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Error from "../error/Error";
import Loading from "../loading/Loading";
import ConfirmBotton from "./ConfirmBotton";





const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repitPassword, setRepitPassword] = useState('');
    const [passwordMatch, setPasswordMarch] = useState('');

    const [error, setError] = useState('')
    const [done, setDone] = useState('')
    const [body, setBody] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        if(password === repitPassword ){
            setPasswordMarch(true);
        }else{
            setPasswordMarch(false);
        }
    },[password, repitPassword]);


    const register = async (e) => {
        e.preventDefault();

        if(!passwordMatch){
            setError("Passwords don't match")
            return;
        }
        try{
            console.log(process.env.REACT_APP_BACKEND);
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

            //const redirect = () => navigate('/')

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
                <label>
                    <input
                        type="mail"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        />
                </label>
                <label>
                <input
                        type="mail"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        />
                </label>
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