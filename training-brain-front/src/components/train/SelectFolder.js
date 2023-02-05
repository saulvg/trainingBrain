import { useState } from "react";
import { Link } from "react-router-dom";
import useGetDayExercises from "../../hooks/useGetDayExercises";
import useTrainigFolders from "../../hooks/useTrainingFolders"
import AddButton from "../buttons/AddButton";
import Error from "../error/Error";
import AddSerieToExercise from "./AddSerieToExercise";



const SelectFolder = ({token, modalFolder}) => {

    /* const [error, setError] = useState('') */
    const pastOrFutureTrainings = 'future'
    const {folders, error} = useTrainigFolders(token, pastOrFutureTrainings, modalFolder);
    const [idFolder, setIdFolder] = useState('');


   
   
   
    
    return(
        <>
            <ul>
                {folders.map((folder)=>{
                    return(
                        <li key={folder.id}>
                            <Link to={`/create_exercise/${folder.id}`} key={folder.id}>
                                <div id="select-folder-content-li">{folder.folder_name} <br/> {folder.date.slice(0,10)}</div>
                            </Link>
                        </li>
                    )
                })}
                {error ? <Error clas={'error-with-padding'}>{error}</Error> : null}
            </ul>

        </>
    )
}

export default SelectFolder