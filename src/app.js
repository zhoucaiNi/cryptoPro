/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import './style.scss';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
// import { data } from 'autoprefixer';
const uuid = require('uuid');

const config = {
  apiKey: 'AIzaSyCJoYCbX2GXY38yJlXx3mob1ynfm_BCqyw',
  authDomain: 'firesurvey-25336.firebaseapp.com',
  databaseURL: 'https://firesurvey-25336-default-rtdb.firebaseio.com',
  projectId: 'firesurvey-25336',
  storageBucket: 'firesurvey-25336.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
// const database = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // this gives a unique id, using uuid package
      uid: uuid.v1(),
      // the name of the user with the initial state being a blank string

      userName: '',
      // answers to survey, stored in an object
      answers: {
        answer1: '',
        answer2: '',
        answer3: '',
      },
      // if the values have been submitted to firebase, starts as false
      submitted: false,

      // sets feedback
      feedback: '',
      // state of feedback submission
      feedbackSubmit: false,
    };
    this.nameRef = React.createRef();
    // binding the userSubmit method
    this.userSubmit = this.userSubmit.bind(this);
    // binding the answerSelected method
    this.answerSelected = this.answerSelected.bind(this);
    // binding the questionsSubmit
    this.questionsSubmit = this.questionsSubmit.bind(this);
    // bidning userSubmit
    this.userFeedback = this.userFeedback.bind(this);
    // binds feedbackSubmit
    this.feedbackSubmit = this.feedbackSubmit.bind(this);
  }

  // declare the userSubmit method
  userSubmit(event) {
    // prevents event defualt of submit
    event.preventDefault();
    // feeds userName the value of textbox with ref of name .trim() removes extra spaces
    const userName = this.nameRef.current.value;
    // console.log(this.nameRef.current.value);
    // updates the sate of userName
    this.setState({ userName });
  }

  // changes the state of answers when the radio buttons are clicked
  answerSelected(event) {
    const { answers } = this.state;
    // changes state of answer1
    if (event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
      console.log(answers.answer1);
      // changes state of answer2
    } else if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
      console.log(answers.answer2);
    } else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
      console.log(answers.answer3);
    }
    this.setState({ answers });
  }

  // handels the question submission
  questionsSubmit(event) {
    // runs script instead of preform defualt form submission
    event.preventDefault();
    // sets state of submitted to true
    this.setState({ submitted: true });
    // if user does not want to leave feedback
    if (this.state.answers.answer3 === 'no') {
      // sends answers to fb
      firebase.database().ref(`survey/${this.state.uid}`).set({
        userName: this.state.userName,
        answer1: this.state.answers.answer1,
        answer2: this.state.answers.answer2,
        answer3: this.state.answers.answer3,
        feedback: this.state.feedback,
      });
    }
  }

  // updates the state of feedback as user types
  userFeedback(event) {
    const feedback = event.target.value;
    this.setState({ feedback });
  }

  // handels submission on feedback page
  feedbackSubmit(event) {
    // precents default form submission
    event.preventDefault();
    // sets state of feedbackSubmit to true
    this.setState({ feedbackSubmit: true });

    // sends information to firebase
    firebase.database().ref(`survey/${this.state.uid}`).set({
      userName: this.state.userName,
      answer1: this.state.answers.answer1,
      answer2: this.state.answers.answer2,
      answer3: this.state.answers.answer3,
      feedback: this.state.feedback,
    });
  }

  render() {
    // declare userName within render
    let
      userName,
      // create qustions
      questions,
      // create feedback
      feedback;
    // if statement, if our user has not entered a name and state is still not submitted
    if (this.state.userName === '' && this.state.submitted === false) {
      // userName will render a div with a form

      userName = (
        <div className="survey">
          <h2> Crypto Survey </h2>
          <p> Welcome to Crypto Pro! This program will take you through the basics of
            investing in cryptocurrency (and other) markets. While this course will provide you with
            the necessary skills to buy and trade cryptocurrencies on this platform and others, this
            course should BY NO MEANS seen as a comprehensive or adequate introduction to cryptocurrency.
            We want to stress that as a retail investor, you are severely outmatched in the crypto market and
            should never expect to see the same gains as professional investors. With that being said, we are
            confident this course offers you the investing fundamentals you need to protect your assets and hopefully
            earn some profits in the crypto market. Good luck!
          </p>
          <div className="center-column">
            <h2>Enter your name to take the survey </h2>
            {/* here our from has calls a method on submit */}
            <form onSubmit={this.userSubmit}>
              {/* our input box is refrenced by 'name' */}
              <input type="text" placeholder="Enter your name" ref={this.nameRef} className="nameInput" />
              <input type="submit" value="submit" className="submitBtn" />
            </form>
          </div>
        </div>
      );
      // questions is still blank
      questions = '';
      // if the state of userName is no longer equal to "" and submitted is still false
    } else if (this.state.userName !== '' && this.state.submitted === false) {
      // shows the state of userName
      userName = <h2>Welcome {this.state.userName}!</h2>;
      // updating questions
      questions = (
        <div className="survey">
          {/* <h3>Questions</h3> */}
          <form onSubmit={this.questionsSubmit}>
            <div>
              <label>
                You are interested in opening up your first cryptocurrency portfolio! Congratulations!
                There are two coins available for your beginning investment. Your first option,
                Gumo Coin, has an expected rate of return of 150%, as well as average holding periods
                of 60 days. However, the second, Titus Coin, has an expected rate of return of 250% with
                average holding periods of only 15 days.
                For your first, risk-concerned investment, should you invest in Gumo or Titus coin?
              </label>
              <br />
              <br />
              {/* name is equal to answer1 */}
              <input type="radio" name="answer1" value="Gumo" onChange={this.answerSelected} />Gumo Coin
              <br />
              <input type="radio" name="answer1" value="Titus" onChange={this.answerSelected} />Titus Coin
            </div>
            <br />

            <div>
              <label>
                You are interested in opening up your first cryptocurrency portfolio! Congratulations!
                There are two coins available for your beginning investment. Your first option,
                Gumo Coin, has an expected rate of return of 150%, as well as average holding periods
                of 60 days. However, the second, Titus Coin, has an expected rate of return of 250% with
                average holding periods of only 15 days.
                For your first, risk-concerned investment, should you invest in Gumo or Titus coin?
              </label>
              <br />
              <br />
              {/* name is equal to answer1 */}
              <input type="radio" name="answer2" value="A" onChange={this.answerSelected} />Investor A
              <br />
              <input type="radio" name="answer2" value="B" onChange={this.answerSelected} />Investor B
            </div>
            <br />

            <div>
              <label>
                Would you like to leave feedback?
              </label>
              <br />
              <br />
              {/* name is equal to answer2 */}
              <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />Yes, I would!
              <br />
              <input type="radio" name="answer3" value="no" onChange={this.answerSelected} />No, thank you.
            </div>
            <br />
            <input type="submit" value="submit" className="submitBtn" />
          </form>
        </div>
      );
      // if we submitted the first form and the user said they owuld like to leave feedback
    } else if (this.state.submitted === true && this.state.answers.answer3 === 'yes' && this.state.feedbackSubmit === false) {
      feedback = (
        <div className="survey">
          <h3>Feedback</h3>
          <form onSubmit={this.feedbackSubmit}>
            <div>
              <label>Please Leave Feedback Below!</label>
              <br />
              <br />
              {/* name is equal to answer1 */}
              <textarea name="feedback" cols="40" rows="8" onChange={this.userFeedback} />
            </div>
            <br />
            {/* submit for feedback */}
            <input type="submit" value="submit" className="submitBtn" />
          </form>
        </div>
      );
      // if the user submitted the questions and did not want to leave feedback
    } else if (this.state.submitted === true && this.state.answers.answer3 === 'no' && this.state.feedbackSubmit === false) {
      userName = <h2>Thanks again {this.state.userName}! Your responses have been recorded</h2>;
      // if the user submitted the questions and submitted feedback
    } else if (this.state.submitted === true && this.state.answers.answer3 === 'yes' && this.state.feedbackSubmit === true) {
      userName = <h2>Thanks for the feedback {this.state.userName}!</h2>;
    }
    console.log(this.state.userName);
    // what our app will show
    return (
      <div className="center-column">
        {/* shows current state of userName */}
        {userName}
        <br />
        {/* shows current state of questions */}
        {questions}
        {/* shows current state of feedback */}
        {feedback}
      </div>
    );
  }
}

export default App;
