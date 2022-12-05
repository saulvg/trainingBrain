import './App.css';


/**
 * ###########
 * ## React ##
 * ###########
 */
 import { Route, Routes, BrowserRouter } from 'react-router-dom';
 import React, { useState } from 'react';
 

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import {useLocalStorage} from './hooks/useSessionStorage';


/**
 * ###########
 * ## Pages ##
 * ###########
 */
/* import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; */
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  EditPasswordPage,
  ExercisePage,
  TrainingPage
} from './pages/indexPage'


import Nav from './components/nav/Nav';
import FolderDay from './pages/FolderDay';



export const AuthContext = React.createContext();
const AuthProvider = (props) =>{
  //const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');

  return(
    <AuthContext.Provider value={{token, setToken, /* user, setUser */}}>
      {props.children}
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/editPassword' element={<EditPasswordPage/>}/>
          <Route path='/create_exercise' element={<ExercisePage/>}/>
          <Route path='/training_page' element={<TrainingPage/>}/>
          <Route path='/training_day/:idFolder' element={<FolderDay/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
