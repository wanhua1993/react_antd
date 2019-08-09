import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { loginIn, getMenuTreeList } from '@/api/login';
import { connect } from 'react-redux';
import { SETTOKEN, SETUSER } from '@/store/home/action-type';
import { setCookie, setStorage } from '@/utils';
import './login.less';

//  登录 路由组件
function mapStateToProps(state) {
  return {
    collapsed: state.default.collapsed
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // 设置token
    setToken: (token) => dispatch({
      type: SETTOKEN,
      token
    }),
    setUser: (user) => dispatch({
      type: SETUSER,
      user
    })
  }
}
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginIn(values).then(res => {
          let { code, token, value } = res;
          if (code === '200') {
            this.props.setToken(token); // 设置 token
            this.props.setUser(value); // 存储 user 信息到 store 中
            setCookie('token', token);
            setStorage('user', value);
            // 登录以后获取 菜单 根据权限来
            let { checkedKeys } = value.role_id;
            getMenuTreeList({ checkedKeys }).then(res => {
              let menus = this.be_tree(res);
              setStorage('menus', menus);
              this.props.history.push('/home');
            });
          }
        })
      }
    });
  };
  be_tree(data) {
    data.map(item => {
      item.title = item.name;
      item.key = item.path;
      if (item.children && item.children.length) {
        this.be_tree(item.children);
      }
      return true;
    });
    return data
  }
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
export default Login