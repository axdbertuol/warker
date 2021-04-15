import { useState, useEffect, useContext } from 'react';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';

import { Context as LocationContext } from '../context/LocationContext';

// takes in a shouldTrack argument -> indicates whether should track or not, when user changes screen it should stop
export default (shouldTrack) => {
  const [err, setErr] = useState(null);
  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 20,
          },
          (location) => {
            setLocation(location); // do something with the location
          }
        );
      } catch (e) {
        setErr('useLocation: ' + e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      //stop watching process
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    // this will run when unmounting to cleanup the subscription
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack]);

  return [err];
};
