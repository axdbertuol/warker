/**
 * This is a hook function that is used to update the state of DataContext.
 * It needs a location with coordinates and a connection to the server.
 */
import { useState, useEffect, useContext } from 'react';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';
import { Context as SearchContext } from '../context/SearchContext';

export default () => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const {
    state: { postos },
    updateNearbyPostos,
    fetchPostosFromDB,
  } = useContext(DataContext);

  // const {
  //   state: { results },
  // } = useContext(SearchContext);

  const [err, setErr] = useState('');
  const [postosDidSet, setPostosDidSet] = useState(false);

  const updatePostos = () => {
    updateNearbyPostos(currentLocation);
    fetchPostosFromDB();
    // updateNearbyPostos from google
    // if (hasSearched) console.log('search results', JSON.stringify(results));
    // if (postos && postos.length > 0) {
    //   setPostosDidSet(true);
    // }
  };

  useEffect(() => {
    if (currentLocation) updatePostos();
  }, [currentLocation]);

  return [err, postosDidSet];
};
