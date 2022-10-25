import './App.css';


/**
 * ###########
 * ## React ##
 * ###########
 */
 import { Route, Routes, BrowserRouter } from 'react-router-dom';
 

/**
 * ###########
 * ## Pages ##
 * ###########
 */
import HomePage from './pages/HomePage';
import RegisterPage from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
