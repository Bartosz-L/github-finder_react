import React from 'react';
import 'App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// state from context API
import GithubState from 'context/github/GithubState';
import AlertState from 'context/alert/AlertState';
// components
import Navbar from 'components/layout/Navbar';
import Search from 'components/users/Search';
import Users from 'components/users/Users';
import User from 'components/users/User';
import Alert from 'components/layout/Alert';
// templates
import About from 'templates/About';

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
                <Route
                  exact
                  path="/"
                  render={props => (
                    <>
                      <Search />
                      <Users />
                    </>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
