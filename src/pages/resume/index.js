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
    html2canvas(domModel, {
      dpi: 144,
    }).then(canvas => {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var doc = new jsPDF("p", "mm", "a4");
      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      doc.save("简历模板_" + model + ".pdf");
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
