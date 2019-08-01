import React, { Component } from 'react';
import { Table, Divider, Button, Modal, message, } from 'antd';
import { projectList, deleteOneProject } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getStorage } from '@/utils';
import { getDate_0 } from '@/utils/tools'
import './index.less';

const { confirm } = Modal;

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageNum: 1,
      pageSize: 5
    }
  }
  columns = [
    { title: '项目名称', dataIndex: 'title', key: 'title' },
    { title: '上线地址', dataIndex: 'onlineUrl', key: 'onlineUrl' },
    { title: '原型地址', dataIndex: 'proUrl', key: 'proUrl' },
    { title: '起止时间', dataIndex: 'time', key: 'time' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>
        <span>
          <Button
            type="primary"
            onClick={() => this.handleUpdateData(record)}
          >
            修改
            </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={() => this.handleDeleteData(record)}
          >
            删除
            </Button>
        </span>
      ,
    },
  ]
  // 修改
  handleUpdateData(record) {
    const { _id } = record;
    this.props.history.push('/account/addProject?_id=' + _id);
  }
  handleDeleteData(record) {
    // 删除
    confirm({
      title: '提示',
      content: '确认要删除该项目吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        const { _id } = record;
        let data = {
          _id
        }
        deleteOneProject(data).then(res => {
          if(res.code === '200') {
            message.success('删除成功！');
            this.load_project_list();
          } else {
            message.error('删除失败！');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  componentWillMount() {
    this.load_project_list();
  }
  load_project_list() {
    const { _id } = getStorage('user');
    let data = {
      uId: _id,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    projectList(data).then(res => {
      res.data.map((item, index) => {
        item.time = item.startTime + ' 至 ' + item.endTime;
        item.createdAt = getDate_0(item.createdAt, 'year');
        return item.key = index;
      });
      this.setState({
        data: res.data,
        total: res.total
      });
    });
  }
  onShowSizeChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_project_list();
    });
  }
  onChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_project_list();
    });
  }
  render() {
    const { history } = this.props;
    return (
      <div className='content user-content'>
        <div className='user-content-header'>
          <Button type='primary' size='large' onClick={() => history.push('/account/addProject')}>新增</Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={paginationConfig(this.state.total, this.onChange.bind(this), this.onShowSizeChange.bind(this))}
        />
      </div>
    )
  }
}
export default Project;


