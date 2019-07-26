import React, { Component } from 'react';
import Editor from 'for-editor';

export default class Markdown extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }
  render() {
    const { value } = this.state
    return (
      <div className='content'>
        <Editor
          value={value}
          height={700}
          onChange={() => this.handleChange()} />
      </div>
    )
  }
}
