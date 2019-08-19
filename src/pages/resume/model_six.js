import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_six extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'six',
      color: '#019a89'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_6 } = this.props;
    const { model, color } = this.state;
    if (color_6) {
      this.setState({
        color: color_6
      }, () => {
        this.setState(styleList(model, color_6));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelsixtitle, modelTitle, modelsixborder } = this.state;
    return <div>
      <div style={{ ...modelsixtitle, ...modelTitle }}>
        {title}
      </div>
      <div style={modelsixborder}></div>
    </div>
  }

  render() {
    const { user_6, model_6, work_6, project_6 } = this.props;
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
    const { modelinfo, modelsixbasicbox, modelsixavatar, modelsixbasicname, modelsixbasicul, modelsixbasicli, modelspan, clear } = this.state;
    return (
      <div style={{
        display: model_6 === '6' ? 'block' : 'none',
        padding: '30px 60px'
      }} id={'model-content-6'}>
        <div style={modelinfo}>
          <div style={modelsixbasicbox}>
            <div style={{ ...modelsixavatar }}>
              <img src={user_6.avatar} alt="" width='130' height='160' style={{ borderRadius: '50%' }} />
            </div>
            <div>
              <p style={modelsixbasicname}>{user_6.name}</p>
              <ul style={modelsixbasicul}>
                <li style={modelsixbasicli}>{user_6.sex === '1' ? '女' : '男'}</li>
                <span style={modelspan}></span>
                <li style={modelsixbasicli}>{user_6.year}岁</li>
                <span style={modelspan}></span>
                <li style={modelsixbasicli}>{record[user_6.record]}</li>
                <span style={modelspan}></span>
                <li style={modelsixbasicli}>{user_6.phone}</li>
                <span style={modelspan}></span>
                <li style={modelsixbasicli}>{user_6.email}</li>
                <span style={modelspan}></span>
                <li style={modelsixbasicli}>{user_6.position}</li>
              </ul>
            </div>
            <div style={clear}></div>
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_6.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_6.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_6.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_6.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={modelinfo}>
          {
            modelEduBack(user_6.eduBack, this.state)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={modelinfo}>
          {
            modelSkills(user_6.skills, this.state)
          }
        </div>
        {this.modelTitle('工作经历')}
        <div style={modelinfo}>
          {
            modelWork(work_6, this.state)
          }
        </div>
        {this.modelTitle('项目经验')}
        <div style={modelinfo}>
          {
            modelProject(project_6, this.state)
          }
        </div>
        {this.modelTitle('自我评价')}
        <div style={modelinfo}>
          {
            modelEval(user_6.evaluation, this.state)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={modelinfo}>
          <p>{user_6.hobby}</p>
        </div>
      </div>
    )
  }
}
