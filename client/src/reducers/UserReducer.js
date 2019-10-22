import {TOGGLE_USER} from '../constants/actions';

const UserReducer = (state, action) => {
  let newState = {...state};
  switch (action.type) {
    case TOGGLE_USER:
      newState.loggedIn = !state.loggedIn;
      break;
    default:
  }
  return newState;
}

export default UserReducer;
