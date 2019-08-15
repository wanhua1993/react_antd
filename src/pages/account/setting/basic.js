import React, { Component } from 'react';
import { Form, Input, Button, Upload, message, Radio } from 'antd';
import { getCookie } from '@/utils';
import { updateUser } from '@/api/login';
import url from '@/config/basicApi';
import { getStorage, setStorage } from '@/utils';
import './basic.less';

const api = url.api;

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
  componentWillMount() {
    const { avatar } = getStorage('user');
    if (avatar) {
      this.setState({
        avatar
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = getStorage('user');
        let data = { ...user, ...values, ...this.state };
        setStorage('user', data);
        data._id = user._id;
        data.type = 1;
        delete data.loginAt;
        updateUser(data).then(res => {
          if (res.ok === 1) {
            message.success('修改成功！');
          }
        });
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
    let { avatar } = this.state;
    const { b_key, b_user } = this.props;
    return (
      <div style={{ display: b_key === '1' ? 'block' : 'none' }}>
        <p className='basic_title'>基础设置</p>
        <Form layout='vertical' {...formItemLayout} style={{ position: 'relative' }} onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item label="昵称">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入昵称' }],
                initialValue: b_user.name
              })(
                <Input placeholder="请输入昵称" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label="性别">
            {
              getFieldDecorator('sex', {
                rules: [{ required: true, message: '请选择性别' }],
                initialValue: b_user.sex ? b_user.sex : 0
              })(
                <Radio.Group name="sex">
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
              initialValue: b_user.email
            })(
              <Input placeholder="请输入邮箱" size='large' />,
            )}
          </Form.Item>
          <Form.Item label='联系电话'>
            {
              getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入联系电话' }],
                initialValue: b_user.phone
              })(
                <Input placeholder="请输入手机号" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label='居住地址'>
            {
              getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入居住地址' }],
                initialValue: b_user.address
              })(
                <Input placeholder="请输入居住地址" size='large' />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" size='large' htmlType="submit">提交</Button>
          </Form.Item>
          <Form.Item label='头像' className='avatar-item'>
            <div className='avatar'>
              <img src={avatar} alt="avatar" style={{ borderRadius: '50%' }} />
            </div>
            <Upload
              name='file'
              action={api + '/users/upload_avatar'}
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
