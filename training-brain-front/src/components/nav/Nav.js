import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

const Nav = () => {
    const {token} = useContext(AuthContext);
    return(
        <>
            <Link to={'/'}>HomePage</Link> |
            | <Link to={'/register'}>Register</Link> |
            | <Link to={'/login'}>Login</Link> |
            | <Link to={'/profile'}>Profile</Link> |
            | <Link to={'/create_exercise'}>Exercises</Link> |
            | <Link to={'/training_page'}>Trainings</Link>
        </>
        
    )
}

export default Nav;