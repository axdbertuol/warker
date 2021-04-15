import convert from 'convert-units';
import createDataContext from './createDataContext';

/**
 * The Location reducer
 *
 * @param {object} state - The state object
 * @param {object} action - The action object
 */
const locationReducer = (state, action) => {
  switch (action.type) {
    case 'set_current_location':
      return { ...state, currentLocation: action.payload };
    case 'set_destination':
      return { ...state, destination: action.payload };
    case 'set_duration':
      return {
        ...state,
        destination: { ...state.destination, duration: action.payload },
      };
    case 'set_distance':
      return {
        ...state,
        destination: { ...state.destination, distance: action.payload },
      };
    case 'start_recording':
      return { ...state, recording: true };
    case 'stop_recording':
      return { ...state, recording: false };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'reset':
      return {
        ...state,
        locations: [],
        name: '',
        currentLocation: null,
        destination: null,
      };
    case 'reset_destination':
      return {
        ...state,
        destination: null,
      };

    default:
      return state;
  }
};

/**
 * Dispatch destination object to state
 * @param {Object} destination - An object containing a coords object with latitude and longitude of the destination
 */
const setDestination = (dispatch) => (destination) => {
  dispatch({ type: 'set_destination', payload: destination });
};

/**
 * Dispatch duration (ETA) for destination
 * @param {Number} duration - A number representing the ETA for the destination from the currentLocation
 */
const setDuration = (dispatch) => (duration) => {
  let duration_obj = convert(duration).from('min').toBest();

  dispatch({ type: 'set_duration', payload: { ...duration_obj } });
};
/**
 * Dispatch distance for destination
 * @param {Number} distance - A number representing the distance between the destination and currentLocation
 */
const setDistance = (dispatch) => (distance) => {
  let distance_obj = convert(distance).from('km').toBest();
  //   distance_obj.val = distance % 1 != 0 ? distance.val.toFixed(1) : distance.val;
  dispatch({ type: 'set_distance', payload: { ...distance_obj } });
};
/**
 * Dispatch set recording = true
 */
const startRecording = (dispatch) => () => {
  dispatch({ type: 'start_recording' });
};
/**
 * Dispatch set recording = false
 */
const stopRecording = (dispatch) => () => {
  dispatch({ type: 'stop_recording' });
};
/**
 * Dispatch current location to currentLocation
 * @param {Object} location - An object with a coords object containing latitude and longitude of the current location
 */
const setLocation = (dispatch) => (location) => {
  dispatch({ type: 'set_current_location', payload: location });
};
/**
 * Dispatch reset currentLocation object
 */
const resetLocation = (dispatch) => () => {
  dispatch({ type: 'reset' });
};
/**
 * Dispatch reset destination object
 */
const resetDestination = (dispatch) => () => {
  dispatch({ type: 'reset_destination' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    setDestination,
    startRecording,
    stopRecording,
    setDuration,
    setDistance,
    setLocation,
    resetDestination,
    resetLocation,
  },
  {
    recording: false,
    locations: [],
    currentLocation: null,
    destination: null,
  }
);
