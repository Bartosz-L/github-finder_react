import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from 'components/layout/Spinner';
import Repos from 'components/repos/Repos';

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      login,
      html_url,
      company,
      blog,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;

    return (
      <>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable:
        {hireable ? (
          <i className="fas fa-check text-success mx" />
        ) : (
          <i className="fas fa-times-circle text-danger mx" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="round-img"
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit GitHub Profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username: </strong> {login}
                  </>
                )}
              </li>
              <li>
                {company && (
                  <>
                    <strong>Company: </strong> {company}
                  </>
                )}
              </li>
              <li>
                {blog && (
                  <>
                    <strong>Website: </strong> {blog}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </>
    );
  }
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
};

export default User;