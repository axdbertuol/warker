/**
 * DataContext holds the essential data of the app, such as postos.
 * Postos
 */

/* eslint-disable no-undef */
import PropTypes from 'prop-types';
var _ = require('lodash');

import warkerApi from '../api/warker';
import createDataContext from './createDataContext';

/**
 * The data reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'add_postos':
      return {
        ...state,
        postos: _.unionBy(...state.postos, action.payload, '_id'), // merge unique
      };
    case 'set_nearest':
      return { ...state, nearestPostos: action.payload };

    case 'reset_all':
      return {
        postos: [],
        nearestPostos: [],
      };
    default:
      return state;
  }
};

/**
 * Dispatch new postos to postos
 *
 * @param {Array} postos - Array of new postos
 */
const addPostos = (dispatch) => (postos) => {
  if (postos.length > 0)
    dispatch({
      type: 'add_postos',
      payload: postos,
    });
};

addPostos.propTypes = {
  postos: PropTypes.array.isRequired,
};

/**
 * Get postos from the server.
 * Server will get it from google, parse/add objects and send them back
 * @async
 * @param {Object} currentLocation - An object with a coords object containing
 * latitude and longitude of the user's location
 */
const updateNearbyPostos = (dispatch) => async (currentLocation) => {
  try {
    const { coords } = currentLocation;
    const response = await warkerApi.get('/api/nearbysearch', {
      params: {
        query: '',
        lat: coords.latitude,
        lng: coords.longitude,
        // radius: 10,
      },
    });

    dispatch({
      type: 'set_nearest',
      payload: response.data.result,
    });
  } catch (error) {
    console.log('getNearbyPostos ' + error.message);
  }
};
/**
 * Fetch postos data from DB and add them to the state postos
 * @async
 * @param {Array} postosIds - Array of postos ids to fetch *optional
 * @return {Array} - Array of postos from DB
 */
const fetchPostosFromDB = (dispatch) => async (postosIds) => {
  try {
    let response;
    if (postosIds) {
      response = await warkerApi.get('/api/postos', {
        params: { postosIds },
      });
    } else {
      response = await warkerApi.get('/api/postos');
    }
    dispatch({
      type: 'add_postos',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchPostos ' + error.message);
  }
};

fetchPostosFromDB.propTypes = {
  postosIds: PropTypes.array,
};

/**
 * Dispatch nearest postos to the nearest list
 */
const setNearest = (dispatch) => (postos) => {
  if (Array.isArray(postos)) dispatch({ type: 'set_nearest', payload: postos });
};

setNearest.propTypes = {
  postos: PropTypes.array.isRequired,
};

const resetAll = (dispatch) => () => {
  dispatch({ type: 'reset_all' });
};

export const { Context, Provider } = createDataContext(
  dataReducer,
  {
    addPostos,
    setNearest,
    resetAll,
    fetchPostosFromDB,
    updateNearbyPostos,
  },
  {
    postos: [], // list of all postos from db
    nearestPostos: [], // list of nearest postos from google
  } // initial state
);
