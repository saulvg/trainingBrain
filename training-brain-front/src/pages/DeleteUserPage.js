import './stylePages.css'
import { useContext, useState } from "react";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import InputElement from "../components/forms/inputs/InputElement";
import Error from "../components/error/Error";
import decode  from "jwt-decode";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import useUserData from '../hooks/useUserData';


const DeleteUserPage = () => {   
    const redirect = useNavigate();
    const {token, setToken} = useContext(AuthContext) 
    const [inputValue, setInputValue] = useState('');
    const [done, setDone] = useState('')
    const [error, setError] = useState('')
    const {username} = useUserData(token);



    const deleteAcound = async(e)=>{
        e.preventDefault();

        if(inputValue !== `${username}/confirm-delete`) {
            setError('Wrong security key');
            return
        }
        try {
            const decoded = decode(token)
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND}/users/${decoded.id}`,
                {
                    method:'DELETE',
                    headers: {
                        Authorization: token
                    }
                }
            );
            const body = await res.json();


            if(res.ok){
                setDone(body.message)
                setTimeout(()=> {
                    redirect('/')
                    setToken('')
                    }, 5000);
                
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {!done ?  (
                <form onSubmit={deleteAcound} id='delete-account'>
                    <p>If you are sure you want to delete your account, type <br/>" {`${username}/confirm-delete`} " </p>
                    <InputElement
                        type={'text'}
                        id={'deleteAcound'}
                        name={'deleteAcound'}
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        required={'required'}
                        placeholder={'Write the code'}
                        clas={'type-two'}
                        autocomplete={'off'}
                        />
                    {error ? <Error>{error}</Error> : null}
                    <ConfirmBotton  name={'Confirm'}/>
                </form>
            ) : (
                <Loading>{done}</Loading> 
                )
            }
            </>
            
    )
}

export default DeleteUserPage;