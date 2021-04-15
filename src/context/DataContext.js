/**
 * DataContext holds the essential data of the app, such as postos.
 */

/* eslint-disable no-undef */
import sort from 'fast-sort';
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
  let sorted_arr = [];

  switch (action.type) {
    case 'add_postos':
      return {
        ...state,
        postos: _.unionBy(...state.postos, action.payload, '_id'), // merge unique
      };
    case 'set_nearest':
      return { ...state, nearestPostos: action.payload };

    case 'set_filter':
      return { ...state, filter: action.payload };
    case 'maior_reservatorio':
      sorted_arr = sort([...state.postos]).by([
        { desc: (posto) => posto.reservatorio },
        { asc: (posto) => posto.nome },
      ]);
      return action.payload
        ? {
            ...state,
            searchResults: sorted_arr,
          }
        : {
            ...state,
            filteredPostos: {
              ...state.filteredPostos,
              maior_reservatorio: sorted_arr,
            },
          };
    case 'menor_reservatorio':
      sorted_arr = sort([...state.postos]).by([
        { asc: (posto) => posto.reservatorio },
        { asc: (posto) => posto.nome },
      ]);
      return action.payload
        ? {
            ...state,
            searchResults: sorted_arr,
          }
        : {
            ...state,
            filteredPostos: {
              ...state.filteredPostos,
              menor_reservatorio: sorted_arr,
            },
          };

    case 'reset_all':
      return {
        postos: [],
        filteredPostos: {
          maior_reservatorio: [],
          menor_reservatorio: [],
          rating: [],
        },
        nearestPostos: [],
        searchResults: [],
      };
    case 'reset_filter':
      return {
        ...state,
        filter: '',
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
// custom --> if it's predefined
const applyFilter = (dispatch) => (filter, custom = false) => {
  dispatch({ type: filter, payload: custom });
};

const resetAll = (dispatch) => () => {
  dispatch({ type: 'reset_all' });
};

export const { Context, Provider } = createDataContext(
  dataReducer,
  {
    addPostos,
    applyFilter,
    setNearest,
    resetAll,
    fetchPostosFromDB,
    // sendPostosToDB,
    // parseGoogleApiDataToJS,
  },
  {
    postos: [], // list of all postos from db
    sortedPostos: {
      maior_reservatorio: [], // sort by largest reservatorio
      menor_reservatorio: [], // sort by smallest reservatorio
      rating: [], // sort by rating
    },
    nearestPostos: [], // list of nearest postos from google
  } // initial state
);
