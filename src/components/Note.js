/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import '../style.scss';

class Note extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleDeleteClick = () => {
    console.log(this.props.id);
    this.props.removeNote(this.props.id);
  };

  render() {
    return (
      <div className="note">
        <p> {this.props.note.title} </p>
        <p> {this.props.note.text} </p>
        <i onClick={this.handleDeleteClick} className="fa fa-trash-o" aria-hidden="true" />
      </div>
    );
  }
}

export default Note;
