import React, { Component } from 'react'
import { Card, Modal, Descriptions } from 'antd';
import { projectListAll } from '@/api/login';
import { getStorage } from '@/utils';
const { Meta } = Card;
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      oneVal: {}
    }
  }
  componentWillMount() {
    const { _id } = getStorage('user');
    projectListAll({ uId: _id }).then(res => {
      this.setState({
        data: res,
        visible: false,
      });
    });
  }
  projectList() {
    const { data } = this.state;
    const gridStyle = {
      width: '30%',
      textAlign: 'center',
      margin: '1.5%',
      cursor: 'pointer'
    };
    return data.map((item, index) => (
      <Card.Grid style={gridStyle} key={item._id} onClick={this.showModal.bind(this, item)}>
        <Card
          cover={
            <img
              alt="example"
              src={item.imageUrl ? item.imageUrl : 'http://img.2019w.cn/away1.jpg'}
            />
          }
        >
          <Meta
            title={item.title}
            description={item.proDesc}
          />
        </Card>
      </Card.Grid>
    ));
  }

  showModal = (value) => {
    this.setState({
      visible: true,
      oneVal: value
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  descItems(data) {
    let { proDesc, onlineUrl, proUrl, startTime, endTime, resDesc, imageUrl } = data;
    imageUrl = imageUrl ? imageUrl : 'http://img.2019w.cn/away1.jpg';
    return <Descriptions column={1}>
      <Descriptions.Item label="上线地址">{onlineUrl}</Descriptions.Item>
      <Descriptions.Item label="原型地址">{proUrl}</Descriptions.Item>
      <Descriptions.Item label="起止时间">{startTime + ' 至 ' + endTime}</Descriptions.Item>
      <Descriptions.Item label="简介">{proDesc}</Descriptions.Item>
      <Descriptions.Item label="背景图片"><img src={imageUrl} alt="背景图片" width='250' height='250' /></Descriptions.Item>
      {
        resDesc.map((item, index) => (
          <Descriptions.Item label={index + 1} key={item}>{item}</Descriptions.Item>
        ))
      }
    </Descriptions>


  }
  render() {
    const { p_key } = this.props;
    const { visible, confirmLoading, oneVal } = this.state
    const { title } = oneVal;
    return (
      <div style={{ display: p_key === '4' ? 'block' : 'none' }}>
        {
          this.projectList()
        }
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width={400}
        >
          {title ? this.descItems(oneVal) : null}
        </Modal>
      </div>
    )
  }
}


