import React, { Component } from 'react';
import { Button } from 'antd';
import ModelOne from './model_one';
import ModelTwo from './model_two';
import ModelThree from './model_three';
import ModelFour from './model_four';
import ModelFive from './model_five';
import ModelSix from './model_six';
import ModelSeven from './model_seven';
import ModelEight from './model_eight';
import { projectListAll, workListAll } from '@/api/login';
import { getStorage } from '@/utils';
import { SketchPicker } from 'react-color';
import printElement from './printElement';
import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";
import './index.less';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 0,
      user: {},
      workList: [],
      projectList: [],
      displayColor: 'none',
      color: '',
      printElementNodes: []
    }
  }
  componentDidMount() {
    const model = this.props.location.search.split('model=')[1];
    const user = getStorage('user');
    projectListAll({ uId: user._id }).then(res => {
      this.setState({
        projectList: res
      })
    });
    workListAll({ uId: user._id }).then(res => {
      this.setState({
        workList: res
      })
    });
    this.setState({
      user,
      model
    });
  }
  print() {
    const { model } = this.state;
    // window.document.body.innerHTML = window.document.getElementById(`model-content-${model}`).innerHTML; window.print();
    // window.location.reload();
    printElement({
      content: this.state.printElementNodes[model - 1],
    });
  }

  back() {
    this.props.history.go(-1);
  }
  handleChangeColor() {
    this.setState({
      displayColor: this.state.displayColor === 'none' ? 'block' : 'none'
    });
  }
  handleChange(color) {
    this.setState({
      color: color.hex
    });
  }
  modelOnRefNodes(e) {
    const { printElementNodes } = this.state;
    printElementNodes.push(e);
    this.setState({
      printElementNodes
    });
  }
  downloadModel() {
    const { model } = this.state;
    let domModel = document.getElementById(`model-content-${model}`)
    html2canvas(domModel).then((canvas) => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 800;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('', 'pt', 'a4');
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight;
          position -= 840;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save('个人简历_' + model + '.pdf');
    })
  }
  render() {
    const { model, user, workList, projectList, displayColor, color } = this.state;
    return (
      <div className='content resume-wraper'>
        <div className='resume-page'>
          <Button type='primary' size='large' onClick={this.downloadModel.bind(this)}>下载</Button>
          <Button type='primary' size='large' onClick={this.print.bind(this)}>打印</Button>
          <Button type='text' size='large' onClick={this.back.bind(this)}>返回</Button>
          <Button type='text' size='large' onClick={this.handleChangeColor.bind(this)}>选择模板颜色</Button>
          <div className='resume-color' style={{ display: displayColor }}>
            <SketchPicker color={this.state.color} onChange={this.handleChange.bind(this)} />
          </div>
          <div className='color-demo' style={{ background: color }}></div>
        </div>
        <div className='resume-content'>
          <ModelOne onRef={this.modelOnRefNodes.bind(this)} model_1={model} user_1={user} work_1={workList} project_1={projectList} color_1={color} />
          <ModelTwo onRef={this.modelOnRefNodes.bind(this)} model_2={model} user_2={user} work_2={workList} project_2={projectList} color_2={color} />
          <ModelThree onRef={this.modelOnRefNodes.bind(this)} model_3={model} user_3={user} work_3={workList} project_3={projectList} color_3={color} />
          <ModelFour onRef={this.modelOnRefNodes.bind(this)} model_4={model} user_4={user} work_4={workList} project_4={projectList} color_4={color} />
          <ModelFive onRef={this.modelOnRefNodes.bind(this)} model_5={model} user_5={user} work_5={workList} project_5={projectList} color_5={color} />
          <ModelSix onRef={this.modelOnRefNodes.bind(this)} model_6={model} user_6={user} work_6={workList} project_6={projectList} color_6={color} />
          <ModelSeven onRef={this.modelOnRefNodes.bind(this)} model_7={model} user_7={user} work_7={workList} project_7={projectList} color_7={color} />
          <ModelEight onRef={this.modelOnRefNodes.bind(this)} model_8={model} user_8={user} work_8={workList} project_8={projectList} color_8={color} />
        </div>
      </div>
    )
  }
}
