/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import NoteBar from './components/NoteBar';
import NotesList from './components/NotesList';
import '98.css';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      registerEmail: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: '',
      user: null,
    };
  }

  async componentDidMount() {
    db.authStateListener((user) => {
      this.setState({ user });
      if (user != null) {
        db.fetchNotes(user.uid, (notes) => {
          this.setState({ notes });
        });
      }
    });
  }

  updateNote = (input) => {
    const { uid } = this.state.user;
    db.updateNote(uid, input);
  };

  addNote = (input) => {
    const newNote = {
      title: input,
      text: 'sample text',
      x: 50,
      y: 50,
      height: '200px',
      width: '200px',
      zIndex: 0,
    };

    if (newNote.title === '') {
      newNote.title = 'Note';
    }
    const { uid } = this.state.user;
    db.writeNewNotes(uid, newNote);
  };

  // eslint-disable-next-line class-methods-use-this
  removeNote = (input) => {
    const { uid } = this.state.user;
    db.removeNote(uid, input);
  };

  register = async () => {
    db.register(this.state.registerEmail, this.state.registerPassword);
  };

  login = async () => {
    db.login(this.state.loginEmail, this.state.loginPassword);
  };

  logout = async () => {
    db.signOut();
  };

  authRender() {
    if (this.state.user != null) {
      return (
        <div className="note-page">
          <NoteBar addNote={this.addNote} />
          <NotesList notes={this.state?.notes} removeNote={this.removeNote} updateNote={this.updateNote} />
          <button type="button"
            onClick={() => this.logout()}
          > Log Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h3> Register User </h3>
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
              onClick={() => this.register()}
            > Create User
            </button>
          </div>

          <div>
            <h3> Login </h3>
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
              onClick={() => this.login()}
            > Login
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.authRender()}
      </div>

    );
  }
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
