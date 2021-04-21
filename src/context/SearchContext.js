/**
 * A SearchContext holds information about a particular search.
 */

import createDataContext from './createDataContext';
import PropTypes from 'prop-types';
import warkerApi from '../api/warker';

/**
 * The Search reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */
const searchReducer = (state, action) => {
  switch (action.type) {
    case 'set_search_results':
      return { ...state, results: action.payload };
    case 'handle_modal':
      return {
        ...state,
        modal: action.payload ? action.payload : !state.modal,
      };
    case 'set_query':
      return { ...state, query: action.payload };
    case 'add_filter':
      return {
        ...state,
        filters: [...new Set([...state.filters, action.payload])],
      };
    case 'remove_filter':
      return {
        ...state,
        filters: state.filters.filter((f) => f !== action.payload),
      };
    case 'set_filters':
      return { ...state, filters: [...action.payload] };
    case 'reset':
      return { query: '', cidade: '', filters: [], results: [] };
    default:
      return state;
  }
};

/**
 * Get postos from the server.
 * Server will get it from google, parse/add objects and send them back
 * @async
 * @param {string} query - The query to send to the server.
 * @param {Object} currentLocation - An object with a coords object containing
 * latitude and longitude of the user's location
 */
const getNearbyPostos = (dispatch) => async (query, currentLocation) => {
  try {
    const { coords } = currentLocation;
    const response = await warkerApi.get('/api/nearbysearch', {
      params: { query, lat: coords.latitude, lng: coords.longitude },
    });

    console.log(response.data.result);
    dispatch({
      type: 'set_search_results',
      payload: response.data.result,
    });

    return Promise.resolve();
  } catch (error) {
    console.log('getNearbyPostos ' + error.message);
  }
};

/**
 * Sets the query string to be used.
 *
 * @param {string} query - The query string
 */
const setQuery = (dispatch) => (query) => {
  dispatch({ type: 'set_query', payload: query });
};
setQuery.propTypes = {
  query: PropTypes.string.isRequired,
};

/**
 * Sets the results from the last search result
 *
 * @param {Array} results - The results (postos) from the last search result
 */
const setSearchResults = (dispatch) => (results) => {
  dispatch({ type: 'set_search_results', payload: results });
};
setSearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

/**
 * Set filters to be applied
 *
 * @param {Array} filters - The filters array
 */
const setFilters = (dispatch) => (filters) => {
  dispatch({ type: 'set_filters', payload: filters });
};
setFilters.propTypes = {
  filters: PropTypes.array.isRequired,
};

/**
 * Add a filter to the results
 *
 * @param {string} filter - The filter string
 */
const addFilter = (dispatch) => (filter) => {
  dispatch({ type: 'add_filter', payload: filter });
};
addFilter.propTypes = {
  filter: PropTypes.string.isRequired,
};

/**
 * Remove one of the filters
 *
 * @param {string} filter - The filter string
 */
const removeFilter = (dispatch) => (filter) => {
  dispatch({ type: 'remove_filter', payload: filter });
};
removeFilter.propTypes = {
  filter: PropTypes.string.isRequired,
};
export const { Context, Provider } = createDataContext(
  searchReducer,
  {
    setFilters,
    setQuery,
    addFilter,
    removeFilter,
    setSearchResults,
    getNearbyPostos,
  },
  { query: '', cidade: '', filters: [], results: [] } // initial state
);
