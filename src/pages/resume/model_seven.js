import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import { styleList } from "./model_css";
import './index.less';
export default class Model_seven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'seven',
      color: '#54595c'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_7 } = this.props;
    const { model, color } = this.state;
    if (color_7) {
      this.setState({
        color: color_7
      }, () => {
        this.setState(styleList(model, color_7));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelseventitle, modelTitle } = this.state;
    return <div style={{ background: '#ddd' }}>
      <p style={{ ...modelseventitle, ...modelTitle }}>{title}</p>
    </div>
  }

  render() {
    const { user_7, model_7, work_7, project_7 } = this.props;
    const { modelinfo, modelsevenavatar, modelAvatar, img, modelsevenCon } = this.state;
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
        display: model_7 === '7' ? 'block' : 'none',
        padding: '20px 60px'
      }} id={'model-content-7'}>
        <div style={modelsevenCon}>
          个人简历
        </div>
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={2}>
            <Descriptions.Item label="姓名">{user_7.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{user_7.sex === '1' ? '女' : '男'}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user_7.year}</Descriptions.Item>
            <Descriptions.Item label="经验">{user_7.year}年</Descriptions.Item>
            <Descriptions.Item label="手机">{user_7.phone}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user_7.email}</Descriptions.Item>
            <Descriptions.Item label="最高学历">{record[user_7.record]}</Descriptions.Item>
            <Descriptions.Item label="应聘岗位">{user_7.position}</Descriptions.Item>
          </Descriptions>
          <div style={{ ...modelsevenavatar, ...modelAvatar }}>
            <img src={user_7.avatar} alt="" style={img} />
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_7.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_7.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_7.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_7.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={modelinfo}>
          {
            modelEduBack(user_7.eduBack, this.state)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={modelinfo}>
          {
            modelSkills(user_7.skills, this.state)
          }
        </div>
        {this.modelTitle('工作经历')}
        <div style={modelinfo}>
          {
            modelWork(work_7, this.state)
          }
        </div>
        {this.modelTitle('项目经验')}
        <div style={modelinfo}>
          {
            modelProject(project_7, this.state)
          }
        </div>
        {this.modelTitle('自我评价')}
        <div style={modelinfo}>
          {
            modelEval(user_7.evaluation, this.state)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={modelinfo}>
          <p>{user_7.hobby}</p>
        </div>
      </div>
    )
  }
}
