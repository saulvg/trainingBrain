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
import useLocalStorage from './hooks/useSessionStorage';


/**
 * ###########
 * ## Pages ##
 * ###########
 */
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

export const AuthContext = React.createContext();
const AuthProvider = (props) =>{
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');

  return(
    <AuthContext.Provider value={{token, setToken, user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
