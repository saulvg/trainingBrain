import { useContext, useState } from "react";
import { AuthContext } from "../../App"
import ConfirmBotton from "../buttons/ConfirmBotton";
import {DatePicker} from '@material-ui/pickers'
import InputElement from "../forms/inputs/InputElement";




const ModalAddFolder = ({setModalFolder, modalFolder}) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');
    const [selectDate, setSelectDate] = useState(new Date());

    const {token} = useContext(AuthContext)


    const handleModalClick = (e) => {
        e.stopPropagation();
    };
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
                setModalFolder('')
            }else{
                setError(body.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className={`${modalFolder}`} onClick={()=>setModalFolder('')} id='modal-container'>
            <section  id='modal-content' onClick={handleModalClick}>
            <span id="x-button" onClick={()=>setModalFolder('')}>X</span>

            <form onSubmit={newFolder} id='form-modal-create-exercise'>
                <InputElement
                    labelName={'Name of folder'}
                    clasLabel={'label-clas'}
                    type={'text'}
                    id={'folderName'}
                    name={'folderName'}
                    value={folderName}
                    onChange={(e)=>{setFolderName(e.target.value)}}
                    required={'required'}
                />
                <DatePicker
                    selected={selectDate}
                    onChange={(date) => setSelectDate(date)}
                    value={selectDate}
                    style={{boxShadow:'1px 1px 1px 1px'}}
                />
                <ConfirmBotton name={'Save'}/>
            </form>
            </section>
        </div>
    )
}

export default ModalAddFolder