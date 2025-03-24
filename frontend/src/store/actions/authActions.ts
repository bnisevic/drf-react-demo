export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (username: string, password: string) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { username, password },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
