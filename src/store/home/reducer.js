import { SETCOLLAPSED, SETTOKEN } from './action-type';
const defaultState = {
  collapsed: false,
  token: ''
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SETCOLLAPSED:
      return Object.assign({}, state, state.collapsed = !action.collapsed);
      case SETTOKEN: 
      return Object.assign({}, state, state.token = action.token);
    default:
      return state;
  }
}

export default reducer;