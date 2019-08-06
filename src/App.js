import React from 'react';
import 'App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// state from context API
import GithubState from 'context/github/GithubState';
import AlertState from 'context/alert/AlertState';
// components
import Navbar from 'components/layout/Navbar';
import User from 'components/users/User';
import Alert from 'components/layout/Alert';
// templates
import Home from 'templates/Home';
import About from 'templates/About';
import NotFound from 'templates/NotFound';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
