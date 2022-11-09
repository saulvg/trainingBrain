import { useContext, useState } from "react";
import ConfirmBotton from "../ConfirmBotton";
import InputElement from "./InputElement";
import Error from "../../error/Error";
import decode  from "jwt-decode";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const DeleteUserForm = ({username}) => {   
    const redirect = useNavigate();
    const {token, setToken} = useContext(AuthContext) 
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('')


    const deleteAcound = async()=>{
        if(inputValue !== `${username}/confirmDelete`) {
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
                redirect('/')
                setToken('')
            }else{
                console.log(body.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <p>Si estas seguro de que deseas eliminar tu cuenta escribe " {`${username}/confirmDelete`} "</p>
            <InputElement
                labelName={'Confirm'}
                type={'text'}
                id={'deleteAcound'}
                name={'deleteAcound'}
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                required={'required'}
            />
            {error ? <Error>{error}</Error> : null}
            <ConfirmBotton onClick={()=>deleteAcound()} name={'Confirm'}/>
        </div>
    )
}

export default DeleteUserForm;