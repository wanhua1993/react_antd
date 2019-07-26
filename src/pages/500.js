import React, { Component } from 'react';
import { Button, Result } from 'antd';

export default class BadRequest extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, the server is wrong."
          extra={<Button type="primary" onClick={() => {
            history.push('/home');
          }}>Back Home</Button>}
        />,
      </div>
    )
  }
}
