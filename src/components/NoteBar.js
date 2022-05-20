import React, { Component } from 'react';

class NoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChange = (event) => {
    this.setState({ title: event.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  onButtonSubmit = () => {
    this.props.addNote(this.state.title);
  };

  render() {
    return (
      <div className="window" id="note-bar">
        <div className="title-bar">
          <div className="title-bar-text"> Create New Note </div>
          <div className="title-bar-controls">
            <button type="button" aria-label="Minimize" />
            <button type="button" aria-label="Maximize" />
            <button type="button" aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <div className="field-row">
            <input
              id="text17"
              className="search-bar"
              onChange={this.onInputChange}
              type="text"
              value={this.state.title}
              placeholder="enter note title"
            />
            <button onClick={this.onButtonSubmit} type="button" value="submit"> Create New Note </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteBar;
