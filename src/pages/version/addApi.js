import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { addProject, getOneProject, updateOneProject } from '@/api/login';
import { getStorage } from '@/utils';

const { TextArea } = Input;
@Form.create()
class AddApi extends Component {
  state = {
    type: [], // 项目类型
    onlineUrl: '', // 上线地址
    proUrl: '', // 原型地址
    startTime: new Date(), // 开始时间
    endTime: new Date(), // 结束时间
    resDesc: [],
    imageUrl: '',
    _id: ''
  }

  componentDidMount() {
    const _id = this.props.location.search.split('_id=')[1];
    if (_id) {
      this.setState({
        _id
      });
      this.getProject(_id);
    }
  }

  getProject(_id) {
    getOneProject({ _id }).then(res => {
      const value = res[0];
      this.setState({
        type: value.type,
        onlineUrl: value.onlineUrl,
        proUrl: value.proUrl,
        startTime: value.startTime,
        endTime: value.endTime,
        resDesc: value.resDesc,
        imageUrl: value.imageUrl
      });
      setTimeout(() => {
        this.props.form.setFieldsValue({
          title: value.title,
          proDesc: value.proDesc,
        });
      }, 0)
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = { ...values, ...this.state };
        const { _id } = getStorage('user');
        data.uId = _id;
        const p_id = this.state._id;
        if (p_id) {
          // 修改
          data._id = p_id;
          updateOneProject(data).then(res => {
            if (res.code === '200') {
              message.success('修改成功！');
              this.props.history.push('/account/project');
            } else {
              message.erroe('修改失败！');
            }
          });
        } else {
          // 新建
          addProject(data).then(res => {
            if (res.code === '200') {
              message.success('添加成功！');
              this.props.history.push('/account/project');
            } else {
              message.success('添加失败！');
            }
          });
        }
      }
    });
  };

  handleSelectType(type) {
    if(!type.includes(1)) {
      this.setState({
        onlineUrl: ''
      });
    }
    if(!type.includes(2)) {
      this.setState({
        proUrl: ''
      });
    }
    // 选择 类型
    this.setState({
      type
    });
  }
  handleChangeTime(opts, time) {
    this.setState({
      startTime: time[0],
      endTime: time[1]
    });
  }
  handleChangeName(e) {
    this.setState({
      title: e.target.value
    });
  }
  handleChangeUrl(e) {
    this.setState({
      proDesc: e.target.value
    });
  }
  handleChangeOnlineUrl(e) {
    this.setState({
      onlineUrl: e.target.value
    });
  }
  handleChangeProUrl(e) {
    this.setState({
      proUrl: e.target.value
    });
  }
  handleChangeResDesc(index, e) {
    const { resDesc } = this.state;
    const { value } = e.target;
    this.setState({
      resDesc: resDesc.map((item, _index) => _index === index ? value : item)
    });
  }
  remove = index => {
    const { resDesc } = this.state;
    resDesc.splice(index, 1);
    this.setState({
      resDesc
    });
  };

  add = () => {
    const { resDesc } = this.state;
    resDesc.push('');
    this.setState({
      resDesc
    });
  };
  formItemFn() {
    const formItemLayout = {
      wrapperCol: {
        span: 15
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 15, offset: 7
      },
    };
    return this.state.resDesc.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '接口参数' : ''}
        required={true}
        key={index}
      >
        <TextArea placeholder="请输入责任描述" style={{ width: '60%', marginRight: 8 }} rows={2} value={k} onChange={this.handleChangeResDesc.bind(this, index)} />
        {this.state.resDesc.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        ) : null}
      </Form.Item>
    ));
  }
  handleChangeAvatar(imageUrl) {
    this.setState({
      imageUrl
    });
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    // const { type, proUrl, onlineUrl, startTime, endTime } = this.state;
    const { name, url } = getFieldsValue();
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 15, offset: 7
      },
    };
    return (
      <div className='content' >
        <div style={{ padding: '20px 0' }}>
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 9 }} onSubmit={this.handleSubmit}>
            <Form.Item label="接口名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入接口名称!' }],
                initialValue: name
              })(<Input size='large' onChange={this.handleChangeName.bind(this)} />)}
            </Form.Item>
            <Form.Item label="接口地址">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入接口地址!' }],
                initialValue: url
              })(
                <Input size='large' onChange={this.handleChangeUrl.bind(this)} />
              )}
            </Form.Item>
            {this.formItemFn()}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }} size='large'>
                <Icon type="plus" /> 添加接口参数
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
              <Button type="primary" htmlType="submit" size='large'>提交</Button>
              <Button type="text" style={{ margin: '0 20px' }} size='large' onClick={() => {
                this.props.history.go(-1)
              }}>返回</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddApi;