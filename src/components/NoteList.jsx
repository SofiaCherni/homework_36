import { Component } from 'react';

class NoteList extends Component {
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

export default NoteList;