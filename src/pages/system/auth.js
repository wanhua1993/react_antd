import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, Radio, Select, message } from 'antd';
import { addNewAuth, authList, getFaMenu, updateOneAuth, deleteOneAuth } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;
const { Option } = Select;

@Form.create()
class Auth extends Component {

  state = {
    pageNum: 1,
    pageSize: 5,
    visible: false,
    confirmLoading: false,
    level: 0, // 菜单等级
    data: [],
    _id: '',
    fa_data: [], // 父集菜单list
    total: 0,
    type: true, // true 新建 false 修改
    icon: '',  // 菜单图标
    fId: 0, // 父级菜单id
    name: '', // 菜单名称
    path: '' // 菜单路劲
  }
  columns = [
    { title: '菜单名', dataIndex: 'name', key: 'name' },
    { title: 'URL', dataIndex: 'path', key: 'path' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '菜单等级', dataIndex: 'level', key: 'level' },
    { title: '所属父级菜单', dataIndex: 'fa_menu', key: 'fa_menu' },
    { title: '图标', dataIndex: 'icon', key: 'icon' },
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
    this.load_auth_list();
  }
  // 加载菜单 列表
  load_auth_list() {
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    authList(data).then(res => {
      res.data.map((item, index) => {
        item.createdAt = getDate_0(item.createdAt, 'year');
        item.fa_menu = item.f_id !== '0' ? item.fId.name : '';
        return item.key = index;
      })
      this.setState({
        data: res.data,
        total: res.total
      });
    });
  }
  // 加载父集菜单
  load_fu_list() {
    const { level } = this.state;
    getFaMenu({ level }).then(res => {
      this.setState({
        fa_data: res
      });
    });
  }
  // 显示 modal
  showModal = () => {
    this.load_fu_list();
    this.setState({
      visible: true,
      type: true
    });
  };
  // 修改按钮
  handleUpdateData(record) {
    // 修改
    const { level, name, path, icon, fId, _id } = record;
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: true,
      type: false,
      level,
      fId: fId ? fId._id : 0,
      _id
    });

    setFieldsValue({
      name,
      path,
      fId: fId ? fId._id : 0,
      icon
    });
    this.load_fu_list();
  }
  // 删除 按钮 
  handleDeleteData(record) {
    // 删除
    confirm({
      title: '提示',
      content: '确认要删除该权限吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        deleteOneAuth({ _id: record._id }).then(res => {
          if (res.ok === 1) {
            message.success('删除成功');
            this.load_auth_list();
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
      this.load_auth_list();
    });
  }

  onShowSizeChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_auth_list();
    });
  }
  // 新建菜单 确认按钮
  handleOk = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const data = { ...values, level: this.state.level };
        data.f_id = this.state.fId;
        const { type } = this.state;
        if (type) {
          this.newAddAuth(data);
        } else {
          this.updateAuth(data);
        }
      }
    });
  };
  newAddAuth(data) {
    const { setFieldsValue } = this.props.form;
    addNewAuth(data).then(res => {
      if (res.code === 200) {
        message.success('新建菜单成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            level: 0,
            fId: 0
          });
          this.load_auth_list();
          setFieldsValue({
            name: '',
            path: '',
            fId: 0,
            icon: ''
          });
        }, 2000);
      } else {
        message.error('新建菜单失败');
      }
    });
  }
  updateAuth(data) {
    const { setFieldsValue } = this.props.form;
    data._id = this.state._id;
    updateOneAuth(data).then(res => {
      if (res.code === 200) {
        message.success('修改菜单成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            level: 0,
            fId: 0
          });
          this.load_auth_list();
          setFieldsValue({
            name: '',
            path: '',
            fId: 0,
            icon: ''
          });
        }, 2000);
      } else {
        message.error('修改菜单失败');
      }
    });
  }
  // 新建菜单 取消按钮
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
  handleChangeIcon = (e) => {
    this.setState({
      icon: e.target.value
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
  fa_items() {
    const { fa_data } = this.state;
    return (
      <Select style={{ width: 300 }} onChange={this.handleSelectFather.bind(this)}>
        {
          fa_data.map(item => {
            return <Option value={item._id} key={item._id}>{item.name}</Option>
          })
        }
      </Select>
    )
  }
  render() {
    const { visible, confirmLoading, name, path, level, fId, icon, type } = this.state;
    const { getFieldDecorator } = this.props.form;
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
            title={type ? '新增菜单' : '修改菜单'}
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
                  rules: [{ required: true, message: '请输入菜单名称!' }],
                  initialValue: name
                })(
                  <Input placeholder="请输入菜单名称" size='large' onChange={this.handleChangeName} />,
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
              <Form.Item label="图标">
                {getFieldDecorator('icon', {
                  rules: [{ required: true, message: '请输入icon!' }],
                  initialValue: icon
                })(
                  <Input placeholder="请输入icon" size='large' onChange={this.handleChangeIcon} />,
                )}
              </Form.Item>
              <Form.Item label='菜单等级'>
                <Radio.Group defaultValue={0} onChange={this.handleSelectLevel} value={level}>
                  <Radio value={0}>一级菜单</Radio>
                  <Radio value={1}>二级菜单</Radio>
                  <Radio value={2}>三级菜单</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label='所属父级菜单' style={{ display: level ? 'block' : 'none' }}>
                {
                  getFieldDecorator('fId', {
                    rules: [{ required: true, message: '请选择父级菜单！' }],
                    initialValue: fId
                  })(
                    this.fa_items()
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


