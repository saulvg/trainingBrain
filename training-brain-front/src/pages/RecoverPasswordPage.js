import "./stylePages.css"
import { useState } from "react"
import InputElement from "../components/forms/inputs/InputElement"
import Error from "../components/error/Error";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage = () => {
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [error, setError] = useState('')
    const [load, setLoad] = useState('')
    const navigate = useNavigate()

    const recoverPass = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/password/recover`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(
                    {email:recoveryEmail}
                )
            });
            const body = await res.json();


            if(res.ok){
                setLoad(body.message)
                setTimeout(()=>navigate('/'), 5000)
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }

    }
    return(       
        <>
        
        {!load ? 
            <form onSubmit={recoverPass} className='general-forms'>
                <InputElement
                type={'mail'} 
                id={'recoveryEmail'} 
                name={'recoveryEmail'} 
                value={recoveryEmail} 
                onChange={(e)=>{setRecoveryEmail(e.target.value)}}
                placeholder={'Email here'}
                required={'required'}
                />

                {error ? <Error>{error}</Error> : null}

                <ConfirmBotton name={'Send'}/>
            </form>
        : <Loading>{load}</Loading>
        }
        </>
    )
}

export default RecoverPasswordPage