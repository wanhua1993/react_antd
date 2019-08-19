import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { styleList } from "./model_css";
import { modelWork, modelProject, modelEval, modelSkills, modelEduBack } from './model_common';
import './index.less';

export default class Model_three extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'three',
      color: '#019a89'
    };
  }
  componentWillMount() {
    const { color, model } = this.state;
    this.setState(styleList(model, color));
  }
  componentWillReceiveProps() {
    const { color_3 } = this.props;
    const { model, color } = this.state;
    if (color_3) {
      this.setState({
        color: color_3
      }, () => {
        this.setState(styleList(model, color_3));
      });
    } else {
      this.setState(styleList(model, color));
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  modelTitle(title) {
    const { modelthreetitle, modelTitle, modelthreeCircle1, modelthreeCircle2, modelthreeborder } = this.state;
    return <div>
      <div style={{ ...modelthreetitle, ...modelTitle }}>
        {title}
        <div style={modelthreeCircle1}>
          <div style={modelthreeCircle2}></div>
        </div>
      </div>
      <div style={modelthreeborder}></div>
    </div>
  }

  render() {
    const { user_3, model_3, work_3, project_3 } = this.props;
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
    const { modelthreeHeader, modelthreeLeft, modelthreeright, modelinfo, modelthreebasicbox, modelthreeavatar, modelAvatar, modelthreebasic, modelthreebasicname, modelthreebasicul, modelthreebasicli, modelspan, img, clear } = this.state;
    return (
      <div style={{
        display: model_3 === '3' ? 'block' : 'none',
        ...modelthreeHeader
      }} id={'model-content-3'}>
        <div style={modelthreeLeft}></div>
        <div style={modelthreeright}>
          {this.modelTitle('基本信息')}
          <div style={modelinfo}>
            <div style={modelthreebasicbox}>
              <div style={{ ...modelthreeavatar, ...modelAvatar }}>
                <img src={user_3.avatar} alt="" style={img} />
              </div>
              <div style={modelthreebasic}>
                <p style={modelthreebasicname}>{user_3.name}</p>
                <ul style={modelthreebasicul}>
                  <li style={modelthreebasicli}>{user_3.sex === '1' ? '女' : '男'}</li>
                  <span style={modelspan}></span>
                  <li style={modelthreebasicli}>{user_3.year}岁</li>
                  <span style={modelspan}></span>
                  <li style={modelthreebasicli}>{record[user_3.record]}</li>
                  <span style={modelspan}></span>
                  <li style={modelthreebasicli}>{user_3.phone}</li>
                  <span style={modelspan}></span>
                  <li style={modelthreebasicli}>{user_3.email}</li>
                  <span style={modelspan}></span>
                  <li style={modelthreebasicli}>{user_3.position}</li>
                </ul>
                <p>{user_3.hobby}</p>
              </div>
              <div style={clear}></div>
            </div>
          </div>
          {this.modelTitle('求职意向')}
          <div style={modelinfo}>
            <Descriptions layout="horizontal" column={4}>
              <Descriptions.Item label="岗位">{user_3.position}</Descriptions.Item>
              <Descriptions.Item label="薪资">{user_3.salary}</Descriptions.Item>
              <Descriptions.Item label="地点">{user_3.address}</Descriptions.Item>
              <Descriptions.Item label="到岗时间">{report[user_3.reportTime]}</Descriptions.Item>
            </Descriptions>
          </div>
          {this.modelTitle('教育背景')}
          <div style={modelinfo}>
            {
              modelEduBack(user_3.eduBack, this.state)
            }
          </div>
          {this.modelTitle('个人能力')}
          <div style={modelinfo}>
            {
              modelSkills(user_3.skills, this.state)
            }
          </div>
          {this.modelTitle('工作经历')}
          <div style={modelinfo}>
            {
              modelWork(work_3, this.state)
            }
          </div>
          {this.modelTitle('项目经验')}
          <div style={modelinfo}>
            {
              modelProject(project_3, this.state)
            }
          </div>
          {this.modelTitle('自我评价')}
          <div style={modelinfo}>
            {
              modelEval(user_3.evaluation, this.state)
            }
          </div>
          {this.modelTitle('兴趣爱好')}
          <div style={modelinfo}>
            <p>{user_3.hobby}</p>
          </div>
        </div>
      </div>
    )
  }
}
