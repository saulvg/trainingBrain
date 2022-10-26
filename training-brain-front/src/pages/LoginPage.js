import { useNavigate } from "react-router-dom";
import ConfirmBotton from "../components/forms/ConfirmBotton";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
    const navigate = useNavigate();
return(
    <div>
        <LoginForm/>
        <ConfirmBotton
            name='I forgot my password'
            onClick={()=>navigate('/')}
        />
    </div>
)
};

export default LoginPage;