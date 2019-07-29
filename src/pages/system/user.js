import React, { Component } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import { getUserList } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';

const { confirm } = Modal;
const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (text, record) =>
      <span>
        <Button
          type="primary"
          onClick={() => handleLookAt(record)}
        >
          查看
          </Button>
        <Divider type="vertical" />
        <Button
          type="primary"
          onClick={() => handleUpdateData(record)}
        >
          修改
          </Button>
        <Divider type="vertical" />
        <Button
          type="danger"
          onClick={() => handleDeleteData(record)}
        >
          删除
          </Button>
      </span>
    ,
  },
];
function handleLookAt() {
  // 查看
}
function handleUpdateData() {
  // 修改
}
function handleDeleteData() {
  // 删除
  confirm({
    title: '提示',
    content: '确认要删除该文章吗？',
    okText: '确认',
    okType: '警告',
    cancelText: '取消',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
function onChange(page, pageSize) {
  console.log(page, pageSize);
}

function onShowSizeChange(current, size) {
  console.log(current);
  console.log(size);
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    getUserList().then(res => {
      this.setState({
        data: res
      });
    });
  }
  render() {
    return (
      <div className='content user-content'>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={paginationConfig(this.state.data.length, onChange, onShowSizeChange)}
        />
      </div>
    )
  }
}
export default User;


