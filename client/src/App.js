import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode'
import './App.css';
import { loginUser, registerUser } from './helpers/api-helper';
import AuthForm from './components/AuthForm.js';
import ShowPost from './components/ShowPost.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      authForm: {
        email: '',
        password: ''
      }
    }
    this.handleAuthChange = this.handleAuthChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    if (token) {
      const userData = decode(token);
      this.setState({
        currentUser: userData
      })
    }
  }

  handleAuthChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => (
      {
        authForm: {
          ...prevState.authForm,
          [name]: value
        }
      }
    ))
  }

  async handleRegister() {
    await registerUser(this.state.authForm);
    this.handleLogin();
  }

  async handleLogin() {
    const token = await loginUser(this.state.authForm)

    const userData = decode(token.jwt);
    this.setState({
      currentUser: userData
    })
    localStorage.setItem("jwt", token.jwt)
  }

  handleLogout() {
    localStorage.clear();
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">
            <h1>NBA</h1>
          </Link>
          {
            this.state.currentUser
              ?
              <div>
                <p>Hi {this.state.currentUser.email}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </div>
              :
              <button onClick={() => this.props.history.push('/login')}>Login/Register</button>
          }
        </header>
        <Route path="/register" render={() => (
          <AuthForm
            authFormTitle="Register"
            handleSubmit={this.handleRegister}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm}
          />
        )} />
        <Route path="/login" render={() => (
          <AuthForm
            authFormTitle="Login"
            handleSubmit={this.handleLogin}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm}
          />
        )} />
        <Link to="/players">This should say players</Link>&nbsp;
        <Link to="/posts">Am I posts?</Link>
        <Route path="/foods" render={()=>(
          <ShowPost />
        )} />


      </div>
    );
  }
}

export default withRouter(App);
