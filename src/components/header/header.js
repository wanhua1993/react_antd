import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import { Icon, Menu, Dropdown, message } from 'antd';
import { SETCOLLAPSED } from '@/store/home/action-type';
import './index.less';

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1" className='header-menu-item'><Icon type="user" />个人中心</Menu.Item>
    <Menu.Item key="2" className='header-menu-item'><Icon type="setting" />个人设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" className='header-menu-item'><Icon type="poweroff" />退出登录</Menu.Item>
  </Menu>
);

@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
  state = {
    collapsed: false,
  };
  render() {
    const { setCollapsed, collapsed } = this.props;
    return (
      <div className='header'>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.setCollapse.bind(this, setCollapsed, collapsed)}
        />
        <Dropdown overlay={menu} className='header-hover' trigger={['click']}>
          <a className="ant-dropdown-link" href='void'>
            爱吃番茄柿 <Icon type="down" />
          </a>
        </Dropdown>
        <div className='header-img'>
          <img src={logo} alt="logo" />
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
// export default Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;

