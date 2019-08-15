import React, { Component } from 'react';
import { Form, Input, Button, Icon, message, Select, DatePicker } from 'antd';
import { getStorage, setStorage } from '@/utils';
import { updateUser } from '@/api/login';
import './basic.less';

const { TextArea } = Input;
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
    if (eduBack.length || newProps.e_key) {
      if (this.state.type) {
        this.setState({
          eduBack,
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
        console.log(this.values);
        const user = getStorage('user');
        let data = { ...user, ...values, ...this.state };
        setStorage('user', data);
        data._id = user._id;
        data.type = 2;
        delete data.loginAt;
        // updateUser(data).then(res => {
        //   if (res.ok === 1) {
        //     message.success('修改成功！');
        //   }
        // });
      }
    });
  };
  handleChangeTime(index, e) {
    const { eduBack } = this.state;
    const { value } = e.target;
    this.setState({
      eduBack: eduBack.map((item, _index) => _index === index ? value : item)
    });
  }
  handleChangeSchool() {

  }
  handleChnageThings() {
    
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
    return this.state.eduBack.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '教育背景' : ''}
        required={true}
        key={index}
      >
        <RangePicker style={{ width: '70%', marginRight: 8 }} onChange={this.handleChangeTime.bind(this, index)}/>
        <br />
        <Input placeholder='请输入学校' style={{ width: '70%', marginRight: 8, marginBottom: 10, marginTop: 10 }} onChange={this.handleChangeSchool.bind(this, index)}/>
        <br />
        <Input placeholder='随便你输入什么都好' style={{ width: '70%', marginRight: 8 }} onChange={this.handleChnageThings.bind(this, index)}/>
        {this.state.evaluation.length > 0 ? (
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
