import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import UsersProvider from './providers/UsersProvider'

ReactDOM.render(
  <UsersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersProvider>
  , document.getElementById('root')
);


