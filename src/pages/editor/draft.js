import React, { Component } from 'react';
import DraftEditor from '../../components/editor/draft';
import { Card } from 'antd'; 

export default class Draft extends Component {
  render() {
    return (
      <Card title='富文本编辑器'>
        <DraftEditor />
      </Card>
    )
  }
}
