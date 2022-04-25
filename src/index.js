/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import NoteBar from './components/NoteBar';
import NotesList from './components/NotesList';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes });
    });
  }

  updateNote = (input) => {
    db.updateNote(input);
  };

  addNote = (input) => {
    const newNote = {
      title: input,
      text: 'sample text',
      x: 50,
      y: 50,
      height: '200px',
      width: '200px',
      zIndex: 26,
    };

    db.writeNewNotes(newNote);
  };

  // eslint-disable-next-line class-methods-use-this
  removeNote = (input) => {
    db.removeNote(input);
  };

  render() {
    return (
      <div className="note-page">
        <NoteBar addNote={this.addNote} />
        <NotesList notes={this.state.notes} removeNote={this.removeNote} updateNote={this.updateNote} />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
