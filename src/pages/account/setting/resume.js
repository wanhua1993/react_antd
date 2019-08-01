import React, { Component } from 'react';
import { Form, Input, Button, Upload, message, Result, Icon } from 'antd';
import { getCookie } from '@/utils';
import './basic.less';
import './basic.less';

const { TextArea } = Input;
@Form.create()
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: '',
      evaluation: []
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = { ...values, ...this.state }
        console.log(data);
      }
    });
  };
  handleChangeDesc(e) {
    this.setState({
      desc: e.target.value
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
  handleChangeEvalDesc(index, e) {
    const { evaluation } = this.state;
    const { value } = e.target;
    this.setState({
      evaluation: evaluation.map((item, _index) => _index === index ? value : item)
    });
  }
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
        <TextArea placeholder="请输入自我评价" style={{ width: '60%', marginRight: 8 }} rows={3} value={k} onChange={this.handleChangeEvalDesc.bind(this, index)} />
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
  render() {
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 8 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 13, offset: 0
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { r_key } = this.props;
    return (
      <div style={{ display: r_key === '2' ? 'block' : 'none' }}>
        <p className='basic_title'>个人简历</p>
        <Form layout='vertical' {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="职位">
            {
              getFieldDecorator('position', {
                rules: [{ required: true, message: '请输入职位' }]
              })(
                <Input placeholder="请输入职位" size='large' />
              )
            }
          </Form.Item>
          <Form.Item label="工作经验">
            {getFieldDecorator('year', {
              rules: [{ required: true, message: '请输入工作经验!' }],
            })(
              <Input placeholder="请输入工作经验" size='large' />,
            )}
          </Form.Item>
          <Form.Item label='专业技能'>
            {
              getFieldDecorator('skills', {
                rules: [{ required: true, message: '请输入专业技能' }]
              })(
                <TextArea placeholder="请输入专业技能" rows={4} />
              )
            }
          </Form.Item>
          {this.formItemFn()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }} size='large'>
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