import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/indexStyle.css'
import {Context} from './context/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
      <Context>
        <App />
      </Context>
// </React.StrictMode> 
);
