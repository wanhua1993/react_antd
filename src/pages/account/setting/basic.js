import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { fetchProvince } from '@/api/geographic';
import './basic.less';
const { TextArea } = Input;
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    console.log(info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className='avatar'>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload {...props}>
        <Button icon="upload" className='button_view'>更换头像</Button>
    </Upload>
  </Fragment>
);
class Basic extends Component {

  componentDidMount() {
    fetchProvince().then(res => {
      console.log(res);
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 8 },
    };

    return (
      <div>
        <p className='basic_title'>基础设置</p>
        <Form layout='vertical' {...formItemLayout} style={{ position: 'relative' }}>
          <Form.Item label="邮箱">
            <Input placeholder="请输入邮箱" size='large' />
          </Form.Item>
          <Form.Item label="昵称">
            <Input placeholder="请输入昵称" size='large' />
          </Form.Item>
          <Form.Item label='个人简介'>
            <TextArea
              placeholder="个人简介"
              autosize={{ minRows: 5, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label='联系电话'>
            <Input placeholder="请输入手机号" size='large' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size='large'>提交</Button>
          </Form.Item>
          <Form.Item label='头像' className='avatar-item'>
            <AvatarView avatar={this.getAvatarURL()} />
          </Form.Item>
        </Form>
      </div>
    )
  }
  handleChange() {
    console.log(11111);
  }
  getAvatarURL() {
    // const { currentUser } = this.props;
    // if (currentUser.avatar) {
    //   return currentUser.avatar;
    // }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }
}

export default Basic;
