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
      <div id="notebar">
        <input className="search-bar"
          onChange={this.onInputChange}
          value={this.state.title}
          placeholder="enter note title"
        />
        <input className="search-button" onClick={this.onButtonSubmit} type="button" value="submit" />
      </div>
    );
  }
}

export default NoteBar;
