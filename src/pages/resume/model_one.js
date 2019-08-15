import React, { Component } from 'react';
import { Descriptions } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less';

export default class Model_one extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workData: [
        {
          company: '玖富万卡',
          position: '前端',
          time: '2019.4 ~ 2019.9',
          workDesc: [
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的逻辑梳理、设计、以及参与了商业。',
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的逻辑梳理、设计、以及参与了商业推广及谈判。',
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的。'
          ]
        },
        {
          company: '玖富万卡',
          position: '前端',
          time: '2019.4 ~ 2019.9',
          workDesc: [
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的逻辑梳理、设计、以及参与了商业推广及谈判。',
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的逻辑梳理、。',
            '负责公司主营项目EAM（保险公估业务管理系统）和Fn 骑行保的逻辑梳理、设计。'
          ]
        },
      ],
      projectData: [
        {
          name: 'EAM（保险公估业务管理系统）',
          time: '2018-11 ~ 2019-09',
          proDesc: 'EAM 系统（保险公估业务管理系统）是为保险公估企业量身打造的专业化业务管理系统，EAM 系统可实现公估业务全流程的信息化管理，全面推进公估企业的业务处理效率和管理水平。',
          workDesc: [
            'EAM 负责人。和各个公估公司了解业务流程、需求点，进行功能分析梳理，整理出共通的基本需求。',
            '学习保险行业内容，确认保险公估字段；查看保监会资料，了解监管要求。',
            '设计系统的产品原型，进行可行性测试；和各个公估公司约谈，对需求点演示确认。'
          ]
        },
        {
          name: 'EAM（保险公估业务管理系统）',
          time: '2018-11 ~ 2019-09',
          proDesc: 'EAM 系统（保险公估业务管理系统）是为保险公估企业量身打造的专业化业务管理系统，EAM 系统可实现公估业务全流程的信息化管理，全面推进公估企业的业务处理效率和管理水平。',
          workDesc: [
            'EAM 负责人。和各个公估公司了解业务流程、需求点，进行功能分析梳理，整理出共通的基本需求。',
            '学习保险行业内容，确认保险公估字段；查看保监会资料，了解监管要求。',
            '设计系统的产品原型，进行可行性测试；和各个公估公司约谈，对需求点演示确认。'
          ]
        },
      ],
      evaluation: [
        '做过B端、C端的产品，其中包括App、后台系统、小程序、公众号。',
        '有0-1的经验，也独立负责过项目。',
        '接触过保险公估、金融、社交等，对各领域有自己的理解分析和数据来源。',
        '有线下数据调研、活动，推广硬件产品以及参与商业谈判推广等经验。',
        '获得NTC高级用户界面设计师，在高保真Demo及交互设计上有优势。'
      ],
      skills: [
        '做过B端、C端的产品，其中包括App、后台系统、小程序、公众号',
        '有0-1的经验，也独立负责过项目。',
        '接触过保险公估、金融、社交等，对各领域有自己的理解分析和数据来源',
        '有线下数据调研、活动，推广硬件产品以及参与商业谈判推广等经验',
        '获得NTC高级用户界面设计师，在高保真Demo及交互设计上有优势'
      ]
    }
  }
  modelTitle(title) {
    return <div>
      <p className='model-one-title'>{title}</p>
      <div className='model-one-border'></div>
    </div>
  }
  ulFlexLi(time, company, position) {
    return <ul className='model-one-back'>
      <li>{time}</li>
      <li>{company}</li>
      <li>{position}</li>
    </ul>
  }
  modelWork() {
    const { workData } = this.state;
    return <ul className='model-one-work'>
      {
        workData.map((item, ind) => (
          <li key={item.company + ind}>
            {
              this.ulFlexLi(item.time, item.company, item.position)
            }
            <p className='model-one-work-desc'>工作描述: </p>
            {
              item.workDesc.map((val, index) => (
                <p key={val + index} className='model-one-desc-list'>
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
    const { projectData } = this.state;
    return <ul className='model-one-work'>
      {
        projectData.map((item, ind) => (
          <li key={item.name + ind}>
            {
              this.ulFlexLi(item.name, item.time, '')
            }
            <p className='model-one-work-desc'>项目简述: <span> {item.proDesc} </span></p>
            <p className='model-one-work-desc'>责任描述: </p>
            {
              item.workDesc.map((val, index) => (
                <p key={val + index} className='model-one-desc-list'>
                  {index + 1}、 {val}
                </p>
              ))
            }
          </li>
        ))
      }
    </ul>
  }
  modelEval() {
    const { evaluation } = this.state;
    return <ul className='model-one-eval'>
      {
        evaluation.map((item, index) => (
          <li key={item + index}>
            {index + 1}、 {item}
          </li>
        ))
      }
    </ul>
  }
  modelSkills() {
    const { skills } = this.state;
    return <ul className='model-one-eval'>
      {
        skills.map((item, index) => (
          <li key={item + index}>
            {index + 1}、 {item}
          </li>
        ))
      }
    </ul>
  }
  render() {
    return (
      <div className='model-one-content'>
        {this.modelTitle('基本信息')}
        <div className='model-one-info'>
          <Descriptions layout="horizontal" column={2}>
            <Descriptions.Item label="姓名">简晓丽</Descriptions.Item>
            <Descriptions.Item label="性别">女</Descriptions.Item>
            <Descriptions.Item label="年龄">24</Descriptions.Item>
            <Descriptions.Item label="经验">3年</Descriptions.Item>
            <Descriptions.Item label="手机">15600139001</Descriptions.Item>
            <Descriptions.Item label="邮箱">15600139001@163.com</Descriptions.Item>
            <Descriptions.Item label="最高学历">本科</Descriptions.Item>
            <Descriptions.Item label="应聘岗位">前端开发</Descriptions.Item>
          </Descriptions>
          <div className='model-one-avatar'>
            <img src={logo} alt="" />
          </div>
        </div>
        {this.modelTitle('求职意向')}
        <div className='model-one-info'>
          <Descriptions layout="horizontal" column={4}>
            <Descriptions.Item label="岗位">前端开发</Descriptions.Item>
            <Descriptions.Item label="薪资">20K</Descriptions.Item>
            <Descriptions.Item label="地点">北京市</Descriptions.Item>
            <Descriptions.Item label="到岗时间">一周以内</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('教育背景')}
        <div className='model-one-info'>
          {this.ulFlexLi('2012.9 ~ 2016.6', '清华大学', '计算机专业')}
          <Descriptions layout="horizontal" column={1}>
            <Descriptions.Item label="主修课程">javascript、node、vue、react</Descriptions.Item>
          </Descriptions>
        </div>
        {this.modelTitle('个人能力')}
        <div className='model-one-info'>
          {
            this.modelSkills()
          }
        </div>
        {this.modelTitle('工作经历')}
        <div className='model-one-info'>
          {
            this.modelWork()
          }
        </div>
        {this.modelTitle('项目经验')}
        <div className='model-one-info'>
          {
            this.modelProject()
          }
        </div>
        {this.modelTitle('自我评价')}
        <div className='model-one-info'>
          {
            this.modelEval()
          }
        </div>
      </div>
    )
  }
}
