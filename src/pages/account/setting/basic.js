import React, { Component } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { getCookie } from '@/utils';
import './basic.less';
const { TextArea } = Input;

@Form.create()
class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      desc: ''
    }
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }
  componentDidMount() {

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = { ...values, ...this.state }
        console.log(data);
      }
    });
  };
  handleChangeDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }
  uploadAvatar(info) {
    let res = info.fileList[0].response;
    if (res) {
      if (res.code === '200') {
        let avatar = res.url;
        this.setState({
          avatar
        });
      }
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 8 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <p className='basic_title'>基础设置</p>
        <Form layout='vertical' {...formItemLayout} style={{ position: 'relative' }} onSubmit={this.handleSubmit}>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <Input placeholder="请输入邮箱" size='large' />,
            )}
          </Form.Item>
          <Form.Item label="昵称">
            {
              getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入昵称'
                  }
                ]
              })(
                <Input placeholder="请输入昵称" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label='个人简介'>
            <TextArea
              placeholder="个人简介"
              autosize={{ minRows: 5, maxRows: 6 }}
              value={this.state.desc}
              onChange={this.handleChangeDesc.bind(this)}
            />
          </Form.Item>
          <Form.Item label='联系电话'>
            {
              getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话'
                  }
                ]
              })(
                <Input placeholder="请输入手机号" size='large' />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" size='large' htmlType="submit">提交</Button>
          </Form.Item>
          <Form.Item label='头像' className='avatar-item'>
            <div className='avatar'>
              <img src={this.state.avatar} alt="avatar" />
            </div>
            <Upload
              name='file'
              action={'http://localhost:8000/users/upload_avatar'}
              headers={
                { token: getCookie('token') }
              }
              onChange={this.uploadAvatar}
            >
              <Button icon="upload" className='button_view'>更换头像</Button>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Basic;
