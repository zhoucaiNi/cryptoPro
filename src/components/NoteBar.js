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
    console.log(this.props);
    this.props.addNote(this.state.title);
  };

  render() {
    return (
      <div className="notebar">
        <input className="search" onChange={this.onInputChange} value={this.state.title} />
        <input className="search-button" onClick={this.onButtonSubmit} type="button" value="submit" />
      </div>
    );
  }
}

export default NoteBar;
