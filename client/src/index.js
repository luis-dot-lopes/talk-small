import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';

import './index.css';
import App from './App';
import {Login, Register} from './pages/Acess';

function Index() {
  
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/talks" component={App} />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
