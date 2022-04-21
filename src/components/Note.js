/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
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

  handleDrag = (e, data) => {
    // console.log(this.props);
    // console.log(data.x);

    const newNotes = { ...this.props.note, x: data.x, y: data.y };
    const newProp = { ...this.props, note: newNotes };
    // console.log('new note');
    // console.log(newNotes);
    this.props.updateNote(newProp);
  };

  render() {
    return (
      <Draggable
        handle=".move-icon" // this is for you to define, what part of the note do you want to drag by
        grid={[25, 25]} // snapping to grid pixels
        defaultPosition={{ x: 20, y: 20 }} // if no position given
        position={{
          x: this.props.note.x, y: this.props.note.y, width: 200, height: 100,
        }}
        onStart={this.handleStartDrag}
        onDrag={this.handleDrag}
        onStop={this.handleStopDrag}
      >
        <div className="note">
          <div className="note-top-bar">
            <div className="note-top-bar-left">
              <p> {this.props.note.title} </p>
              <i className="fa-solid fa-pencil" />
              <div className="move-icon"> <i className=" fa-solid fa-arrows-up-down-left-right" /> </div>
            </div>
            <i onClick={this.handleDeleteClick} className="fa fa-trash-o" aria-hidden="true" />
          </div>
          <div className="note-content">
            <p> {this.props.note.text} </p>
          </div>
        </div>
      </Draggable>

    );
  }
}

export default Note;
