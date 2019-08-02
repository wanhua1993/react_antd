import React, { Component } from 'react';
import { Menu } from 'antd';
import Basic from './setting/basic';
import Resume from './setting/resume';
import Work from './setting/work';
import Project from './setting/project';
import { getOneUserInfo } from '@/api/login';
import { getStorage } from '@/utils';
import './index.less';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '1',
      user: {}
    }
  }
  componentWillMount() {
    const { _id } = getStorage('user');
    getOneUserInfo({ _id }).then(res => {
      this.setState({
        user: res[0]
      });
    });
  }
  onSelectMenu(value) {
    const { key } = value;
    this.setState({
      key
    });
  }
  render() {
    const { key, user } = this.state;
    return (
      <div className='content account-settings'>
        <div className='settings-left'>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='light'
            onSelect={this.onSelectMenu.bind(this)}
          >
            <Menu.Item key="1">基本设置</Menu.Item>
            <Menu.Item key="2">个人简历</Menu.Item>
            <Menu.Item key="3">工作经历</Menu.Item>
            <Menu.Item key="4">项目经验</Menu.Item>
          </Menu>
        </div>
        <div className='settings-right'>
          <Basic b_key={key} b_user={user}/>
          <Resume r_key={key} r_user={user}/>
          <Work w_key={key}/>
          <Project p_key={key}/>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}
