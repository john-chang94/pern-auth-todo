import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = (bool) => {
    setIsAuthenticated(bool);
  }

  const checkIsAuth = async () => {
    try {
      let config = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      const res = await axios.get('http://localhost:5000/auth/verify', config)
      res.data ? toggleAuth(true) : toggleAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    checkIsAuth()
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' render={props => 
              !isAuthenticated ?
                <Landing {...props} /> :
                <Redirect to='/dashboard' />} />
            <Route exact path='/dashboard' render={props =>
              isAuthenticated ?
                <Dashboard {...props} toggleAuth={toggleAuth} /> :
                <Redirect to='/' />} />
            <Route exact path='/login' render={props =>
              !isAuthenticated ?
                <Login {...props} toggleAuth={toggleAuth} /> :
                <Redirect to='/dashboard' />} />
            <Route exact path='/register' render={props =>
              !isAuthenticated ?
                <Register {...props} toggleAuth={toggleAuth} /> :
                <Redirect to='/login' />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
