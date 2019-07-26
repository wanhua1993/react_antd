import React, { Component } from 'react';
import { Table, Divider, Button, Select, Card, Modal } from 'antd';
import './index.less';
const { Option } = Select;
const { confirm } = Modal;
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
  showQuickJumper: { goButton: '页' },
  showTotal: showTotal
}
export default class Article extends Component {
  constructor(props) {
    super(props);
    this.handleAddArticle = this.handleAddArticle.bind(this);
    this.handleChangeEditor = this.handleChangeEditor.bind(this);
    this.state = {
      editType: '0'
    }
  }
  // 新增文章
  handleAddArticle() {
    const type = this.state.editType;
    const history = this.props.history;
    if (type === '0') {
      history.push('/edit/draft');
    } else {
      history.push('/edit/markdown');
    }
  }
  // 选择编辑器
  handleChangeEditor(value) {
    this.setState({
      editType: value
    });
  }
  componentDidMount() {
  }
  render() {
    return (
      <Card title="文章列表">
        <div className='article-edit'>
          <Select placeholder='请选择编辑器' style={{ width: 200 }} size='large' onChange={this.handleChangeEditor}>
            <Option value="0">富文本编辑器</Option>
            <Option value="1">markdown编辑器</Option>
          </Select>
          <Button type='primary' size='large' style={{ margin: '0 15px' }} onClick={this.handleAddArticle}>
            新增
          </Button>
        </div>
        <Table
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          dataSource={data}
          pagination={paginationConfig}
        />
      </Card>
    )
  }
}

