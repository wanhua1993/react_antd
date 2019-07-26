import React, { Component } from 'react';
import MarkdownEditor from '../../components/editor/markdown';
import { Card } from 'antd';
import './index.less';
export default class Markdown extends Component {
  render() {
    return (
      <Card title="Markdown">
        <MarkdownEditor />
      </Card>
    )
  }
}
