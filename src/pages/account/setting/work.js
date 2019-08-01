import React, { Component } from 'react';
import { Card } from 'antd';
import { getStorage } from '@/utils';
import { workListAll } from '@/api/login';
import './basic.less';

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    const { _id } = getStorage('user');
    workListAll({ uId: _id }).then(res => {
      console.log(res);
      this.setState({
        data: res
      });
    });
  }
  cardWorkList(data) {
    const styleB = {
      padding: '10px 20px'
    }
    return data.map((item, index) => (
      <div style={{ margin: '10px 0' }}>
        <Card key={item._id} title={item.company + ' / ' + item.position} extra={item.startTime + ' 至 ' + item.endTime} bodyStyle={styleB}>
          {
            item.workDesc.map((val, ind) => (
              <p key={val} className='account-work-p'>({ind + 1}) {val}</p>
            ))
          }
        </Card>
      </div>
    ))
  }
  render() {
    const { w_key } = this.props;
    const { data } = this.state;
    return (
      <div style={{ display: w_key === '3' ? 'block' : 'none', position: 'relative' }}>
        <p className='basic_title'>工作经历</p>
        <div >
          {this.cardWorkList(data)}
        </div>
      </div>
    )
  }
}

export default Work;
