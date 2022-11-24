import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import InputElement from "./inputs/InputElement";
import decode from 'jwt-decode';
import useUserData from '../../hooks/useUserData'

const EditProfileForm = () => {
    
    const {token, setToken} = useContext(AuthContext)
    const {username1, age1, height1, weight1} = useUserData(token)
    console.log('soy',username1);
    
    const [username, setUsername] = useState(username1);
    console.log('sigo siendo',username);
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [load, setLoad] = useState('');
    const [error, setError] = useState('');

    const saveChanges = async (e) => {
        e.preventDefault();

        try {
            const decoded = decode(token)
            console.log(decoded.id);
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${decoded.id}`, {
                method:'PUT',
                headers:{
                    Authorization: token, 
                    'Content-Type':'app;ication/json'
                },
                body: JSON.stringify({
                    username,
                    height,
                    weight,
                    age
                }),
            });

            const body = await res.json();

            if(res.ok){
                setLoad(body.message)
            }else{
                setError(body.message)
            }

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        {token ?
            <> 
                <form onSubmit={saveChanges}>
                    <InputElement
                        type={'text'}
                        id={'editUsername'}
                        name={'editUsername'}
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder={'USERNAME'}

                    />

                </form>
                <button onClick={()=> setToken('')}>Cerrar sesion</button>
            </>
        : <div> Login</div> }
        </>
    )
};

export default EditProfileForm;
