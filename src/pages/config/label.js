import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Form, Input, Radio, Select, message } from 'antd';
import { addNewAuth, authList, getFaMenu, updateOneAuth, deleteOneAuth } from '@/api/login';
import { paginationConfig } from '@/config/paginationConfig';
import { getDate_0 } from '@/utils/tools';
import './index.less';

const { confirm } = Modal;
const { Option } = Select;

@Form.create()
class Label extends Component {
  state = {
    pageNum: 1,
    pageSize: 5,
    visible: false,
    confirmLoading: false,
    level: 0, // 菜单等级
    data: [],
    _id: '',

    fa_data: [], // 父级 标签 list
    total: 0,
    type: true, // true 新建 false 修改
    fId: 0, // 父级 标签id
    name: '', // 标签 名称
  }
  columns = [
    { title: '标签名', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '标签等级', dataIndex: 'level', key: 'level' },
    { title: '所属父级标签', dataIndex: 'fa_label', key: 'fa_label' },
    { title: '标签状态', dataIndex: 'labelStatus', key: 'labelStatus' },
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
            type="primary"
            onClick={() => this.handleUpdateData(record)}
          >
            启用
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
    this.load_label_list();
  }
  // 加载菜单 列表
  load_label_list() {
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
      content: '确认要删除该标签吗？',
      okText: '确认',
      okType: '警告',
      cancelText: '取消',
      onOk: () => {
        deleteOneAuth({ _id: record._id }).then(res => {
          if (res.ok === 1) {
            message.success('删除成功');
            this.load_label_list();
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
      this.load_label_list();
    });
  }

  onShowSizeChange(pageNum, pageSize) {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.load_label_list();
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
        console.log(data);
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
        message.success('新建标签成功');
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
          this.load_label_list();
          setFieldsValue({
            name: '',
            path: '',
            fId: 0,
            icon: ''
          });
        }, 2000);
      } else {
        message.error('新建标签失败');
      }
    });
  }
  updateAuth(data) {
    const { setFieldsValue } = this.props.form;
    data._id = this.state._id;
    updateOneAuth(data).then(res => {
      if (res.code === 200) {
        message.success('修改标签成功');
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
          this.load_label_list();
          setFieldsValue({
            name: '',
            path: '',
            fId: 0,
            icon: ''
          });
        }, 2000);
      } else {
        message.error('修改标签失败');
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
    const { visible, confirmLoading, name, level, fId, type } = this.state;
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
            title={type ? '新增标签' : '修改标签'}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText='取消'
            okText='确认'
          >
            <Form layout='vertical'>
              <Form.Item label="标签名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入标签名称!' }],
                  initialValue: name
                })(
                  <Input placeholder="请输入标签名称" size='large' onChange={this.handleChangeName} />,
                )}
              </Form.Item>
              <Form.Item label='标签等级'>
                <Radio.Group defaultValue={0} onChange={this.handleSelectLevel} value={level}>
                  <Radio value={0}>一级标签</Radio>
                  <Radio value={1}>二级标签</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label='所属父级标签' style={{ display: level ? 'block' : 'none' }}>
                {
                  getFieldDecorator('fId', {
                    rules: [{ required: true, message: '请选择父级标签！' }],
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
export default Label;


