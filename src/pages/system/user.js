import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input } from 'antd';
import { getUserList } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import './index.less';

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
@Form.create()
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    getUserList().then(res => {
      res.map((item, index) => {
        return item.key = index;
      })
      this.setState({
        data: res
      });
    });
  }
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='content user-content'>
        <div className='user-content-header'>
          <Button type='primary' size='large' onClick={this.showModal}>新增</Button>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={paginationConfig(this.state.data.length, onChange, onShowSizeChange)}
        />
        <div>
          <Modal
            title="新增用户"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText='取消'
            okText='确认'
          >
            <Form layout='vertical'>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input placeholder="请输入用户名" size='large' />,
                )}
              </Form.Item>
              <Form.Item label="密码">
                {
                  getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码'
                      }
                    ]
                  })(
                    <Input placeholder="请输入密码" size='large' />
                  )
                }
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}
export default User;


