import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './login.less';


//  登录 路由组件
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  render() {
    // form 对象
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login_header'>
          后台管理系统
        </header>
        <div className='login_content'>
          <p>用户登录</p>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
// 包装 Form 组件 生成新的组件
const LoginWrapper = Form.create()(Login);

export default LoginWrapper