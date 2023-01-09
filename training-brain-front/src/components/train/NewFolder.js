import { useContext, useState } from "react"
import { AuthContext } from "../../App"
import ConfirmBotton from "../buttons/ConfirmBotton";
import Error from "../error/Error";
import InputElement from "../forms/inputs/InputElement";
import SelectDate from "../selectDate/SelectDate";


const NewFolder = ({setModal}) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');
    const [selectDate, setSelectDate] = useState(new Date());

    const {token} = useContext(AuthContext)

    const newFolder = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile/exercises/craft_training/folder`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    folderName:folderName,
                    date: selectDate.toISOString().slice(0, 10)
                    
                })
            });
            const body = await res.json();

            if(res.ok){
                setError('')
                setFolderName('')
                setModal('')
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <form onSubmit={newFolder}>
        <InputElement
            labelName={'Name of folder'}
            type={'text'}
            id={'folderName'}
            name={'folderName'}
            value={folderName}
            onChange={(e)=>{setFolderName(e.target.value)}}
            placeholder={'Folder name'}
            required={'required'}
        />
        <SelectDate selectData={selectDate} setSelectDate={setSelectDate}/>
       
        {error ? <Error>{error}</Error> : null}
        <ConfirmBotton name={'Save'}/>
    </form>
        <ConfirmBotton name={'Cancel'} onClick={()=>setModal('')}/>
        </>
    )
}

export default NewFolder