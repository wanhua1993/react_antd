import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import { styleList } from "./model_css";
import { urlToBase64 } from '@/utils/tools';
import './index.less';
export default class Model_one extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'one',
      color: 'rgb(6, 132, 250)'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_1 } = this.props;
    const { model, color } = this.state;
    if (color_1) {
      this.setState({
        color: color_1
      }, () => {
        this.setState(styleList(model, color_1));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelonetitle, modelTitle, modeloneborder } = this.state;
    return <div>
      <p style={{ ...modelonetitle, ...modelTitle }}>{title}</p>
      <div style={modeloneborder}></div>
    </div>
  }

  if_avatar(avatar) {
    const { img } = this.state;
    if (avatar) {
      return <img src={urlToBase64(avatar)} alt="" style={img} />
    }
    return ''
  }
  render() {
    const { user_1, model_1, work_1, project_1 } = this.props;
    const { modelinfo, modeloneavatar, modelAvatar, img } = this.state;
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
        display: model_1 === '1' ? 'block' : 'none',
        padding: '60px'
      }} id={'model-content-1'}>
        {this.modelTitle('基本信息')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={2}>
            <Descriptions.Item label="姓名">{user_1.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{user_1.sex === '1' ? '女' : '男'}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user_1.year}</Descriptions.Item>
            <Descriptions.Item label="经验">{user_1.year}年</Descriptions.Item>
            <Descriptions.Item label="手机">{user_1.phone}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user_1.email}</Descriptions.Item>
            <Descriptions.Item label="最高学历">{record[user_1.record]}</Descriptions.Item>
            <Descriptions.Item label="应聘岗位">{user_1.position}</Descriptions.Item>
          </Descriptions>
          <div style={{ ...modeloneavatar, ...modelAvatar }}>
            <img src={user_1.avatar} alt="" style={img} />
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={modelinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_1.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_1.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_1.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_1.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={modelinfo}>
          {
            modelEduBack(user_1.eduBack, this.state)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={modelinfo}>
          {
            modelSkills(user_1.skills, this.state)
          }
        </div>
        {this.modelTitle('工作经历')}
        <div style={modelinfo}>
          {
            modelWork(work_1, this.state)
          }
        </div>
        {this.modelTitle('项目经验')}
        <div style={modelinfo}>
          {
            modelProject(project_1, this.state)
          }
        </div>
        {this.modelTitle('自我评价')}
        <div style={modelinfo}>
          {
            modelEval(user_1.evaluation, this.state)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={modelinfo}>
          <p>{user_1.hobby}</p>
        </div>
      </div>
    )
  }
}
