import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Profile from './components/profile';
import Menu from './components/menu';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path = '/Signup' component = {Signup} />
            <Route exact path = '/Login' component = {Login} />
            <Route exact path = '/Profile' component = {Profile} />
            <Route exact path = '/' component = {Menu} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
