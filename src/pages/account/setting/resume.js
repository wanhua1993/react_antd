import React, { Component } from 'react';
import { Form, Input, Button, Icon, message, Select } from 'antd';
import { getStorage, setStorage } from '@/utils';
import { updateUser } from '@/api/login';
import './basic.less';

const { TextArea } = Input;
const { Option } = Select;
@Form.create()
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation: [],
      skills: [],
      type: true
    }
  }

  shouldComponentUpdate(newProps, newState) {
    const { evaluation, skills } = newProps.r_user;
    if (evaluation.length || newProps.r_key || skills.length) {
      if (this.state.type) {
        this.setState({
          evaluation: evaluation ? evaluation : [],
          skills: skills ? skills : []
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
        data.type = 2;
        delete data.loginAt;
        updateUser(data).then(res => {
          if (res.ok === 1) {
            message.success('修改成功！');
          }
        });
      }
    });
  };
  handleChangeEvalDesc(index, e) {
    const { evaluation } = this.state;
    const { value } = e.target;
    this.setState({
      evaluation: evaluation.map((item, _index) => _index === index ? value : item)
    });
  }
  remove = index => {
    const { evaluation } = this.state;
    evaluation.splice(index, 1);
    this.setState({
      evaluation
    });
  };

  add = () => {
    const { evaluation } = this.state;
    evaluation.push('');
    this.setState({
      evaluation
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
    return this.state.evaluation.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '自我评价' : ''}
        required={true}
        key={index}
      >
        <TextArea placeholder="请输入自我评价" style={{ width: '70%', marginRight: 8 }} rows={3} value={k} onChange={this.handleChangeEvalDesc.bind(this, index)} />
        {this.state.evaluation.length > 0 ? (
          <Icon
            className="dynamic-delete-button-resume"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        ) : null}
      </Form.Item>
    ));
  }

  removeSkills = index => {
    const { skills } = this.state;
    skills.splice(index, 1);
    this.setState({
      skills
    });
  };

  addSkills = () => {
    const { skills } = this.state;
    skills.push('');
    this.setState({
      skills
    });
  };
  handleChangeSkills(index, e) {
    const { skills } = this.state;
    const { value } = e.target;
    this.setState({
      skills: skills.map((item, _index) => _index === index ? value : item)
    });
  }
  formItemSkills() {
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
    return this.state.skills.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '个人能力' : ''}
        required={true}
        key={index}
      >
        <TextArea placeholder="请输入个人能力" style={{ width: '70%', marginRight: 8 }} rows={3} value={k} onChange={this.handleChangeSkills.bind(this, index)} />
        {this.state.skills.length > 0 ? (
          <Icon
            className="dynamic-delete-button-resume"
            type="minus-circle-o"
            onClick={() => this.removeSkills(index)}
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
    const { r_key, r_user } = this.props;
    return (
      <div style={{ display: r_key === '2' ? 'block' : 'none' }}>
        <p className='basic_title'>个人简历</p>
        <Form layout='vertical' {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item label="职位">
            {
              getFieldDecorator('position', {
                rules: [{ required: true, message: '请输入职位' }],
                initialValue: r_user.position
              })(
                <Input placeholder="请输入职位" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label="期望薪资">
            {
              getFieldDecorator('salary', {
                rules: [{ required: true, message: '请输入期望薪资' }],
                initialValue: r_user.salary
              })(
                <Input placeholder="请输入期望薪资" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label="到岗时间">
            {
              getFieldDecorator('reportTime', {
                rules: [{ required: true, message: '请选择到岗时间' }],
                initialValue: r_user.reportTime
              })(
                <Select>
                  <Option value="0">随时到岗</Option>
                  <Option value="1">一周以内</Option>
                  <Option value="2">半月以内</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="工作经验">
            {getFieldDecorator('year', {
              rules: [{ required: true, message: '请输入工作经验!' }],
              initialValue: r_user.year
            })(
              <Input placeholder="请输入工作经验" size='large' />,
            )}
          </Form.Item>
          <Form.Item label='兴趣爱好'>
            {
              getFieldDecorator('hobby', {
                initialValue: r_user.hobby
              })(
                <TextArea placeholder="请输入兴趣爱好" rows={4} />
              )
            }
          </Form.Item>
          {this.formItemSkills()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addSkills} style={{ width: '70%' }} size='large'>
              <Icon type="plus" /> 添加个人能力
              </Button>
          </Form.Item>
          {this.formItemFn()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '70%' }} size='large'>
              <Icon type="plus" /> 添加自我评价
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
