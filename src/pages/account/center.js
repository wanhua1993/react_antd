import React, { Component } from 'react';
import { Tooltip, Card } from 'antd';
import resume_1 from '../../assets/resume/resume_1.jpg';
import resume_2 from '../../assets/resume/resume_2.jpg';
import resume_3 from '../../assets/resume/resume_3.jpg';
import resume_4 from '../../assets/resume/resume_4.jpg';
import resume_5 from '../../assets/resume/resume_5.jpg';
import resume_6 from '../../assets/resume/resume_6.jpg';
import resume_7 from '../../assets/resume/resume_7.jpg';
import resume_8 from '../../assets/resume/resume_8.jpg';
import './index.less';

export default class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: [
        {
          model: 1,
          url: resume_1
        },
        {
          model: 2,
          url: resume_2
        },
        {
          model: 3,
          url: resume_3
        },
        {
          model: 4,
          url: resume_4
        },
        {
          model: 5,
          url: resume_5
        },
        {
          model: 6,
          url: resume_6
        },
        {
          model: 7,
          url: resume_7
        },
        {
          model: 8,
          url: resume_8
        }
      ]
    }
  }
  lookAtResume(model) {
    const { history } = this.props;
    history.push(`/resume?model=${model}`);
  }
  resumeList() {
    const { resumeData } = this.state;
    return resumeData.map((item) => (
      <li className='resume-li' key={item.url}>
        <div className='resume-back'>
          <img src={item.url} alt="" className='resume-back-img' />
          <div className='resume-modal'>
            <p className='resume-modal-look' onClick={this.lookAtResume.bind(this, item.model)}>查看</p>
            <p className='resume-modal-print'>打印</p>
          </div>
        </div>
        <p className='resume-desc'>
          <Tooltip title='支持下载PDF'>
            <span className='resume-desc-pdf'>PDF</span>
          </Tooltip>
          <Tooltip title='支持下载WORD'>
            <span className='resume-desc-word'>WORD</span>
          </Tooltip>
          <span className='resume-desc-num'>1234人使用</span>
        </p>
      </li>
    ));
  }
  render() {
    return (
      <div className='content'>
        <Card title='简历模板'>
          {/* <p className='resume-title'>简历模板</p> */}
          <ul className='resume-ul'>
            {
              this.resumeList()
            }
          </ul>
        </Card>
      </div>
    )
  }
}
