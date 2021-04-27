import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Searchbar,
  ActivityIndicator,
  IconButton,
  Colors,
  Surface,
  Button,
} from 'react-native-paper';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as SearchContext } from '../context/SearchContext';
import { Context as DataContext } from '../context/DataContext';
import useLocation from '../hooks/useLocation';
import useUpdatePostos from '../hooks/useUpdatePostos';
import Map from '../components/Map';
import SearchbarFilter from '../components/SearchbarFilter';
import PostoSmallDetail from '../components/PostoSmallDetail';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // CONTEXTS
  const {
    state: { currentLocation, destination },
    setLocation,
    setDestination,
  } = useContext(LocationContext);
  const {
    state: { query, results },
    setQuery,
  } = useContext(SearchContext);

  const {
    state: { postos, nearestPostos },
  } = useContext(DataContext);

  // LOCAL STATE
  const [estouComSede, setEstouComSede] = useState(false);

  // HOOKS with useEffect
  const [errLocation] = useLocation(navigation.isFocused());
  const [errUpdatePostos, postosDidSet] = useUpdatePostos();

  useEffect(() => {
    if (estouComSede && !!nearestPostos) {
      setDestination({
        ...destination,
        coords: {
          latitude: nearestPostos[0].coords.latitude,
          longitude: nearestPostos[0].coords.longitude,
        },
      });
    }
  }, [estouComSede]);

  return (
    <View style={styles.container}>
      {currentLocation && !!postos && !!nearestPostos ? (
        <>
          <Map style={styles.backgroundMap} />
          <SearchbarFilter />

          {!!destination && !!nearestPostos && estouComSede && (
            <Surface style={styles.surface}>
              <TouchableOpacity>
                <PostoSmallDetail
                  posto={nearestPostos[0]}
                  setEstouComSede={setEstouComSede}
                />
              </TouchableOpacity>
            </Surface>
          )}

          {!estouComSede && (
            <Surface style={styles.surfaceButton}>
              <Button
                // disabled={!currentLocation}
                loading={!currentLocation}
                onPress={() => setEstouComSede(!estouComSede)}
                mode={'contained'}
              >
                Estou com sede!
              </Button>
            </Surface>
          )}
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    position: 'absolute',
    top: 30,
    width: '90%',
    alignSelf: 'center',
    // paddingTop: 40,
    elevation: 3,
    zIndex: 3,
  },
  iconButton: {
    position: 'absolute',
    top: 140,
    right: 15,
    zIndex: 4,
    backgroundColor: Colors.grey200,
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
