import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import '../index.less';
import LeftNav from '../../components/left-nav/left-nav'; // 左边栏 
import Header from '../../components/header/header'; // 头部
import Crumb from '../../components/breadCrumb/breadCrumb'; // 面包屑
import Home from '../home/home'; // 首页
import Center from '../account/center'; // 个人中心
import Settings from '../account/settings'; // 个人设置
import User from '../system/user'; // 用户管理
import Role from '../system/role'; // 角色管理
import Auth from '../system/auth'; // 权限管理
import Article from '../project/article'; // 文章管理
import Project from '../project/project'; // 项目管理
import Draft from '../editor/draft'; // 富文本编辑器
import Markdown from '../editor/markdown'; // markdown 编辑器
import Cloud from '../version/cloud'; // 历史版本
import Export from '../version/export'; // 版本发布
import ArticleEdit from '../project/articleEdit'; // 

const { Content, Sider } = Layout;


// 后台管理路由组件
class Admin extends Component {

  render() {
    const { collapsed } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Sider collapsible collapsed={collapsed} width={260}>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ background: '#f0f0f0', padding: '0 10px'}}>
            <Crumb />
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/account/center' component={Center}></Route>
              <Route path='/account/settings' component={Settings}></Route>
              <Route path='/system/user' component={User}></Route>
              <Route path='/system/role' component={Role}></Route>
              <Route path='/system/auth' component={Auth}></Route>
              <Route path='/project/articleList' component={Article}></Route>
              <Route path='/project/articleEdit' component={ArticleEdit}></Route>
              <Route path='/project/projectList' component={Project}></Route>
              <Route path='/edit/draft' component={Draft}></Route>
              <Route path='/edit/markdown' component={Markdown}></Route>
              <Route path='/version/cloud' component={Cloud}></Route>
              <Route path='/version/export' component={Export}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          {/* <Footer style={{ textAlign: 'center', color: '#999'}}>爱吃番茄柿  后台管理系统 @2019/7/23</Footer> */}
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    collapsed: state.collapsed
  }
}
export default Admin = connect(mapStateToProps)(Admin);