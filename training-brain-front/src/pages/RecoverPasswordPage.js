import "./stylePages.css"
import { useState } from "react"
import InputElement from "../components/forms/inputs/InputElement"
import Error from "../components/error/Error";
import ConfirmBotton from "../components/buttons/ConfirmBotton";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import RedirectingText from "../components/error/RedirectingText";


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
                setTimeout(()=>navigate('/reset_password'), 5000)
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
        <section id="recover-page"> 
            <form onSubmit={recoverPass} className='general-forms' >
                <InputElement
                type={'mail'} 
                id={'recoveryEmail'} 
                name={'recoveryEmail'} 
                value={recoveryEmail} 
                onChange={(e)=>{setRecoveryEmail(e.target.value)}}
                placeholder={'Email here'}
                required={'required'}
                clas={'type-one'}
                />

                {error ? <Error>{error}</Error> : null}

                <ConfirmBotton name={'Send'}/>
            </form>
                <RedirectingText className={'redirect-text'} route={'/reset_password'}>Change your password</RedirectingText>
            </section>
        : <Loading>{load}</Loading>
        }
        </>
    )
}

export default RecoverPasswordPage