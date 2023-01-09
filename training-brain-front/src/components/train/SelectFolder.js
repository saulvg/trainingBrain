import { useState } from "react";
import { Link } from "react-router-dom";
import useGetDayExercises from "../../hooks/useGetDayExercises";
import useTrainigFolders from "../../hooks/useTrainingFolders"
import AddButton from "../buttons/AddButton";
import Error from "../error/Error";
import AddSerieToExercise from "./AddSerieToExercise";



const SelectFolder = ({token, modal}) => {

    const [error, setError] = useState('')
    const pastOrFutureTrainings = 'future'
    const {folders} = useTrainigFolders(token, pastOrFutureTrainings, setError, modal);
    const [idFolder, setIdFolder] = useState('');


   
   
   
    
    return(
        <>
            <ul>
                {folders.map((folder)=>{
                    return(
                        <Link to={`/create_exercise/${folder.id}`} style={{border:'1px solid red'}} key={folder.id}>
                            <div>Name:{folder.folder_name} Date:{folder.date.slice(0,10)}</div>
                        </Link>
                    )
                })}
            </ul>

        </>
    )
}

export default SelectFolder