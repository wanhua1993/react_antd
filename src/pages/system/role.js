import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, Switch, message, Tree } from 'antd';
import { addNewAuth, authList, getFaMenu, updateOneAuth, deleteOneAuth } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;
const { TreeNode } = Tree;
const treeData = [
  {
    title: '系统管理',
    key: '/system',
    children: [
      { title: '用户管理', key: '/system/user' },
      { title: '角色管理', key: '/system/role' },
      { title: '权限管理', key: '/system/auth' }
    ],
  },
  {
    title: '版本管理',
    key: '/version',
    children: [
      { title: '版本列表', key: '/version/list' },
      { title: '版本发布', key: '/version/upload' },
      { title: 'API管理', key: '/version/api' },
    ],
  },
  {
    title: '首页',
    key: '/home',
  },
];
@Form.create()
class Role extends Component {
  state = {
    pageNum: 1,
    pageSize: 5,
    visible: false,
    confirmLoading: false,
    data: [],
    _id: '',
    total: 0,
    type: true, // true 新建 false 修改

    name: '', // 角色名称
    status: 0, // 0 禁用 1 启用

    expandedKeys: ['/system'], // 展开指定的节点树 ---- key 数组
    autoExpandParent: true, // 是否自动展开父节点
    checkedKeys: ['/system'], // （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
    selectedKeys: [], // （受控）设置选中的树节点  这是选中加了颜色的
  }
  columns = [
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '最后修改时间', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>
        <span>
          <Button
            type="primary"
            onClick={() => this.handleUpdateAuth(record)}
          >
            配置
            </Button>
          <Divider type="vertical" />
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

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
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
  // 配置权限按钮
  handleUpdateAuth(record) {
    console.log(record);
  }
  // 修改按钮
  handleUpdateData(record) {
    // 修改
    const { level, name, path, icon, fId, _id } = record;
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: true,
      type: false,
      level,
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
        console.log(record);
        deleteOneAuth({ _id: record._id }).then(res => {
          console.log(res);
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
  handleChangeStatus = (value) => {
    console.log(value)
  }
  render() {
    const { visible, confirmLoading, name, status, type } = this.state;
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
            title={type ? '新增角色' : '修改角色'}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText='取消'
            okText='确认'
          >
            <Form {...formItemLayout}>
              <Form.Item label="角色名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入角色名称!' }],
                  initialValue: name
                })(
                  <Input placeholder="请输入角色名称" size='large' onChange={this.handleChangeName} />,
                )}
              </Form.Item>
              <Form.Item label="状态">
                <Switch defaultChecked onChange={this.handleChangeStatus.bind(this)} />
              </Form.Item>
              <Form.Item label='菜单权限'>
                <Tree
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={this.state.expandedKeys}
                  autoExpandParent={this.state.autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={this.state.checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={this.state.selectedKeys}
                >
                  {this.renderTreeNodes(treeData)}
                </Tree>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}
export default Role;


