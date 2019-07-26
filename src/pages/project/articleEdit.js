import React, { Component } from 'react';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { Button } from 'antd';
import './index.less';

class ArticleEdit extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  formSubmit() {
    // 转换成HTML格式
    var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    // this.props.saveSys({roomnotes: editorContent})
    console.log(editorContent);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.getSysResult !== nextProps.getSysResult && nextProps.getSysResult.data) {
  //     // 匹配富文本编辑器格式，回显保存的内容
  //     const contentBlock = htmlToDraft(nextProps.getSysResult.data.roomnotes);
  //     if (contentBlock) {
  //       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //       const editorState = EditorState.createWithContent(contentState);
  //       this.setState({ editorState })
  //     }
  //   }
  // }
  render() {
    const { editorState } = this.state;
    return (
      <div className='edit-content'>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <div className='edit-button'>
          <Button type='primary' className='edit-button-save' size='large' onClick={this.formSubmit.bind(this)}>保存</Button>
          <Button type='text' size='large'>取消</Button>
        </div>
      </div>
    );
  }
}

export default ArticleEdit;