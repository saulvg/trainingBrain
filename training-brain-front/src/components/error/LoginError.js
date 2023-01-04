import './error.css'
import { useNavigate } from "react-router-dom";

const LoginError = ({route}) => {
    const navigate = useNavigate();

    return(
        <div id='login-error'>
            <span>You do not have permissions<br/> <b onClick={()=>navigate(`${route}`)}> log in</b></span>
        </div>
    )
}
export default LoginError

