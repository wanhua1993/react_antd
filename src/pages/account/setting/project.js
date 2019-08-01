import React, { Component } from 'react'

export default class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { p_key } = this.props;
    return (
      <div style={{display: p_key === '4' ? 'block' : 'none'}}>
        project
      </div>
    )
  }
}


