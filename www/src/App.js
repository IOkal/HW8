import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {useState, useEffect} from 'react'
import Profile from './components/profile';
import Menu from './components/menu';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/navbar';
import {isUserAuthenticated, isUserSignedUp} from './controller/auth'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path = '/Signup' children={ <Signup authStatus = {isUserAuthenticated()} signedUpStatus = {isUserSignedUp()}/>} />
            <Route exact path = '/Login'  children={ <Login authStatus = {isUserAuthenticated()} signedUpStatus = {isUserSignedUp()} />}/>
            <Route exact path = '/Profile' children={ <Profile authStatus = {isUserAuthenticated()} signedUpStatus = {isUserSignedUp()} />}/>
            <Route path = {['/', '/Menu']} children={ <Menu authStatus = {isUserAuthenticated()} signedUpStatus = {isUserSignedUp()} />}/> />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
