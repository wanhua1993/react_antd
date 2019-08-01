import React, { Component } from 'react';
import { Button, Result } from 'antd';

export default class NotFound extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => {
             history.push('/home');
          }}>Back Home</Button>}
        />,
      </div>
    )
  }
}