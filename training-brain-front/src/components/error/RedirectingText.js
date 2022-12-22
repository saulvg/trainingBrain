import './error.css'
import { useNavigate } from "react-router-dom";


const RedirectingText = ({children, route}) => {
    const navigate = useNavigate();

    return(
        <p className='redirect-text' onClick={()=>navigate(route)}>{children}</p>
        
    )
}

export default RedirectingText;