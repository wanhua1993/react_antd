import React, { Component } from 'react';
import { connect } from 'react-redux';
import Crumb from '@/components/breadCrumb/breadCrumb'; // 面包屑
import { Icon, Menu, Dropdown } from 'antd';
import { SETCOLLAPSED } from '@/store/home/action-type';
import { getStorage } from '@/utils';
import { withRouter } from 'react-router-dom'
import './index.less';

@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
  state = {
    collapsed: false,
    user: {}
  };
  componentWillMount() {
    const user = getStorage('user');
    this.setState({
      user
    });
  }
  onClick = ({ key }) => {
    const { history } = this.props;
    if (key === '1') {
      history.push('/account/center');
    }
    if (key === '2') {
      history.push('/account/settings');
    }
    if (key === '3') {
      history.push('/login');
      // 需要将 token storage 中数据清除
    }
  }
  menuList() {
    return (
      <Menu onClick={this.onClick.bind(this)}>
        <Menu.Item key="1" className='header-menu-item'><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item key="2" className='header-menu-item'><Icon type="setting" />个人设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" className='header-menu-item'><Icon type="poweroff" />退出登录</Menu.Item>
      </Menu>
    );
  }
  render() {
    const { setCollapsed, collapsed } = this.props;
    const { user } = this.state;
    return (
      <div className='header'>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.setCollapse.bind(this, setCollapsed, collapsed)}
        />
        <Crumb></Crumb>
        <Dropdown overlay={this.menuList()} className='header-hover' trigger={['click']}>
          <a className="ant-dropdown-link" href='void'>
            {user.username} <Icon type="down" />
          </a>
        </Dropdown>
        <div className='header-img'>
          <img src={user.avatar} alt="logo" />
        </div>
      </div>
    )
  }
  setCollapse(setCollapsed, collapsed) {
    setCollapsed(collapsed);
  }
}
function mapStateToProps(state) {
  return {
    collapsed: state.default.collapsed
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setCollapsed: (collapsed) => dispatch({
      type: SETCOLLAPSED,
      collapsed
    }),
  }
}
export default withRouter(Header);

