import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

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
const auth = firebase.auth();

export function writeNewNotes(uid, newNote) {
  const noteId = database.ref(`/users/${uid}/notes`).push(newNote);
  database.ref(`/users/${uid}/notes/${noteId}`).set({
    newNote,
  });
}

export function fetchNotes(uid, callback) {
  database.ref(`/users/${uid}/notes`).on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function removeNote(uid, noteId) {
  database.ref(`/users/${uid}/notes`).child(noteId).remove();
}

export function updateNote(uid, prop) {
  try {
    database.ref(`/users/${uid}/notes`).child(prop.id).update(prop.note);
  } catch (error) {
    console.log(error.message);
  }
}

export function login(email, password) {
  console.log('login-button-clicked');
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    const { user } = userCredential;
    return (user);
  })
    .catch((error) => {
      // const errorCode = error.code;
      console.error(error);
      // alert(error.message);
    });
}

export function register(email, password) {
  console.log('register-button-clicked');

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
      // alert(error.message);
      // ..
    });
}

export function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
  });
}

export function authStateListener(callback) {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log('logged in with', user.email);
      callback(user);
      // ...
    } else {
      // User is signed out
      console.log('logged out');
      callback(user);
    }
  });
  // [END auth_state_listener]
}
