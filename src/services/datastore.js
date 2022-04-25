import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// ^ we are using compat notation here as the new firebase 9 api is a mess and i kinda hate it
// Import the functions you need from the SDKs you need
// Set the configuration for your app
// TODO: Replace with your project's config object
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
// const storage = firebase.storage();

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
  console.log('firebase');
  console.log(prop);
  database.ref('notes').child(prop.id).update(prop.note);
}
