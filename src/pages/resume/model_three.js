import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { style } from "./model_css";
import './index.less';

export default class Model_three extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  modelTitle(title) {
    return <div>
      <div style={style.modelthreetitle}>
        {title}
        <div style={style.modelthreeCircle1}>
          <div style={style.modelthreeCircle2}></div>
        </div>
      </div>
      <div style={style.modelthreeborder}></div>
    </div>
  }
  ulFlexLi(time, company, position) {
    return <ul style={style.modelthreeback}>
      <li>{time}</li>
      <li>{company}</li>
      <li>{position}</li>
    </ul>
  }
  modelWork() {
    const { work_3 } = this.props;
    return <ul className='model-one-work'>
      {
        work_3.map((item, ind) => (
          <li key={item.company + ind} style={style.modeltwoworkli}>
            {
              this.ulFlexLi(`${item.startTime} ~ ${item.endTime}`, item.company, item.position)
            }
            <p style={style.modeloneworkdesc}>工作描述: </p>
            {
              item.workDesc.map((val, index) => (
                <p key={val + index} style={style.modelonedesclist}>
                  {index + 1}、 {val}
                </p>
              ))
            }
          </li>
        ))
      }
    </ul>
  }
  modelProject() {
    const { project_3 } = this.props;
    return <ul className='model-one-work'>
      {
        project_3.map((item, ind) => (
          <li key={item._id} style={style.modeltwoworkli}>
            {
              this.ulFlexLi(item.title, `${item.startTime} ~ ${item.endTime}`, '')
            }
            <p style={style.modeloneworkdesc}>项目简述: <span style={style.modeloneworkdescspan}> {item.proDesc} </span></p>
            <p style={style.modeloneworkdesc}>责任描述: </p>
            {
              item.resDesc.map((val, index) => (
                <p key={val + index} style={style.modelonedesclist}>
                  {index + 1}、 {val}
                </p>
              ))
            }
          </li>
        ))
      }
    </ul>
  }
  modelEval(evaluation) {
    evaluation = evaluation ? evaluation : [];
    return <ul className='model-one-eval'>
      {
        evaluation.map((item, index) => (
          <li key={item + index} style={style.modeloneevalli}>
            {index + 1}、 {item}
          </li>
        ))
      }
    </ul>
  }
  modelSkills(skills) {
    skills = skills ? skills : [];
    return <ul className='model-one-eval'>
      {
        skills.map((item, index) => (
          <li key={item + index} style={style.modeloneevalli}>
            {index + 1}、 {item}
          </li>
        ))
      }
    </ul>
  }
  modelEduBack(data) {
    data = data ? data : [];
    return data.map((item, index) => (
      <div key={index}>
        <ul style={style.modelthreeback}>
          <li>{item.time[0] + ' ~ ' + item.time[1]}</li>
          <li>{item.school}</li>
          <li>{item.professional}</li>
        </ul>
        <p>{item.things}</p>
      </div>
    ))
  }

  render() {
    const { user_3, model_3 } = this.props;
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
        display: model_3 === '3' ? 'block' : 'none',
        ...style.modelthreeHeader
      }} id={'model-content-3'}>
        <div style={style.modelthreeLeft}></div>
        <div style={style.modelthreeright}>
          {this.modelTitle('基本信息')}
          <div style={style.modeloneinfo}>
            <div style={style.modelthreebasicbox}>
              <div style={style.modelthreeavatar}>
                <img src={user_3.avatar} alt="" style={style.img} />
              </div>
              <div style={style.modelthreebasic}>
                <p style={style.modeltwobasicname}>{user_3.name}</p>
                <ul style={style.modeltwobasicul}>
                  <li style={style.modeltwobasicli}>{user_3.sex === '1' ? '女' : '男'}</li>
                  <span style={style.modelspan}></span>
                  <li style={style.modeltwobasicli}>{user_3.year}岁</li>
                  <span style={style.modelspan}></span>
                  <li style={style.modeltwobasicli}>{record[user_3.record]}</li>
                  <span style={style.modelspan}></span>
                  <li style={style.modeltwobasicli}>{user_3.phone}</li>
                  <span style={style.modelspan}></span>
                  <li style={style.modeltwobasicli}>{user_3.email}</li>
                  <span style={style.modelspan}></span>
                  <li style={style.modeltwobasicli}>{user_3.position}</li>
                </ul>
                <p>{user_3.hobby}</p>
              </div>
              <div style={style.clear}></div>
            </div>
          </div>
          {this.modelTitle('求职意向')}
          <div style={style.modeloneinfo}>
            <Descriptions layout="horizontal" column={4}>
              <Descriptions.Item label="岗位">{user_3.position}</Descriptions.Item>
              <Descriptions.Item label="薪资">{user_3.salary}</Descriptions.Item>
              <Descriptions.Item label="地点">{user_3.address}</Descriptions.Item>
              <Descriptions.Item label="到岗时间">{report[user_3.reportTime]}</Descriptions.Item>
            </Descriptions>
          </div>
          {this.modelTitle('教育背景')}
          <div style={style.modeloneinfo}>
            {
              this.modelEduBack(user_3.eduBack)
            }
          </div>
          {this.modelTitle('个人能力')}
          <div style={style.modeloneinfo}>
            {
              this.modelSkills(user_3.skills)
            }
          </div>
          {this.modelTitle('工作经历')}
          <div style={style.modeloneinfo}>
            {
              this.modelWork()
            }
          </div>
          {this.modelTitle('项目经验')}
          <div style={style.modeloneinfo}>
            {
              this.modelProject()
            }
          </div>
          {this.modelTitle('自我评价')}
          <div style={style.modeloneinfo}>
            {
              this.modelEval(user_3.evaluation)
            }
          </div>
          {this.modelTitle('兴趣爱好')}
          <div style={style.modeloneinfo}>
            <p>{user_3.hobby}</p>
          </div>
        </div>
        {/* <div style={style.clear}></div>   */}
      </div>
    )
  }
}
