import createDataContext from './createDataContext';
import warkerApi from '../api/warker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigator from '../navigationRef';

/**
 * The Authentication reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'set_user':
      return { ...state, user: action.payload };
    case 'signup':
    case 'signin':
      return {
        token: action.payload,
        errorMessage: '',
      };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'clear_error':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

/**
 * It tries to log in using the token that the user might hold.
 * If it doesn't exist then it will redirect to the SigninScreen
 *
 * @async
 */
const tryLocalSignin = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    // await AsyncStorage.removeItem('token');
    if (token) {
      // TODO: get user info from backend
      dispatch({ type: 'signin', payload: token });
      navigator.navigate('Explorar');
    } else {
      navigator.navigate('Signin');
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Dispatch to clear error message(s) from state
 */
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error' });
};

/**
 * Dispatch error message to state
 *
 * @param {string} message - The error message to store
 */
const addErrorMessage = (dispatch) => (message) => {
  dispatch({ type: 'add_error', payload: message });
};

/**
 * Make api request to sign up with given email and password
 * then if they sign up, modify their state to tell they are authenticated
 * but if it fails, store error message
 *
 * @async
 * @param {object} - an object with:
 * @param {string} email - The email
 * @param {string} password - The password
 */
const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await warkerApi.post('/signup', {
      email: email,
      password: password,
    });
    const token = response.data['token'];
    const user = response.data['user'];

    // store token in storage and state
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'set_user', payload: user });
    dispatch({ type: 'signup', payload: token });
    navigator.navigate('Signin');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
    console.error(error.response.data);
  }
};

/**
 * Make api request to sign in with given email and password
 * then if token returns, store in AsyncStorage and dispatch to state
 * but if it fails, store error message
 *
 * @async
 * @param {object} - an object with:
 * @param {string} email - The email
 * @param {string} password - The password
 */
const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await warkerApi.post('/signin', {
      email: email,
      password: password,
    });
    const token = response.data['token'];
    const user = response.data['user'];

    // store token in storage and state
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'set_user', payload: user });
    dispatch({ type: 'signin', payload: token });
    navigator.navigate('Explorar');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
    console.error(error.response.data);
  }
};

/**
 * Remove token from AsyncStorage, dispatch signout to state
 * and navigate to SigninScreen
 * @async
 */
const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigator.navigate('Signin');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign out',
    });
    console.log(error.message);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    signup,
    clearErrorMessage,
    tryLocalSignin,
    addErrorMessage,
  },
  { token: null, errorMessage: '', user: {} }
);
