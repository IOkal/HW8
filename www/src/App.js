import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Profile from './components/profile';
import Menu from './components/menu';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path = '/Signup' component = {Signup} />
            <Route exact path = '/Login' component = {Login} />
            <Route exact path = '/Profile' component = {Profile} />
            <Route path = {['/', '/Menu']} component = {Menu} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
