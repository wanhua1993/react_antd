import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_eight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'eight',
      color: '#223e64'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_8 } = this.props;
    const { model, color } = this.state;
    if (color_8) {
      this.setState({
        color: color_8
      }, () => {
        this.setState(styleList(model, color_8));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modeleighttitle, modelTitle, modeleightCircle1, modeleightCircle2, modeleightborder } = this.state;
    return <div>
      <div style={{ ...modeleighttitle, ...modelTitle }}>
        {title}
        <div style={modeleightCircle1}>
          <div style={modeleightCircle2}></div>
        </div>
      </div>
      <div style={modeleightborder}></div>
    </div>
  }

  render() {
    const { user_8, model_8, work_8, project_8 } = this.props;
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
    const { modelinfo, modeleightbasicbox, modeleightavatar, modelAvatar, modeleightbasic, modeleightbasicname, modeleightbasicul, modeleightbasicli, modelspan, img, clear, modeleightheader, modeleightwrite } = this.state;
    return (
      <div style={{
        display: model_8 === '8' ? 'block' : 'none',
        padding: '40px 0'
      }} id={'model-content-8'}>
        <div style={modeleightheader}>
          <div style={modeleightwrite}></div>
        </div>
        <div style={{ padding: '0 60px' }}>

          <div style={modelinfo}>
            <div style={modeleightbasicbox}>
              <div style={{ ...modeleightavatar, ...modelAvatar }}>
                <img src={user_8.avatar} alt="" style={img} />
              </div>
              <div style={modeleightbasic}>
                <p style={modeleightbasicname}>{user_8.name}</p>
                <ul style={modeleightbasicul}>
                  <li style={modeleightbasicli}>{user_8.sex === '1' ? '女' : '男'}</li>
                  <span style={modelspan}></span>
                  <li style={modeleightbasicli}>{user_8.year}岁</li>
                  <span style={modelspan}></span>
                  <li style={modeleightbasicli}>{record[user_8.record]}</li>
                  <span style={modelspan}></span>
                  <li style={modeleightbasicli}>{user_8.phone}</li>
                  <span style={modelspan}></span>
                  <li style={modeleightbasicli}>{user_8.email}</li>
                  <span style={modelspan}></span>
                  <li style={modeleightbasicli}>{user_8.position}</li>
                </ul>
                <p>{user_8.hobby}</p>
              </div>
              <div style={clear}></div>
            </div>
          </div>
          {this.modelTitle('求职意向')}
          <div style={modelinfo}>
            <Descriptions layout="horizontal" column={4}>
              <Descriptions.Item label="岗位">{user_8.position}</Descriptions.Item>
              <Descriptions.Item label="薪资">{user_8.salary}</Descriptions.Item>
              <Descriptions.Item label="地点">{user_8.address}</Descriptions.Item>
              <Descriptions.Item label="到岗时间">{report[user_8.reportTime]}</Descriptions.Item>
            </Descriptions>
          </div>
          {this.modelTitle('教育背景')}
          <div style={modelinfo}>
            {
              modelEduBack(user_8.eduBack, this.state)
            }
          </div>
          {this.modelTitle('个人能力')}
          <div style={modelinfo}>
            {
              modelSkills(user_8.skills, this.state)
            }
          </div>
          {this.modelTitle('工作经历')}
          <div style={modelinfo}>
            {
              modelWork(work_8, this.state)
            }
          </div>
          {this.modelTitle('项目经验')}
          <div style={modelinfo}>
            {
              modelProject(project_8, this.state)
            }
          </div>
          {this.modelTitle('自我评价')}
          <div style={modelinfo}>
            {
              modelEval(user_8.evaluation, this.state)
            }
          </div>
          {this.modelTitle('兴趣爱好')}
          <div style={modelinfo}>
            <p>{user_8.hobby}</p>
          </div>
        </div>
      </div>
    )
  }
}
