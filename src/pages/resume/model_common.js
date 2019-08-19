import React from 'react';
// 工作经历
const modelWork = (data, state) => {
  const { modelworkli, modelworkdesc, modeldesclist, modelBack } = state;
  return <ul className='model-one-work'>
    {
      data.map((item, ind) => (
        <li key={item.company + ind} style={modelworkli} className='model-work-li'>
          {
            ulFlexLi(`${item.startTime} ~ ${item.endTime}`, item.company, item.position, modelBack)
          }
          <p style={modelworkdesc}>工作描述: </p>
          {
            item.workDesc.map((val, index) => (
              <p key={val + index} style={modeldesclist}>
                {index + 1}、 {val}
              </p>
            ))
          }
        </li>
      ))
    }
  </ul>
}
// 项目经验
const modelProject = (data, state) => {
  const { modelworkli, modelworkdesc, modelworkdescspan, modeldesclist, modelBack } = state;
  return <ul className='model-one-work'>
    {
      data.map((item, ind) => (
        <li key={item._id} style={modelworkli} className='model-work-li'>
          {
            ulFlexLi(item.title, `${item.startTime} ~ ${item.endTime}`, '', modelBack)
          }
          <p style={modelworkdesc}>项目简述: <span style={modelworkdescspan}> {item.proDesc} </span></p>
          <p style={modelworkdesc}>责任描述: </p>
          {
            item.resDesc.map((val, index) => (
              <p key={val + index} style={modeldesclist}>
                {index + 1}、 {val}
              </p>
            ))
          }
        </li>
      ))
    }
  </ul>
}
// 自我评价
const modelEval = (evaluation, state) => {
  const { modelevalli } = state;
  evaluation = evaluation ? evaluation : [];
  return <ul className='model-one-eval'>
    {
      evaluation.map((item, index) => (
        <li key={item + index} style={modelevalli}>
          {index + 1}、 {item}
        </li>
      ))
    }
  </ul>
}
// 个人能力
const modelSkills = (skills, state) => {
  const { modelevalli } = state;
  skills = skills ? skills : [];
  return <ul className='model-one-eval'>
    {
      skills.map((item, index) => (
        <li key={item + index} style={modelevalli}>
          {index + 1}、 {item}
        </li>
      ))
    }
  </ul>
}
// 教育背景
const modelEduBack = (data, state) => {
  const { modelBack } = state;
  data = data ? data : [];
  return data.map((item, index) => (
    <div key={index}>
      <ul style={modelBack}>
        <li>{item.time[0] + ' ~ ' + item.time[1]}</li>
        <li>{item.school}</li>
        <li>{item.professional}</li>
      </ul>
      <p>{item.things}</p>
    </div>
  ))
}
// 
const ulFlexLi = (time, company, position, modelBack) => {
  return <ul style={modelBack}>
    <li>{time}</li>
    <li>{company}</li>
    <li>{position}</li>
  </ul>
}

export {
  modelWork, modelProject, modelEval, modelSkills, modelEduBack
}