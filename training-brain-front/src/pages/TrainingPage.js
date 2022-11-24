import { useContext } from "react"
import { AuthContext } from "../App"
import LoginError from "../components/error/LoginError";

const TrainingPage = () => {
    const {token} = useContext(AuthContext);

    return(
        <>
            <h2>Training page</h2>
            {token ? 
                <>page</>
            :
                <LoginError route={'/login'}/>
            }
        </>
    )
}

export default TrainingPage