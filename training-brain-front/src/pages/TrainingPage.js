import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../App"
import Error from "../components/error/Error";
import LoginError from "../components/error/LoginError";
import useTrainigFolders from "../hooks/useTrainingFolders";


const TrainingPage = () => {
    const {token} = useContext(AuthContext);
    const [pastOrFutureTrainings, setPastOrFutureTrainings] = useState('future');
    const {folders, error} = useTrainigFolders(token, pastOrFutureTrainings);

    return(
        <section id="training-page">
            {token ? 
            <>
                <div className="header-choose">
                    <span className={`choose-option ${pastOrFutureTrainings}`} id='choose-past' onClick={()=>setPastOrFutureTrainings('past')}>Past</span>
                    <span className={`choose-option ${pastOrFutureTrainings}`} id='choose-future' onClick={()=>setPastOrFutureTrainings('future')}>Future</span>
                </div>
                {error ? <Error clas={'error-with-padding'}>{error}</Error> : 
                    <ul>
                    {folders.map((folder)=>{
                        return(
                                <li key={folder.id} onClick={()=>{
                                    }}>
                                    <Link to={`/training_day/${folder.id}`}>
                                        <div>{folder.folder_name} <br/> {folder.date.slice(0,10)}</div>
                                    </Link>
                                    
                                </li>
                            )
                        })}
                    </ul>
                }
            </>
            :
                <LoginError route={'/login'}/>
            }
        </section>
    )
}

export default TrainingPage