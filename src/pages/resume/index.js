import React, { Component } from 'react';
import { Button } from 'antd';
import ModelOne from './model_one';
import ModelTwo from './model_two';
import ModelThree from './model_three';
import ModelFour from './model_four';
import ModelFive from './model_five';
import { projectListAll, workListAll } from '@/api/login';
import { getStorage } from '@/utils';
import './index.less';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 0,
      user: {},
      workList: [],
      projectList: []
    }
  }
  componentDidMount() {
    const model = this.props.location.search.split('model=')[1];
    const user = getStorage('user');
    projectListAll({ uId: user._id }).then(res => {
      this.setState({
        projectList: res
      })
    });
    workListAll({ uId: user._id }).then(res => {
      this.setState({
        workList: res
      })
    });
    this.setState({
      user,
      model
    });
  }
  print() {
    const { model } = this.state;
    window.document.body.innerHTML = window.document.getElementById(`model-content-${model}`).innerHTML; window.print();
    window.location.reload();
  }
  back() {
    this.props.history.go(-1);
  }
  render() {
    const { model, user, workList, projectList } = this.state;
    return (
      <div className='content resume-wraper'>
        <div className='resume-page'>
          <Button type='primary' size='large'>下载</Button>
          <Button type='primary' size='large' onClick={this.print.bind(this)}>打印</Button>
          <Button type='text' size='large' onClick={this.back.bind(this)}>返回</Button>
        </div>
        <div className='resume-content'>
          <ModelOne model_1={model} user_1={user} work_1={workList} project_1={projectList} />
          <ModelTwo model_2={model} user_2={user} work_2={workList} project_2={projectList} />
          <ModelThree model_3={model} user_3={user} work_3={workList} project_3={projectList} />
          <ModelFour model_4={model} user_4={user} work_4={workList} project_4={projectList} />
          <ModelFive model_5={model} user_5={user} work_5={workList} project_5={projectList} />
        </div>
      </div>
    )
  }
}
