/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
// import produce, { enableAllPlugins } from 'immer';
import './style.scss';
import NoteBar from './components/NoteBar';
import NotesList from './components/NotesList';
import * as db from './services/datastore';

// enables immer
// enableAllPlugins();
// const id = 2;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    console.log(this.state);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes });
    });
  }

  updateNote = (input) => {
    console.log(input);

    db.updateNote(input);
    // this.setState(
    //   produce((draft) => {
    //     draft.notes[input.id] = { ...draft.notes[input.id], ...input.note };
    //   }),
    // );
  };

  // eslint-disable-next-line class-methods-use-this
  addNote = (input) => {
    const newNote = {
      title: input,
      text: 'sample text',
      x: 400,
      y: 12,
      zIndex: 26,
    };
    // this.setState(
    //   produce((draft) => {
    //     draft.notes[id] = newNote;
    //   }),
    // );
    // id += 1;

    db.writeNewNotes(newNote);
  };

  // eslint-disable-next-line class-methods-use-this
  removeNote = (input) => {
    console.log(input);

    db.removeNote(input);
    // this.setState(
    //   produce((draft) => {
    //     delete draft.notes[input];
    //   }),
    // );
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
