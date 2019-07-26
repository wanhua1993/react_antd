import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './index.less';

class Crumb extends Component {
  render() {
    const { pathname } = this.props.location;
    let path = pathname.substr(1);
    const crumbs = path.split('/');
    return (
      <Breadcrumb className='bread-crumb'>
        <Breadcrumb.Item className='bread-crumb-item'>
          <Link to='/home'>首页</Link>
        </Breadcrumb.Item>
        {
          crumbs.map(item => {
            return (
              <Breadcrumb.Item key={item} className='bread-crumb-item'>
                <Link to={pathname}>{item}</Link>
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    )
  }
}

export default withRouter(Crumb);