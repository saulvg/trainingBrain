import './App.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
 import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
 import React from 'react';
 

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

import {
  HomePage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  SimpleProfilePage,
  EditPasswordPage,
  SetUpPage,
  TrainingPage,
  RecoverPasswordPage,
  ResetPasswordPage,
  DeleteUserPage,
  CraftExercisesDay
} from './pages/indexPage'


import FolderDay from './pages/FolderDay';

export const AuthContext = React.createContext();
const AuthProvider = (props) =>{
  const [token, setToken] = useLocalStorage('token');

  return(
    <AuthContext.Provider value={{token, setToken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      
      <Link to={'/'} id='logo_web'>
        <img src='/img/trainWithBrain.png' alt='log' width={'80px'}/>
      </Link>
      
        <Routes>
          
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/recover_password' element={<RecoverPasswordPage/>}/>
          <Route path='/reset_password' element={<ResetPasswordPage/>}/>
          {/* <Route path='/profile' element={<ProfilePage/>}/>  */}
          <Route path='/profile' element={<SimpleProfilePage/>}/> 
          <Route path='/editPassword' element={<EditPasswordPage/>}/>
          <Route path='/training_page' element={<TrainingPage/>}/>
          <Route path='/training_day/:idFolder' element={<FolderDay/>}/>
          <Route path='/deleteAcount' element={<DeleteUserPage/>}/>
          <Route path='/create_exercise' element={<SetUpPage/>}/>
          <Route path='/create_exercise/:idFolder' element={<CraftExercisesDay/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
