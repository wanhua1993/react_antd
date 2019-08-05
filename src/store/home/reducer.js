import { SETCOLLAPSED, SETTOKEN, SETUSER } from './action-type';
const defaultState = {
  collapsed: false,
  token: '',
  user: {}
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SETCOLLAPSED:
      return Object.assign({}, state, state.collapsed = !action.collapsed);
    case SETTOKEN:
      return Object.assign({}, state, state.token = action.token);
    case SETUSER: 
    return Object.assign({}, state, state.user = action.user);
    default:
      return state;
  }
}

export default reducer;