import React, { useState, useEffect } from 'react';
import 'App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
// components
import Navbar from 'components/layout/Navbar';
import Search from 'components/users/Search';
import Users from 'components/users/Users';
import User from 'components/users/User';
import Alert from 'components/layout/Alert';
// templates
import About from 'templates/About';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(response.data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  // search github users
  const searchUsers = async text => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(response.data.items);
    setLoading(false);
  };

  // get single github user
  const getUser = async username => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(response.data);
    setLoading(false);
  };

  //get users repos
  const getUserRepos = async username => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(response.data);
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // alert when nothing has been provided in searchbox
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
