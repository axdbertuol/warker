/**
 * This is a hook function that is used to update the state of DataContext.
 * It needs a location with coordinates and a connection to the server.
 */
import { useState, useEffect, useContext } from 'react';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';

export default () => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const {
    state: { postos },
    fetchPostosFromDB,
  } = useContext(DataContext);
  const [err, setErr] = useState('');
  const [postosDidSet, setPostosDidSet] = useState(false);

  const updatePostos = () => {
    fetchPostosFromDB();
    // getNearbyPostos from google
    // console.log('postos', JSON.stringify(postos));
    // if (postos && postos.length > 0) {
    //   setPostosDidSet(true);
    // }
  };

  useEffect(() => {
    if (currentLocation) updatePostos();
    // console.log('postosDidSet', postosDidSet);
    // console.log('currentLocation', currentLocation);
  }, [currentLocation]);

  return [err, postosDidSet];
};
