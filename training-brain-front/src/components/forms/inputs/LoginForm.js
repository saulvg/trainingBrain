import { useContext, useState } from 'react';
import InputElement from './inputs/InputElement';
import InputPassword from './inputs/InputPassword';
import Error from '../../error/Error';

import { AuthContext } from '../../App'; /* ......... */


const LoginForm = () => {

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
            const body = await res.json()


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
        <form onSubmit={login}>
            <InputElement/>
            <InputPassword/>
        </form>
    )
};

export default LoginForm;