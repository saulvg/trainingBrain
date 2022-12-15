import './stylePage.css'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const HomePage = () =>{
    const {token} = useContext(AuthContext);
    return(
        <section id='home_page'>
            <header>
                <h1>Train with Brain</h1>
            </header>
            
            <main>
                {token ? 
                    <>
                        <Link className='menu_link_labels' to={'/profile'}>Profile</Link>
                        <Link className='menu_link_labels' to={'/create_exercise'}>Exercises</Link>
                        <Link className='menu_link_labels' to={'/training_page'}>Trainings</Link>
                
                    </>
                    :
                    <>
                        <Link className='menu_link_labels' to={'/register'}>Register</Link>
                        <Link className='menu_link_labels' to={'/login'}>Login</Link>
                    </>
                
                }
            </main>
        </section>
    );
};

export default HomePage;
