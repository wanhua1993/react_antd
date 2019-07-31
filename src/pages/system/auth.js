import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, Radio, Select } from 'antd';
import { getUserList } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import './index.less';

const { confirm } = Modal;
const { Option } = Select;
const columns = [
  { title: '菜单名', dataIndex: 'name', key: 'name' },
  { title: 'URL', dataIndex: 'path', key: 'path' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '菜单等级', dataIndex: 'level', key: 'emailevell' },
  { title: '所属父级菜单', dataIndex: 'fId', key: 'fId' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (text, record) =>
      <span>
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

function handleUpdateData() {
  // 修改
}
function handleDeleteData() {
  // 删除
  confirm({
    title: '提示',
    content: '确认要删除该权限吗？',
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
class Auth extends Component {
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
    level: 0, // 菜单等级
    data: [],
    fId: 0, // 父级菜单id
    name: '', // 菜单名称
    path: '' // 菜单路劲
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
        const data = {...values, level: this.state.level};
        console.log(data);
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
  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  handleChangePath = (e) => {
    this.setState({
      path: e.target.value
    });
  }
  handleSelectLevel = (e) => {
    this.setState({
      level: e.target.value
    });
  }
  handleSelectFather = (fId) => {
    this.setState({
      fId
    });
  }
  render() {
    const { visible, confirmLoading, name, path, level, fId } = this.state;
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
            title="新增菜单"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText='取消'
            okText='确认'
          >
            <Form layout='vertical'>
              <Form.Item label="菜单名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: name
                })(
                  <Input placeholder="请输入用户名" size='large' onChange={this.handleChangeName} />,
                )}
              </Form.Item>
              <Form.Item label="URL">
                {getFieldDecorator('path', {
                  rules: [{ required: true, message: '请输入url!' }],
                  initialValue: path
                })(
                  <Input placeholder="请输入url" size='large' onChange={this.handleChangePath} />,
                )}
              </Form.Item>
              <Form.Item label='菜单等级'>
                <Radio.Group defaultValue={0} onChange={this.handleSelectLevel} value={level}>
                  <Radio value={0}>一级菜单</Radio>
                  <Radio value={1}>二级菜单</Radio>
                  <Radio value={2}>三级菜单</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label='所属父级菜单'>
                {
                  getFieldDecorator('fId', {
                    rules: [{ required: true, message: '请选择父级菜单！' }],
                    initialValue: fId
                  })(
                    <Select style={{ width: 300 }} onChange={this.handleSelectFather}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
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
export default Auth;


