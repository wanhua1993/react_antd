import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_two extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'two',
      color: '#222'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_2 } = this.props;
    const { model, color } = this.state;
    if (color_2) {
      this.setState({
        color: color_2
      }, () => {
        this.setState(styleList(model, color_2));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modeltwotitle, modelTitle } = this.state;
    return <div>
      <p style={{ ...modeltwotitle, ...modelTitle }}>{title}</p>
    </div>
  }

  render() {
    const { user_2, model_2, work_2, project_2 } = this.props;
    const { img, modelinfo, modeltwobasicbox, modeltwoavatar, modelAvatar, modeltwobasic, modeltwoavatarborder, modeltwobasicname, modeltwobasicul, modelspan, modeltwobasicli, clear } = this.state;
    let record = {
      '0': '高中',
      '1': '专科',
      '2': '本科',
      '3': '研究生',
      '4': '博士'
    }
    let report = {
      '0': '随时到岗',
      '1': '一周以内',
      '2': '半月以内'
    }
    return (
      <div style={{
        display: model_2 === '2' ? 'block' : 'none',
        padding: '60px',
        overflow: 'hidden'
      }} id={'model-content-2'}>
        <div style={modelinfo}>
          <div style={modeltwobasicbox}>
            <div style={{ ...modeltwoavatar, ...modelAvatar }}>
              <img src={user_2.avatar} alt="" style={img} />
            </div>
            <div style={modeltwobasic}>
              <p style={modeltwobasicname}>{user_2.name}</p>
              <ul style={modeltwobasicul}>
                <li style={modeltwobasicli}>{user_2.sex === '1' ? '女' : '男'}</li>
                <span style={modelspan}></span>
                <li style={modeltwobasicli}>{user_2.year}岁</li>
                <span style={modelspan}></span>
                <li style={modeltwobasicli}>{record[user_2.record]}</li>
                <span style={modelspan}></span>
                <li style={modeltwobasicli}>{user_2.phone}</li>
                <span style={modelspan}></span>
                <li style={modeltwobasicli}>{user_2.email}</li>
                <span style={modelspan}></span>
                <li style={modeltwobasicli}>{user_2.position}</li>
              </ul>
              <p>{user_2.hobby}</p>
            </div>
            <div style={modeltwoavatarborder}>
              <div style={{ position: 'absolute', width: '130px', height: '3px', background: '#222' }}></div>
            </div>
            <div style={clear}></div>
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_2.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_2.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_2.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_2.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={modelinfo}>
          {
            modelEduBack(user_2.eduBack, this.state)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={modelinfo}>
          {
            modelSkills(user_2.skills, this.state)
          }
        </div>
        {this.modelTitle('工作经历')}
        <div style={modelinfo}>
          {
            modelWork(work_2, this.state)
          }
        </div>
        {this.modelTitle('项目经验')}
        <div style={modelinfo}>
          {
            modelProject(project_2, this.state)
          }
        </div>
        {this.modelTitle('自我评价')}
        <div style={modelinfo}>
          {
            modelEval(user_2.evaluation, this.state)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={modelinfo}>
          <p>{user_2.hobby}</p>
        </div>
      </div>
    )
  }
}
