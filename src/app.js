/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import './style.scss';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
// import { data } from 'autoprefixer';
const uuid = require('uuid');
const surveyData = require('./survey.json');

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
        answer4: '',
        feedbackReq: '',
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

      // changes state of answer3
    } else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
      console.log(answers.answer3);

      // changes state of answer4
    } else if (event.target.name === 'answer4') {
      answers.answer4 = event.target.value;
      console.log(answers.answer4);

      // feedback request
    } else if (event.target.name === 'feedbackReq') {
      answers.feedbackReq = event.target.value;
      console.log(answers.feedbackReq);
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
    if (this.state.answers.feedbackReq === 'no') {
      // sends answers to fb
      firebase.database().ref(`survey/${this.state.uid}`).set({
        userName: this.state.userName,
        answer1: this.state.answers.answer1,
        answer2: this.state.answers.answer2,
        answer3: this.state.answers.answer3,
        answer4: this.state.answers.answer4,
        feedbackReq: this.state.answers.feedbackReq,
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
      answer4: this.state.answers.answer4,
      feedbackReq: this.state.answers.feedbackReq,
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
          <p> {surveyData.Intro}
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
                {surveyData.questions.at(0).question_text}
              </label>
              <br />
              <br />
              {/* name is equal to answer1 */}
              <input type="radio" name="answer1" value="Gumo Coin" onChange={this.answerSelected} />Gumo Coin
              <br />
              <input type="radio" name="answer1" value="Titus Coin" onChange={this.answerSelected} />Titus Coin
            </div>
            <br />

            <div>
              <label>
                {surveyData.questions.at(1).question_text}
              </label>
              <br />
              <br />
              {/* name is equal to answer2 */}
              <input type="radio" name="answer2" value="A" onChange={this.answerSelected} />Coin A
              <br />
              <input type="radio" name="answer2" value="B" onChange={this.answerSelected} />Coin B
            </div>
            <br />

            <div>
              <label>
                {surveyData.questions.at(2).question_text}
              </label>
              <br />
              <br />
              {/* name is equal to answer3 */}
              <input type="radio" name="answer3" value="A" onChange={this.answerSelected} />Investor A
              <br />
              <input type="radio" name="answer3" value="B" onChange={this.answerSelected} />Investor B
            </div>
            <br />

            <div>
              <label>
                {surveyData.questions.at(3).question_text}
              </label>
              <br />
              <br />
              {/* name is equal to answer4 */}
              <input type="radio" name="answer4" value="A" onChange={this.answerSelected} />Investor A
              <br />
              <input type="radio" name="answer4" value="B" onChange={this.answerSelected} />Investor B
            </div>
            <br />

            <div>
              <label>
                Would you like to leave feedback?
              </label>
              <br />
              <br />
              {/* name is equal to feedbackReq */}
              <input type="radio" name="feedbackReq" value="yes" onChange={this.answerSelected} />Yes, I would!
              <br />
              <input type="radio" name="feedbackReq" value="no" onChange={this.answerSelected} />No, thank you.
            </div>
            <br />
            <input type="submit" value="submit" className="submitBtn" />
          </form>
        </div>
      );
      // if we submitted the first form and the user said they owuld like to leave feedback
    } else if (this.state.submitted === true && this.state.answers.feedbackReq === 'yes' && this.state.feedbackSubmit === false) {
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
    } else if (this.state.submitted === true && this.state.answers.feedbackReq === 'no' && this.state.feedbackSubmit === false) {
      userName = <h2>Thanks again {this.state.userName}! Your responses have been recorded</h2>;
      // if the user submitted the questions and submitted feedback
    } else if (this.state.submitted === true && this.state.answers.feedbackReq === 'yes' && this.state.feedbackSubmit === true) {
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
