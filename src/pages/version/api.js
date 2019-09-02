import React, { Component } from 'react';
import { Table, Divider, Button, Modal, message, } from 'antd';
import { apiList, deleteOneApi, updateOneApi } from '@/api/version';
import { paginationConfig } from '@/config/paginationConfig';
import { getStorage } from '@/utils';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageNum: 1,
      pageSize: 5
    }
  }
  columns = [
    { title: '接口名称', dataIndex: 'name', key: 'name' },
    { title: '请求地址', dataIndex: 'url', key: 'url' },
    { title: '请求方式', dataIndex: 'method', key: 'method' },
    { title: '接口状态', dataIndex: 'apiStatus', key: 'apiStatus' },
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
            type="primary"
            onClick={() => this.handleUpdateStatus(record)}
          >
            {record.status ? '停用' : '启用'}
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
    this.props.history.push('/version/addApi?_id=' + _id);
  }
  handleUpdateStatus(record) {
    const { _id, status } = record;
    let data = {
      _id,
      status: !status
    }
    let content = data.status ? '启用' : '停用';
    confirm({
      title: '提示',
      content: `确认要${content}该接口吗？`,
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        updateOneApi(data).then(res => {
          if (res.code === 200) {
            message.success(content + '成功！');
            this.load_api_list();
          } else {
            message.error(content + '失败！');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  handleDeleteData(record) {
    // 删除
    confirm({
      title: '提示',
      content: '确认要删除该接口吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        const { _id } = record;
        let data = {
          _id
        }
        deleteOneApi(data).then(res => {
          if (res.code === '200') {
            message.success('删除成功！');
            this.load_api_list();
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
    this.load_api_list();
  }
  load_api_list() {
    const { _id } = getStorage('user');
    let data = {
      uId: _id,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    apiList(data).then(res => {
      res.data.map((item, index) => {
        item.time = item.startTime + ' 至 ' + item.endTime;
        item.apiStatus = !item.status ? '已停用' : '启用中';
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
      this.load_api_list();
    });
  }
  onChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_api_list();
    });
  }
  render() {
    const { history } = this.props;
    return (
      <div className='content user-content'>
        <div className='user-content-header'>
          <Button type='primary' size='large' onClick={() => history.push('/version/addApi')}>新增</Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          expandedRowRender={record => <pre style={{ margin: 0 }}>{JSON.stringify(record.example)}</pre>}
          pagination={paginationConfig(this.state.total, this.onChange.bind(this), this.onShowSizeChange.bind(this))}
        />
      </div>
    )
  }
}
export default Api;


