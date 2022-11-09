import { useContext, useState } from "react";

import {AuthContext} from '../App'
import InputElement from "../components/forms/inputs/InputElement";
import decode from 'jwt-decode';
import useUserData from '../hooks/useUserData'
import ConfirmBotton from "../components/forms/ConfirmBotton";
import { useNavigate } from "react-router-dom";
import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import DeleteUserForm from "../components/forms/inputs/DeleteUserForm";


const ProfilePage = () => {

    const {token, setToken} = useContext(AuthContext)
    
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [load, setLoad] = useState('');
    const [error, setError] = useState('');
    const [deleteUser, setDeleteUser] = useState(false);

    const navigate = useNavigate();

    useUserData(
        token, setUsername, setHeight, setWeight, setAge 
    );

    const Imcfunction = ({weight, height}) => {
        const weightKg = weight/10
        const heightM = height/100
        let imc;
        let lvlWeight;
        if(weightKg === 0 || heightM === 0){
            imc = 'Missign fields'
        }else{
            imc =(weightKg / Math.pow(heightM,2)).toFixed(2);
            if(imc < 18.5){
                lvlWeight = 'under weight'
            }else if(imc >= 18.5 && imc <= 24.9){
                lvlWeight='normal weight'
            }else if(imc >= 25 && imc <= 29.9){
                lvlWeight = 'overweight'
            } else if(imc >= 30) {
                lvlWeight= 'obesity'
            }
        }
       
        return(
            <p>{imc} {lvlWeight ? `, you are in ${lvlWeight}` : ''}</p>
        )
    }

    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            const decoded = decode(token)
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${decoded.id}`, {
                method:'PUT',
                headers:{
                    Authorization: token, 
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username,
                    height,
                    weight,
                    age
                }),
            });

            const body = await res.json();

            const redirect = () => navigate('/')

            if(res.ok){
                setLoad(body.message)
                setTimeout(redirect, 5000)
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
            {!load ? (
                <>
                {!deleteUser ? (
                    <> 
                    <form onSubmit={saveChanges}>
                        <InputElement
                            labelName={'Username'}
                            type={'text'}
                            id={'editUsername'}
                            name={'editUsername'}
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            placeholder={'Write your user name here'}

                            />
                        <InputElement
                            labelName={'Height'}
                            type={'number'}
                            id={'editHeight'}
                            name={'editHeight'}
                            value={height}
                            onChange={(e)=>setHeight(e.target.value)}
                            placeholder={'cm'}
                            
                            />
                        <InputElement
                            labelName={'Weight'}
                            type={'number'}
                            id={'editWeight'}
                            name={'editWeight'}
                            value={weight}
                            onChange={(e)=>setWeight(e.target.value)}
                            placeholder={'grams'}
                        />
                        <InputElement
                            labelName={'Age'}
                            type={'number'}
                            id={'editAge'}
                            name={'editAge'}
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                            placeholder={'Age'}
                            
                            />
                        <ConfirmBotton name={'Save changes'}/>
                    </form>
                    <div id='sectionIcm'>
                        <p>Your ICM is:</p>
                        <Imcfunction weight={weight} height={height}></Imcfunction>
                    </div>
                    {error ? <Error>{error}</Error> : null}
                    <ConfirmBotton onClick={()=> navigate('/editPassword')} name={'Change your password'}/>
                    <ConfirmBotton onClick={()=> setToken('')} name={'Cerrar sesion'}/>
                    <ConfirmBotton onClick={()=>setDeleteUser(true)} name={'Delete acound'}/>
                </>
                ) : <DeleteUserForm username={username}/>}
                </>
                ) 
            : 
                <Loading>Profile update successful</Loading>
            } 
            </>
        : 
            <div>You do not have permissions <b onClick={()=>navigate('/login')}>log in</b> first</div>
        }
        
        </>
    )
}
export default ProfilePage