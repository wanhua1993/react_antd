import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { getCookie } from '@/utils';

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isLt2M;
}

class Avatar extends Component {
  state = {
    loading: false,
    imageUrl: ''
  };

  uploadAvatar = info => {
    let res = info.fileList[info.fileList.length - 1].response;
    if (res) {
      if (res.code === '200') {
          this.setState({
            imageUrl: res.url
          });
      }
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file 上传失败.`);
      }
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        name='file'
        action={'http://localhost:8000/users/upload_avatar'}
        headers={
          { token: getCookie('token') }
        }
        onChange={this.uploadAvatar}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar;