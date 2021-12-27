import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import HomeIndex from './components/user/home/HomeIndex';

function App() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={HomeIndex} />
        </Switch>
      </>
    );
  }
  
  ReactDOM.render((
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ), document.getElementById('app')
  )