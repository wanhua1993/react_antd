import React, { Component } from 'react';
import { Table, Divider } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (text, record) =>
      <span>
        <a href="##">查看</a>
        <Divider type="vertical" />
        <a href="##">详情</a>
        <Divider type="vertical" />
        <a href="##">删除 </a>
      </span>
    ,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
function showTotal(total) {
  return `总数 ${total} 条`;
}
const paginationConfig = {
  size: 'large', 
  total: 50, 
  showSizeChanger: true, 
  showQuickJumper: {goButton: '页'}, 
  showTotal: showTotal
}
export default class User extends Component {
  render() {
    return (
      <div className='content user-content'>
        <Table
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          dataSource={data}
          pagination={paginationConfig}
        />
      </div>
    )
  }
}

