import { useContext, useState } from "react"
import { AuthContext } from "../../App"
import InputElement from "../../components/forms/inputs/InputElement"
import LoginError from "../../components/error/LoginError"
import Error from "../../components/error/Error"
import ConfirmBotton from "../../components/forms/ConfirmBotton"
import decode from "jwt-decode"

const NewExercise = () => {
    const {token} = useContext(AuthContext);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription,setExerciseDescription] = useState('');
    const [error, setError] = useState('');

    const decoded = decode(token);


    const newExercise = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${decoded.id}/exercises`, {
                method:'POST',
                headers:{
                    Authorization: token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({exerciseName, exerciseDescription})
            });

            const body = await res.json()

            if(res.ok){
                setExerciseName('')
                setExerciseDescription('')
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
            <form onSubmit={newExercise}>
                <InputElement
                    labelName={'Name of exercise'}
                    type={'text'}
                    id={'exerciseName'}
                    name={'exerciseName'}
                    value={exerciseName}
                    onChange={(e)=>{setExerciseName(e.target.value)}}
                    placeholder={'Exercise name'}
                    required={'required'}
                />
                <label>
                    Description of exercise
                    <textarea
                        cols='30'
                        rows='10'
                        placeholder="Exercise description"
                        value={exerciseDescription}
                        onChange={(e)=>{setExerciseDescription(e.target.value)}}
                    />
                </label>
                {error ? <Error>{error}</Error> : null}
                <ConfirmBotton name={'Save'}/>
            </form>
        :
            <LoginError route={'/login'}/>
        }
        </>
    )
}

export default NewExercise