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

export function login(email, password) {
  console.log('login-button-clicked');
  console.log(email);
  console.log(password);
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    const { user } = userCredential;
    return ('202', user);
  })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function register(email, password) {
  // const email = 'test@example.com';
  // const password = 'hunter2';
  // [START auth_signup_password]
  console.log('register-button-clicked');
  console.log(email);
  console.log(password);
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
  // [END auth_signup_password]
}

export function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}

export function authStateListener(callback) {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { uid } = user;
      console.log(uid);
      callback(user);
      // ...
    } else {
      // User is signed out
      // ...
      callback(null);
    }
  });
  // [END auth_state_listener]
}
