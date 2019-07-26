import React, { Component } from 'react';
import { Menu } from 'antd';
import Basic from './setting/basic';
import './index.less';

export default class Settings extends Component {
  render() {
    return (
      <div className='content account-settings'>
        <div className='settings-left'>
          <Menu
            // style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='light'
          >
            <Menu.Item key="1">
              基本设置
          </Menu.Item>
            <Menu.Item key="2">
              安全设置
          </Menu.Item>
            <Menu.Item key="3">
              账号绑定
          </Menu.Item>
            <Menu.Item key="4">
              新消息通知
          </Menu.Item>
          </Menu>
        </div>
        <div className='settings-right'>
          <Basic />
        </div>
        <div className='clear'>

        </div>
      </div>
    )
  }
}
