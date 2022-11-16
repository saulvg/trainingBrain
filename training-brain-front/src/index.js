import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>
);


