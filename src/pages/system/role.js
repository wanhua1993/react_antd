import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, Switch, message, Tree } from 'antd';
import { addNewRole, roleList, updateOneRole, deleteOneRole, getMenuTreeList } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;
const { TreeNode } = Tree;

@Form.create()
class Role extends Component {
  state = {
    pageNum: 1,
    pageSize: 5,
    visible: false,
    confirmLoading: false,
    data: [],
    tree_data: [],
    _id: '',
    total: 0,
    type: true, // true 新建 false 修改

    name: '', // 角色名称
    status: true, // false 禁用 true 启用

    expandedKeys: [], // 展开指定的节点树 ---- key 数组
    autoExpandParent: true, // 是否自动展开父节点
    checkedKeys: [], // （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
    selectedKeys: [], // （受控）设置选中的树节点  这是选中加了颜色的
  }
  columns = [
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '状态', dataIndex: 'if_status', key: 'if_status' },
    { title: '最后修改时间', dataIndex: 'updatedAt', key: 'updatedAt' },
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

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
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
    this.load_role_list();
    this.get_menu_tree();
  }
  // 加载菜单 列表
  load_role_list() {
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    roleList(data).then(res => {
      res.data.map((item, index) => {
        item.createdAt = getDate_0(item.createdAt, 'year');
        item.updatedAt = getDate_0(item.updatedAt, 'year');
        item.if_status = item.status ? '启用中' : '禁用中';
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
  // 获取 menu tree
  get_menu_tree() {
    getMenuTreeList().then(res => {
      let tree_data = this.be_tree(res);
      this.setState({
        tree_data
      });
    });
  }
  be_tree(data) {
    data.map(item => {
      item.title = item.name;
      item.key = item._id;
      if (item.children && item.children.length) {
        this.be_tree(item.children);
      }
      return true;
    });
    return data
  }

  // 修改按钮
  handleUpdateData(record) {
    // 修改
    const { status, name, checkedKeys, _id } = record;
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: true,
      type: false,
      status,
      checkedKeys,
      _id
    });

    setFieldsValue({
      name,
    });
  }
  // 删除 按钮 
  handleDeleteData(record) {
    // 删除
    confirm({
      title: '提示',
      content: '确认要删除该角色吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        deleteOneRole({ _id: record._id }).then(res => {
          if (res.ok === 1) {
            message.success('删除成功');
            this.load_role_list();
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
      this.load_role_list();
    });
  }

  onShowSizeChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_role_list();
    });
  }
  // 新建菜单 确认按钮
  handleOk = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    const { status, checkedKeys } = this.state;
    validateFields((err, values) => {
      if (!err) {
        const data = { ...values, status, checkedKeys };

        const { type } = this.state;
        if (type) {
          this.newAddRole(data);
        } else {
          this.updateRole(data);
        }
      }
    });
  };
  newAddRole(data) {
    const { setFieldsValue } = this.props.form;
    addNewRole(data).then(res => {
      if (res.code === 200) {
        message.success('新建角色成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            status: true,
            checkedKeys: []
          });
          this.load_role_list();
          setFieldsValue({
            name: '',
          });
        }, 2000);
      } else {
        message.error('新建角色失败');
      }
    });
  }
  updateRole(data) {
    const { setFieldsValue } = this.props.form;
    data._id = this.state._id;
    updateOneRole(data).then(res => {
      if (res.code === 200) {
        message.success('修改角色成功');
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            status: true,
            checkedKeys: []
          });
          this.load_role_list();
          setFieldsValue({
            name: '',
          });
        }, 2000);
      } else {
        message.error('修改角色失败');
      }
    });
  }
  handleCancel = () => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      visible: false,
      confirmLoading: false,
      status: true,
      checkedKeys: []
    });
    setFieldsValue({
      name: '',
    });
  };
  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  handleChangeStatus = (status) => {
    this.setState({
      status
    })
  }
  render() {
    const { visible, confirmLoading, name, status, type, tree_data } = this.state;
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
                <Switch checked={status} onChange={this.handleChangeStatus.bind(this)}/>
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
                  {this.renderTreeNodes(tree_data)}
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


