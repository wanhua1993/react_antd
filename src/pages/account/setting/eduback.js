import React, { Component } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker, message } from 'antd';
import { getStorage, setStorage } from '@/utils';
import { updateUser } from '@/api/login';
import moment from 'moment';
import './basic.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create()
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eduBack: [],
      type: true
    }
  }

  shouldComponentUpdate(newProps, newState) {
    const { eduBack } = newProps.e_user;
    if ((eduBack && eduBack.length) || newProps.e_key) {
      if (this.state.type) {
        this.setState({
          eduBack: eduBack ? eduBack : []
        }, () => {
          this.setState({
            type: false
          })
        });
      }
      return true
    }
    return false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = getStorage('user');
        let data = { ...user, ...values, ...this.state };
        setStorage('user', data);
        data._id = user._id;
        data.type = 4;
        delete data.loginAt;
        updateUser(data).then(res => {
          if (res.ok === 1) {
            message.success('修改成功！');
          }
        });
      }
    });
  };
  handleChangeTime(index, opts, time) {
    const { eduBack } = this.state;
    eduBack.map((item, _index) => item.time = _index === index ? time : item.time)
    this.setState({
      eduBack
    });
  }
  handleChangeInfo(index, key, e) {
    const { eduBack } = this.state;
    const { value } = e.target
    eduBack.map((item, _index) => item[key] = _index === index ? value : item[key])
    this.setState({
      eduBack
    });
  }

  remove = index => {
    const { eduBack } = this.state;
    eduBack.splice(index, 1);
    this.setState({
      eduBack
    });
  };

  add = () => {
    const { eduBack } = this.state;
    eduBack.push({
      time: [],
      school: '',
      professional: '',
      things: ''
    });
    this.setState({
      eduBack
    });
  };

  formItemFn() {
    const formItemLayout = {
      wrapperCol: {
        span: 13
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 13, offset: 0
      },
    };
    return this.state.eduBack.map((item, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '教育背景' : ''}
        required={true}
        key={index}
      >
        <RangePicker style={{ width: '70%', marginRight: 8 }} onChange={this.handleChangeTime.bind(this, index)} value={[moment(item.time[0]), moment(item.time[1])]} />
        <br />
        <Input placeholder='请输入学校' style={{ width: '70%', marginRight: 8, marginBottom: 10, marginTop: 10 }} onChange={this.handleChangeInfo.bind(this, index, 'schoole')} value={item.school} />
        <br />
        <Input placeholder='请输入专业' style={{ width: '70%', marginRight: 8, marginBottom: 10, marginTop: 10 }} onChange={this.handleChangeInfo.bind(this, index, 'professional')} value={item.professional} />
        <br />
        <Input placeholder='随便你输入什么都好' style={{ width: '70%', marginRight: 8 }} onChange={this.handleChangeInfo.bind(this, index, 'things')} value={item.things} />
        {this.state.eduBack.length > 0 ? (
          <Icon
            className="dynamic-delete-button-edu"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        ) : null}
      </Form.Item>
    ));
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 10 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 13, offset: 0
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { e_key, e_user } = this.props;
    return (
      <div style={{ display: e_key === '5' ? 'block' : 'none' }}>
        <p className='basic_title'>教育背景</p>
        <Form layout='vertical' {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item label="最高学历">
            {getFieldDecorator('record', {
              rules: [{ required: true, message: '请选择最高学历!' }],
              initialValue: e_user.record
            })(
              <Select>
                <Option value="0">高中</Option>
                <Option value="1">专科</Option>
                <Option value="2">本科</Option>
                <Option value="3">研究生</Option>
                <Option value="4">博士</Option>
              </Select>
            )}
          </Form.Item>
          {this.formItemFn()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '70%' }} size='large'>
              <Icon type="plus" /> 添加教育背景
              </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size='large' htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Resume;
