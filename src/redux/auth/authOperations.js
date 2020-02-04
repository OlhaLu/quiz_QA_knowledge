import { setToken, login, getUser, register } from '../../servises/api';
import { toast } from 'react-toastify';
import userErrMessages from '../../components/AuthForm/errors/userErrMessages';
import authActions from './authActions';

const registerUser = (credentials, path, dispatch) => {
  dispatch(authActions.registerStart());

  register(path, credentials)
    .then(response => {
      setToken(response.data.token);
      dispatch(authActions.registerSuccess(response.data));
    })
    .catch(error => {
      dispatch(authActions.registerFailure(error));
      toast.error(userErrMessages.EXISTING_USER, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

const loginUser = credentials => dispatch => {
  dispatch(authActions.loginStart());

  login(credentials)
    .then(res => {
      setToken(res.data.token);
      dispatch(authActions.loginSuccess(res.data));
    })
    .catch(err => {
      dispatch(authActions.loginFailure(err));
      toast.error(userErrMessages.WRONG_PASSWORD, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

const getCurrentUser = () => (dispatch, getState) => {
  const { token } = getState().auth;
  if (!token) return;
  setToken(token);
  dispatch(authActions.getCurrentStart());
  getUser()
    .then(response => {
      dispatch(authActions.getCurrentSuccess(response.data.user));
    })
    .catch(err => dispatch(authActions.getCurrentFailure(err)));
};

export default { registerUser, loginUser, getCurrentUser };
