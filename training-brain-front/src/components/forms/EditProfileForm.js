import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import InputElement from "./inputs/InputElement";
import decode from 'jwt-decode';

const EditProfileForm = () => {

    const {token} = useContext(AuthContext)
    console.log('TOOOOOKEN',token);

    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [username, setUsername] = useState('')
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
        <form onSubmit={saveChanges}>
            <InputElement

            />

        </form>
        </>
    )
};

export default EditProfileForm;
