/**
 * This is a hook function that is used to update the state of SearchContext.
 * It needs a location with coordinates and a connection to the server.
 */
import { useEffect, useContext } from 'react';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';
import { Context as SearchContext } from '../context/SearchContext';

export default () => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const { fetchPostosFromDB } = useContext(DataContext);

  const {
    state: { query, results, radius, filters, didSearch },
    searchNearbyPostos,
    setDidSearch,
  } = useContext(SearchContext);

  const searchPostos = () => {
    console.log('params', query, currentLocation, radius, filters);
    searchNearbyPostos(query, currentLocation, radius, filters);
    fetchPostosFromDB();
    console.log('results', JSON.stringify(results));
  };

  useEffect(() => {
    if (didSearch && currentLocation && (query || radius || filters))
      searchPostos();
    setDidSearch(false);
  }, [didSearch]);
};
