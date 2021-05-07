import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import { mapRef, isReadyRef } from '../mapRef';

/**
 * A blank screen that will try to log in user with token
 */
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    isReadyRef.current = true;

    tryLocalSignin();
  }, []);
  return <ActivityIndicator animating={true} />;
};

export default ResolveAuthScreen;
