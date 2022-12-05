import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../App"
import AddButton from "../components/buttons/AddButton";
import LoginError from "../components/error/LoginError";
import useTrainigFolders from "../hooks/useTrainingFolders";

const TrainingPage = () => {
    const {token} = useContext(AuthContext);
    const [pastOrFutureTrainings, setPastOrFutureTrainings] = useState('future');
    const {folders} = useTrainigFolders(token, pastOrFutureTrainings);

    return(
        <>
            <h2>Training page</h2>
            {token ? 
            <>
            <AddButton name={'past'} onClick={()=>setPastOrFutureTrainings('past')}/>
            <AddButton name={'future'} onClick={()=>setPastOrFutureTrainings('future')}/>
                <ul>
                {folders.map((folder)=>{
                    return(
                        
                        <li key={folder.id} onClick={()=>{
                            }}>
                            <Link to={`/training_day/${folder.id}`}>
                                <div>Name:{folder.folder_name} Date:{folder.date.slice(0,10)}</div>
                            </Link>
                            
                        </li>
                    )
                })}
            </ul>
            </>
            :
                <LoginError route={'/login'}/>
            }
        </>
    )
}

export default TrainingPage