import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Icon, message } from 'antd';
import { addWork, getOneWork, updateOneWork } from '@/api/login';
import { getStorage } from '@/utils';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
@Form.create()
class AddWork extends Component {
  state = {
    startTime: new Date(), // 开始时间
    endTime: new Date(), // 结束时间
    workDesc: [],
    _id: ''
  }

  componentDidMount() {
    const _id = this.props.location.search.split('_id=')[1];
    if (_id) {
      this.setState({
        _id
      });
      this.getWork(_id);
    }
  }

  getWork(_id) {
    getOneWork({ _id }).then(res => {
      const value = res[0];
      this.setState({
        startTime: value.startTime,
        endTime: value.endTime,
        workDesc: value.workDesc
      });
      setTimeout(() => {
        this.props.form.setFieldsValue({
          company: value.company,
          position: value.position,
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
          updateOneWork(data).then(res => {
            if (res.code === '200') {
              message.success('修改成功！');
              this.props.history.push('/account/work');
            } else {
              message.erroe('修改失败！');
            }
          });
        } else {
          // 新建
          addWork(data).then(res => {
            if (res.code === '200') {
              message.success('添加成功！');
              this.props.history.push('/account/work');
            } else {
              message.success('添加失败！');
            }
          });
        }
      }
    });
  };

  handleChangeTime(opts, time) {
    this.setState({
      startTime: time[0],
      endTime: time[1]
    });
  }
  handleChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }
  handleChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  handleChangeWorkDesc(index, e) {
    const { workDesc } = this.state;
    const { value } = e.target;
    this.setState({
      workDesc: workDesc.map((item, _index) => _index === index ? value : item)
    });
  }
  remove = index => {
    const { workDesc } = this.state;
    workDesc.splice(index, 1);
    this.setState({
      workDesc
    });
  };

  add = () => {
    const { workDesc } = this.state;
    workDesc.push('');
    this.setState({
      workDesc
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
    return this.state.workDesc.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '工作描述' : ''}
        required={true}
        key={index}
      >
        <TextArea placeholder="请输入工作描述" style={{ width: '60%', marginRight: 8 }} rows={2} value={k} onChange={this.handleChangeWorkDesc.bind(this, index)} />
        {this.state.workDesc.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        ) : null}
      </Form.Item>
    ));
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { startTime, endTime, company, position } = this.state;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 15, offset: 7
      },
    };
    return (
      <div className='content' >
        <div style={{ padding: '20px 0' }}>
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 9 }} onSubmit={this.handleSubmit}>
            <Form.Item label="公司名称">
              {getFieldDecorator('company', {
                rules: [{ required: true, message: '请输入公司名称!' }],
                initialValue: company
              })(<Input size='large' onChange={this.handleChangeCompany.bind(this)} />)}
            </Form.Item>
            <Form.Item label="职位">
              {getFieldDecorator('position', {
                rules: [{ required: true, message: '请输入职位名称!' }],
                initialValue: position
              })(
                <Input onChange={this.handleChangePosition.bind(this)} />
              )}
            </Form.Item>
            <Form.Item label="起止时间">
              <RangePicker onChange={this.handleChangeTime.bind(this)} size='large' value={[moment(startTime),moment(endTime)]}/>
            </Form.Item>
            {this.formItemFn()}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }} size='large'>
                <Icon type="plus" /> 添加工作描述
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

export default AddWork;