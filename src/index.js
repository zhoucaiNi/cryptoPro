import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import produce, { enableAllPlugins } from 'immer';
import './style.scss';
import NoteBar from './components/NoteBar';
import NotesList from './components/NotesList';

// enables immer
enableAllPlugins();
let id = 2;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {
        1: {
          title: 'id 1',
          text: 'I is a note',
          x: 400,
          y: 12,
          zIndex: 26,
        },
        2: {
          title: 'id 2',
          text: 'I is a note',
          x: 400,
          y: 12,
          zIndex: 26,
        },
      },
    };

    console.log(this.state);
  }

  addNote = (input) => {
    const newNote = {
      title: input,
      text: 'I is a note',
      x: 400,
      y: 12,
      zIndex: 26,
    };

    this.setState(
      produce((draft) => {
        draft.notes[id] = newNote;
      }),
    );
    id += 1;
  };

  removeNote = (input) => {
    console.log(input);
    this.setState(
      produce((draft) => {
        delete draft.notes[input];
      }),
    );
  };

  render() {
    return (
      <div className="note-page">
        <NoteBar addNote={this.addNote} />
        <NotesList notes={this.state.notes} removeNote={this.removeNote} />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
