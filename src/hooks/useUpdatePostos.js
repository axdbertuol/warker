/**
 * This is a hook function that is used to update the state of DataContext.
 * It needs a location with coordinates and a connection to the server.
 */
import { useEffect, useContext } from 'react';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';

export default () => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const { updateNearbyPostos, fetchPostosFromDB } = useContext(DataContext);

  const updatePostos = () => {
    updateNearbyPostos(currentLocation);
    fetchPostosFromDB();
  };

  useEffect(() => {
    if (currentLocation) updatePostos();
  }, [currentLocation]);
};
