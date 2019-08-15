import React, { Component } from 'react';
import { Button } from 'antd';
import ModelOne from './model_one';
import './index.less';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 0,
    }
  }
  componentDidMount() {
    const model = this.props.location.search.split('model=')[1];
    this.setState({
      model
    });
  }
  render() {
    const { model } = this.state;
    return (
      <div className='content resume-wraper'>
        <div className='resume-page'>
          <Button type='primary' size='large'>下载</Button>
          <Button type='primary' size='large'>打印</Button>
          <Button type='text' size='large'>返回</Button>
        </div>
        <div className='resume-content'>
          <ModelOne model_1={model} />
        </div>
      </div>
    )
  }
}
