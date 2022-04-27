import React, { Component } from 'react';
import '../style.scss';
import '98.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: '',
    };
  }

  render() {
    return (
      <div id="auth-form">
        <div className="window">
          <div className="title-bar">
            <h3 className="title-bar-text"> Register User </h3>
          </div>
          <input
            placeholder="Email..."
            onChange={(event) => {
              this.setState({ registerEmail: event.target.value });
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              this.setState({ registerPassword: event.target.value });
            }}
          />

          <button type="button"
            onClick={() => this.props.register(this.state.registerEmail, this.state.registerPassword)}
          > Create User
          </button>
        </div>

        <div className="window">
          <div className="title-bar">
            <h3 className="title-bar-text"> Login </h3>
          </div>
          <input
            placeholder="Email..."
            onChange={(event) => {
              this.setState({ loginEmail: event.target.value });
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              this.setState({ loginPassword: event.target.value });
            }}
          />

          <button type="button"
            onClick={() => this.props.login(this.state.loginEmail, this.state.loginPassword)}
          > Login
          </button>
        </div>
      </div>

    );
  }
}

export default Login;
