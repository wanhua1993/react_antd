import React, { Component } from 'react';
import { Table, Divider, Button, Select, Card } from 'antd';
// import { Link } from 'react-router-dom';
import './index.less';
const { Option } = Select;
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

