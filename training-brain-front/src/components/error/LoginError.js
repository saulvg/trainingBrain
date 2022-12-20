import { useNavigate } from "react-router-dom";

const LoginError = ({route}) => {
    const navigate = useNavigate();

    return(
        <div>You do not have permissions <b onClick={()=>navigate(`${route}`)}>log in</b> first</div>
    )
}
export default LoginError

