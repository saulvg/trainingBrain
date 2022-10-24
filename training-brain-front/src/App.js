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
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
