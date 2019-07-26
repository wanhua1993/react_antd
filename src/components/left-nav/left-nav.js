import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig';
import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;

@connect(mapStateToProps)
class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes_map(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  getMenuNodes = (menuList) => {
    const { pathname } = this.props.location;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ));
      } else {
        const cItem = item.children.find(cItem => cItem.key === pathname);
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(<SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {
            this.getMenuNodes(item.children)
          }
        </SubMenu>);
      }
      return pre;
    }, [])
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  if_collapse(collapsed) {
    if (!collapsed) {
      return (
        <h1>爱吃番茄柿</h1>
      )
    } else {
      return (
        ''
      )
    }

  }
  render() {
    // 得到当前请求的路由路径
    const { pathname } = this.props.location;
    const openkey = this.openKey;
    const { collapsed } = this.props;
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="logo" className='logo' />
          {
            this.if_collapse(collapsed)
          }
        </Link>
        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={[openkey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    collapsed: state.default.collapsed
  }
}
// 包装非路由组件 返回一个新的组件 history location match
// export default withRouter(LeftNav);
// export default LeftNav = connect(mapStateToProps)(withRouter(LeftNav));
export default withRouter(LeftNav);