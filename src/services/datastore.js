import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const config = {
  apiKey: 'AIzaSyDP6HY57hLqijUasFp8lcP3Tx78l0C8bbw',
  authDomain: 'firenotes-bfa9a.firebaseapp.com',
  databaseURL: 'https://firenotes-bfa9a-default-rtdb.firebaseio.com',
  projectId: 'firenotes-bfa9a',
  storageBucket: 'firenotes-bfa9a.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function writeNewNotes(newNote) {
  const noteId = database.ref('notes').push(newNote);
  database.ref(`notes/${noteId}`).set({
    newNote,
  });
}

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function removeNote(noteId) {
  database.ref('notes').child(noteId).remove();
}

export function updateNote(prop) {
  database.ref('notes').child(prop.id).update(prop.note);
}
