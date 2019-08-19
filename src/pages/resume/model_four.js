import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_four extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'four',
      color: '#2955a1'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_4 } = this.props;
    const { model, color } = this.state;
    if (color_4) {
      this.setState({
        color: color_4
      }, () => {
        this.setState(styleList(model, color_4));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelfourtitle, modelTitle, modeltriangle, modelborder } = this.state;
    return <div style={{ position: 'relative' }}>
      <div style={{ ...modelfourtitle, ...modelTitle }}>
        {title}
        <div style={modeltriangle}></div>
      </div>
      <div style={modelborder}></div>
    </div>
  }

  render() {
    const { user_4, model_4, work_4, project_4 } = this.props;
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
    const { modelinfo, modelfourbasicbox, modelfouravatar, modelAvatar, modelfourbasic, clear, modelfourbasicname, modelfourbasicul, modelspan, modelfourbasicli, img } = this.state;
    return (
      <div style={{
        display: model_4 === '4' ? 'block' : 'none',
        padding: '60px',
        overflow: 'hidden'
      }} id={'model-content-4'}>
        <div style={modelinfo}>
          <div style={modelfourbasicbox}>
            <div style={{ ...modelfouravatar, ...modelAvatar }}>
              <img src={user_4.avatar} alt="" style={img} />
            </div>
            <div style={modelfourbasic}>
              <p style={modelfourbasicname}>{user_4.name}</p>
              <ul style={modelfourbasicul}>
                <li style={modelfourbasicli}>{user_4.sex === '1' ? '女' : '男'}</li>
                <span style={modelspan}></span>
                <li style={modelfourbasicli}>{user_4.year}岁</li>
                <span style={modelspan}></span>
                <li style={modelfourbasicli}>{record[user_4.record]}</li>
                <span style={modelspan}></span>
                <li style={modelfourbasicli}>{user_4.phone}</li>
                <span style={modelspan}></span>
                <li style={modelfourbasicli}>{user_4.email}</li>
                <span style={modelspan}></span>
                <li style={modelfourbasicli}>{user_4.position}</li>
              </ul>
              <p>{user_4.hobby}</p>
            </div>
            <div style={clear}></div>
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_4.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_4.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_4.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_4.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={modelinfo}>
          {
            modelEduBack(user_4.eduBack, this.state)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={modelinfo}>
          {
            modelSkills(user_4.skills, this.state)
          }
        </div>
        {this.modelTitle('工作经历')}
        <div style={modelinfo}>
          {
            modelWork(work_4, this.state)
          }
        </div>
        {this.modelTitle('项目经验')}
        <div style={modelinfo}>
          {
            modelProject(project_4, this.state)
          }
        </div>
        {this.modelTitle('自我评价')}
        <div style={modelinfo}>
          {
            modelEval(user_4.evaluation, this.state)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={modelinfo}>
          <p>{user_4.hobby}</p>
        </div>
      </div>
    )
  }
}
