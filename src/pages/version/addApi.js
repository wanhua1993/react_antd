import React, { Component } from 'react';
import { Form, Input, Button, Icon, message, Radio, Select } from 'antd';
import { addApi, updateOneApi, getOneApi } from '@/api/version';
import { getStorage } from '@/utils';
import './index.less';
const { Option } = Select;
const { TextArea } = Input;
@Form.create()
class AddApi extends Component {
  state = {
    method: 'GET', // 请求方式
    options: [], // 参数
    _id: '',
    example: '' // 返回示例
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
    getOneApi({ _id }).then(res => {
      const value = res[0];
      this.setState({
        method: value.method,
        options: value.options,
        example: JSON.stringify(value.example)
      });
      setTimeout(() => {
        this.props.form.setFieldsValue({
          name: value.name,
          url: value.url,
        });
      }, 0);
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = { ...values, ...this.state };
        data.example = eval("(" + this.state.example + ")")
        const { _id } = getStorage('user');
        data.uId = _id;
        const app_id = this.state._id;
        if (app_id) {
          // 修改
          data._id = app_id;
          updateOneApi(data).then(res => {
            if (res && res.code === 200) {
              message.success('修改成功！');
              this.props.history.push('/version/api');
            } else {
              message.erroe('修改失败！');
            }
          });
        } else {
          // 新建
          addApi(data).then(res => {
            if (res && res.code === 200) {
              message.success('添加成功！');
              this.props.history.push('/version/api');
            } else {
              message.success('添加失败！');
            }
          });
        }
      }
    });
  };

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

  handleChangeResDesc(index, e) {
    const { resDesc } = this.state;
    const { value } = e.target;
    this.setState({
      resDesc: resDesc.map((item, _index) => _index === index ? value : item)
    });
  }
  remove = index => {
    const { options } = this.state;
    options.splice(index, 1);
    this.setState({
      options
    });
  };

  add = () => {
    const { options } = this.state;
    options.push({
      optName: '',
      optSelect: '',
      optType: '',
      optDesc: ''
    });
    this.setState({
      options
    });
  };
  handleSelectMethod(e) {
    const { value } = e.target;
    this.setState({
      method: value
    });
  }
  handleChangeOpt(index, key, e) {
    const { options } = this.state;
    const { value } = e.target
    options.map((item, _index) => item[key] = _index === index ? value : item[key])
    this.setState({
      options
    });
  }
  handleSelectOpt(index, key, value) {
    const { options } = this.state;
    options.map((item, _index) => item[key] = _index === index ? value : item[key])
    this.setState({
      options
    });
  }
  handleChangeExample(e) {
    this.setState({
      example: e.target.value
    });
  }
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
    return this.state.options.map((item, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '接口参数' : ''}
        required={true}
        key={index}
      >
        <span>
          <Input
            type="text"
            size='large'
            value={item.optName}
            onChange={this.handleChangeOpt.bind(this, index, 'optName')}
            style={{ width: '20%', margin: '5px' }}
            placeholder='请输入参数名称'
          />
          <Select
            value={item.optSelect}
            size='large'
            style={{ width: '20%', margin: '5px' }}
            onChange={this.handleSelectOpt.bind(this, index, 'optSelect')}
            placeholder='请选择是否必选'
          >
            <Option value="是">是</Option>
            <Option value="否">否</Option>
          </Select>
          <Select
            value={item.optType}
            size='large'
            style={{ width: '20%', margin: '5px' }}
            onChange={this.handleSelectOpt.bind(this, index, 'optType')}
            placeholder='请选择参数类型'
          >
            <Option value="String">String</Option>
            <Option value="Number">Number</Option>
            <Option value="Boolean">Boolean</Option>
            <Option value="Array">Array</Option>
            <Option value="Object">Object</Option>
          </Select>
          <Input
            type="text"
            size='large'
            value={item.optDesc}
            onChange={this.handleChangeOpt.bind(this, index, 'optDesc')}
            style={{ width: '20%' }}
            placeholder='请输入参数说明'
          />
        </span>
        {this.state.options.length > 0 ? (
          <Icon
            className="dynamic-delete-button-opt"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        ) : null}
      </Form.Item>
    ));
  }

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { method, fields, example } = this.state;
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
            <Form.Item label="请求方式">
              <Radio.Group defaultValue={0} onChange={this.handleSelectMethod.bind(this)} value={method}>
                <Radio value='GET'>GET</Radio>
                <Radio value='POST'>POST</Radio>
              </Radio.Group>
            </Form.Item>
            {this.formItemFn()}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }} size='large'>
                <Icon type="plus" /> 添加接口参数
              </Button>
            </Form.Item>
            <Form.Item label="返回示例" >
              <TextArea placeholder="请输入返回示例" rows={10} value={example} onChange={this.handleChangeExample.bind(this)} />
              {/* <pre className="language-bash" style={{ background: '#ddd', padding: '5px' }}>{JSON.stringify(fields, null, 1)}</pre> */}
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