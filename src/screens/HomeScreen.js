import React, { useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, ActivityIndicator } from 'react-native-paper';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as SearchContext } from '../context/SearchContext';
import { Context as DataContext } from '../context/DataContext';
import useLocation from '../hooks/useLocation';
import useUpdatePostos from '../hooks/useUpdatePostos';
import Map from '../components/Map';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // CONTEXTS
  const {
    state: { currentLocation, destination },
    setLocation,
    setDestination,
  } = useContext(LocationContext);
  const {
    state: { query },
    setQuery,
  } = useContext(SearchContext);

  const {
    state: { nearest, postos },
  } = useContext(DataContext);

  // HOOKS with useEffect
  const [errLocation] = useLocation(navigation.isFocused());
  const [errUpdatePostos, postosDidSet] = useUpdatePostos();

  return (
    <SafeAreaView style={styles.container}>
      <Paragraph>OI</Paragraph>
      {currentLocation ? (
        <>
          {console.log('passei')}
          <Map style={styles.backgroundMap} />
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundMap: {
    height: height,
    width: width,
  },
  surfaceButton: {
    position: 'absolute',
    bottom: 30,
    left: 100,
    elevation: 3,
    zIndex: 3,
  },
  surface: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
});
export default HomeScreen;
