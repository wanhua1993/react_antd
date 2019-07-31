import React, { Component } from 'react';
import { uploadVersion } from '@/api/version';

export default class Export extends Component {
  componentWillMount() {
    let data = {
      version: '1',
      url: 'http://git.com'
    }
    uploadVersion(data).then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <div>
        export
      </div>
    )
  }
}
