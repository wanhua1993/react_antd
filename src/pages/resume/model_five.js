import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_three extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'five',
      color: '#223e64'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_5 } = this.props;
    const { model, color } = this.state;
    if (color_5) {
      this.setState({
        color: color_5
      }, () => {
        this.setState(styleList(model, color_5));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelfivetitle, modelTitle, modelfiveCircle1, modelfiveCircle2, modelfiveborder } = this.state;
    return <div style={{ marginLeft: '40px' }}>
      <div style={{ ...modelfivetitle, ...modelTitle }}>
        {title}
        <div style={modelfiveCircle1}>
          <div style={modelfiveCircle2}></div>
        </div>
      </div>
      <div style={modelfiveborder}></div>
    </div>
  }


  render() {
    const { user_5, model_5, work_5, project_5 } = this.props;
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
    const { modelfiveLeft, modelfiveavatar, modelAvatar, modelfiveright, modelinfo, img } = this.state;
    return (
      <div style={{
        display: model_5 === '5' ? 'block' : 'none',
        paddingRight: '60px',
        paddingTop: '60px',
        overflow: 'hidden',
        position: 'relative'
      }} id={'model-content-5'}>
        <div style={modelfiveLeft}>
          <div style={{ ...modelfiveavatar, ...modelAvatar }}>
            <img src={user_5.avatar} alt="" style={img} />
          </div>
          <Descriptions layout="horizontal" column={1} style={{ color: '#fff' }}>
            <Descriptions.Item label="姓名">{user_5.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{user_5.sex === '1' ? '女' : '男'}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user_5.year}岁</Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions layout="horizontal" column={1} style={{ color: '#fff' }}>
            <Descriptions.Item label="经验">{user_5.year}年</Descriptions.Item>
            <Descriptions.Item label="手机">{user_5.phone}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user_5.email}</Descriptions.Item>
            <Descriptions.Item label="学历">{record[user_5.record]}</Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions layout="horizontal" column={1} style={{ color: '#fff' }}>
            <Descriptions.Item label="岗位">{user_5.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_5.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_5.address}</Descriptions.Item>
            <Descriptions.Item label="时间">{report[user_5.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        <div style={modelfiveright}>
          {this.modelTitle('教育背景')}
          <div style={modelinfo}>
            {
              modelEduBack(user_5.eduBack, this.state)
            }
          </div>
          {this.modelTitle('个人能力')}
          <div style={modelinfo}>
            {
              modelSkills(user_5.skills, this.state)
            }
          </div>
          {this.modelTitle('工作经历')}
          <div style={modelinfo}>
            {
              modelWork(work_5, this.state)
            }
          </div>
          {this.modelTitle('项目经验')}
          <div style={modelinfo}>
            {
              modelProject(project_5, this.state)
            }
          </div>
          {this.modelTitle('自我评价')}
          <div style={modelinfo}>
            {
              modelEval(user_5.evaluation, this.state)
            }
          </div>
          {this.modelTitle('兴趣爱好')}
          <div style={modelinfo}>
            <p>{user_5.hobby}</p>
          </div>
        </div>
      </div>
    )
  }
}
