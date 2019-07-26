import { SETCOLLAPSED } from './actionTypes';
const defaultState = {
  collapsed: false
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SETCOLLAPSED:
      return Object.assign({}, state, state.collapsed = !action.collapsed);
    default:
      return state;
  }
}

export default reducer;