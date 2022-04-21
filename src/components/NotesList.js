import React from 'react';
import Note from './Note';

function NotesList(props) {
  console.log(props);
  const notes = Object.entries(props.notes).map(([id, note]) => {
    return <Note key={id} id={id} note={note} removeNote={props.removeNote} />;
  });

  return (
    <ul>
      {notes}
    </ul>
  );
}

export default NotesList;
