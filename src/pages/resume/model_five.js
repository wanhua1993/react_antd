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
    return <div style={{ marginLeft: '40px' }}>
      <div style={style.modelfivetitle}>
        {title}
        <div style={style.modelfiveCircle1}>
          <div style={style.modelfiveCircle2}></div>
        </div>
      </div>
      <div style={style.modelfiveborder}></div>
    </div>
  }
  ulFlexLi(time, company, position) {
    return <ul style={style.modelfiveback}>
      <li>{time}</li>
      <li>{company}</li>
      <li>{position}</li>
    </ul>
  }
  modelWork() {
    const { work_5 } = this.props;
    return <ul className='model-one-work'>
      {
        work_5.map((item, ind) => (
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
    const { project_5 } = this.props;
    return <ul className='model-one-work'>
      {
        project_5.map((item, ind) => (
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
        <ul style={style.modelfiveback}>
          <li>{item.time[0] + ' ~ ' + item.time[1]}</li>
          <li>{item.school}</li>
          <li>{item.professional}</li>
        </ul>
        <p>{item.things}</p>
      </div>
    ))
  }

  render() {
    const { user_5, model_5 } = this.props;
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
        display: model_5 === '5' ? 'block' : 'none',
        paddingRight: '60px',
        paddingTop: '60px',
        overflow: 'hidden',
        position: 'relative'
      }} id={'model-content-5'}>
        <div style={style.modelfiveLeft}>
          <div style={style.modelfiveavatar}>
            <img src={user_5.avatar} alt="" style={style.img} />
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
        <div style={style.modelfiveright}>
          {this.modelTitle('教育背景')}
          <div style={style.modeloneinfo}>
            {
              this.modelEduBack(user_5.eduBack)
            }
          </div>
          {this.modelTitle('个人能力')}
          <div style={style.modeloneinfo}>
            {
              this.modelSkills(user_5.skills)
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
              this.modelEval(user_5.evaluation)
            }
          </div>
          {this.modelTitle('兴趣爱好')}
          <div style={style.modeloneinfo}>
            <p>{user_5.hobby}</p>
          </div>
        </div>
      </div>
    )
  }
}
