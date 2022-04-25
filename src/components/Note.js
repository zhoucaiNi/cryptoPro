/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import '../style.scss';
import TextareaAutosize from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  handleDeleteClick = () => {
    console.log(this.props.id);
    this.props.removeNote(this.props.id);
  };

  handleDrag = (e, data) => {
    const newNotes = { ...this.props.note, x: data.x, y: data.y };
    const newProp = { ...this.props, note: newNotes };
    this.props.updateNote(newProp);
  };

  handleTextEditClick = (e) => {
    this.setState({ isEditing: true });
  };

  handleTextEditFinish = (e) => {
    this.setState({ isEditing: false });
  };

  handleTextEdit = (event) => {
    console.log(this.props);
    const newNote = { ...this.props.note, text: event.target.value };
    const newProp = { ...this.props, note: newNote };
    this.props.updateNote(newProp);
  };

  editRender = (e) => {
    if (this.state.isEditing) {
      return <div className="edit-done-icon"> <i onClick={this.handleTextEditFinish} className="fa-solid fa-check" aria-hidden="true" /></div>;
    } else {
      return <div className="edit-icon"> <i onClick={this.handleTextEditClick} className="fa-solid fa-pencil" aria-hidden="true" /></div>;
    }
  };

  editText = (event) => {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize
          onChange={this.handleTextEdit}
          className="note-text"
          value={this.props.note.text}
          placeholder="Search..."
        />
      );
    } else {
      return <ReactMarkdown>{this.props.note.text || ''}</ReactMarkdown>;
    }
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
              {this.editRender()}
              <div className="move-icon"> <i className=" fa-solid fa-arrows-up-down-left-right" /> </div>
            </div>
            <i onClick={this.handleDeleteClick} className="fa fa-trash-o" aria-hidden="true" />
          </div>
          <div className="note-content">
            {this.editText()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
