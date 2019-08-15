import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { style } from "./model_css";
import './index.less';
console.log(style);

export default class Model_one extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  modelTitle(title) {
    return <div>
      <p style={style.modelonetitle}>{title}</p>
      <div style={style.modeloneborder}></div>
    </div>
  }
  ulFlexLi(time, company, position) {
    return <ul style={style.modeloneback}>
      <li>{time}</li>
      <li>{company}</li>
      <li>{position}</li>
    </ul>
  }
  modelWork() {
    const { work_1 } = this.props;
    return <ul className='model-one-work'>
      {
        work_1.map((item, ind) => (
          <li key={item.company + ind} style={style.modeloneworkli}>
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
    const { project_1 } = this.props;
    return <ul className='model-one-work'>
      {
        project_1.map((item, ind) => (
          <li key={item._id} style={style.modeloneworkli}>
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
        <ul style={style.modeloneback}>
          <li>{item.time[0] + ' ~ ' + item.time[1]}</li>
          <li>{item.school}</li>
          <li>{item.professional}</li>
        </ul>
        <p>{item.things}</p>
      </div>
    ))
  }
  render() {
    const { user_1, model_1 } = this.props;
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
      <div style={style.modelonecontent} style={{
        display: model_1 === '1' ? 'block' : 'none',
        padding: '60px'
      }} id={'model-content-1'}>
        {this.modelTitle('基本信息')}
        <div style={style.modeloneinfo}>
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
          <div style={style.modeloneavatar}>
            <img src={user_1.avatar} alt="" style={style.img} />
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div style={style.modeloneinfo}>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">{user_1.position}</Descriptions.Item>
            <Descriptions.Item label="薪资">{user_1.salary}</Descriptions.Item>
            <Descriptions.Item label="地点">{user_1.address}</Descriptions.Item>
            <Descriptions.Item label="到岗时间">{report[user_1.reportTime]}</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div style={style.modeloneinfo}>
          {
            this.modelEduBack(user_1.eduBack)
          }
        </div>
        {this.modelTitle('个人能力')}
        <div style={style.modeloneinfo}>
          {
            this.modelSkills(user_1.skills)
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
            this.modelEval(user_1.evaluation)
          }
        </div>
        {this.modelTitle('兴趣爱好')}
        <div style={style.modeloneinfo}>
          <p>{user_1.hobby}</p>
        </div>
      </div>
    )
  }
}
