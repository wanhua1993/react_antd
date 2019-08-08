import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, message, Select } from 'antd';
import { addNewUser, userList, updateOneUser, deleteOneUser, roleListAll } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;
const { Option } = Select;

@Form.create()
class User extends Component {
  state = {
    pageNum: 1,
    pageSize: 5,
    visible: false,
    confirmLoading: false,
    data: [],
    roleList: [],
    _id: '',
    total: 0,
    type: true, // true 新建 false 修改

    username: '', // 用户名
    password: '', // 密码
    role_id: '', // 角色 id
  }
  columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '所属角色', dataIndex: 'role', key: 'key' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
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
  componentWillMount() {
    this.load_user_list();
    this.roleList();
  }
  roleList() {
    roleListAll({ status: true }).then(res => {
      this.setState({
        roleList: res
      });
    });
  }
  // 加载菜单 列表
  load_user_list() {
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    userList(data).then(res => {
      res.data.map((item, index) => {
        item.createdAt = getDate_0(item.createdAt, 'year');
        if (item.role_id) {
          item.role = item.role_id.name;
        }
        return item.key = index;
      })
      this.setState({
        data: res.data,
        total: res.total
      });
    });
  }
  // 显示 modal
  showModal = () => {
    this.setState({
      visible: true,
      type: true
    });
  };

  // 修改按钮
  handleUpdateData(record) {
    // 修改
    const { password, username, _id, role_id } = record;
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: true,
      type: false,
      _id
    });

    setFieldsValue({
      username,
      password,
      role_id: role_id ? role_id._id : ''
    });
  }
  // 删除 按钮 
  handleDeleteData(record) {
    // 删除
    confirm({
      title: '提示',
      content: '确认要删除该用户吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        deleteOneUser({ _id: record._id }).then(res => {
          if (res.ok === 1) {
            message.success('删除成功');
            this.load_user_list();
          } else {
            message.error('删除失败');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_user_list();
    });
  }

  onShowSizeChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_user_list();
    });
  }
  // 新建菜单 确认按钮
  handleOk = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const data = { ...values };

        const { type } = this.state;
        if (type) {
          this.newAddUser(data);
        } else {
          this.updateUser(data);
        }
      }
    });
  };
  newAddUser(data) {
    const { setFieldsValue } = this.props.form;
    addNewUser(data).then(res => {
      if (res.code === 200) {
        message.success('新建用户成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.load_user_list();
          setFieldsValue({
            username: '',
            password: '',
            role_id: ''
          });
        }, 2000);
      } else {
        message.error('新建用户失败');
      }
    });
  }
  updateUser(data) {
    const { setFieldsValue } = this.props.form;
    data._id = this.state._id;
    data.type = 3;
    updateOneUser(data).then(res => {
      if (res.code === 200) {
        message.success('修改用户成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.load_user_list();
          setFieldsValue({
            username: '',
            password: '',
            role_id: ''
          });
        }, 2000);
      } else {
        message.error('修改用户失败');
      }
    });
  }
  handleCancel = () => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: false,
      confirmLoading: false,
    });
    setFieldsValue({
      username: '',
      password: '',
      role_id: ''
    });
  };
  handleChangeName = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleSelectRole(role_id) {
    this.setState({
      role_id
    });
  }
  role_items() {
    const { roleList } = this.state;
    return (
      <Select onChange={this.handleSelectRole.bind(this)} size='large'>
        {
          roleList.map(item => {
            return <Option value={item._id} key={item._id}>{item.name}</Option>
          })
        }
      </Select>
    )
  }
  render() {
    const { visible, confirmLoading, username, password, type, role_id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className='content user-content'>
        <div className='user-content-header'>
          <Button type='primary' size='large' onClick={this.showModal}>新增</Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={paginationConfig(this.state.total, this.onChange.bind(this), this.onShowSizeChange.bind(this))}
        />
        <div>
          <Modal
            title={type ? '新增用户' : '修改用户'}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText='取消'
            okText='确认'
          >
            <Form {...formItemLayout}>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: username
                })(
                  <Input placeholder="请输入用户名" size='large' onChange={this.handleChangeName} />,
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                  initialValue: password
                })(
                  <Input.Password placeholder="请输入密码" size='large' onChange={this.handleChangePassword} />,
                )}
              </Form.Item>
              <Form.Item label="分配角色">
                {
                  getFieldDecorator('role_id', {
                    rules: [{ required: true, message: '请选择角色！' }],
                    initialValue: role_id
                  })(
                    this.role_items()
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


