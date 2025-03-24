import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...state, token: action.payload.token, user: action.payload.user };
    case LOGOUT:
      localStorage.removeItem('token');
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export default authReducer;
