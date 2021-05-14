import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';

import { ActivityIndicator, Colors, Surface, Button } from 'react-native-paper';
import { Context as LocationContext } from '../context/LocationContext';
// import { Context as SearchContext } from '../context/SearchContext';
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
    setDestination,
  } = useContext(LocationContext);

  const {
    state: { postos, nearestPostos },
  } = useContext(DataContext);

  // LOCAL STATE
  const [estouComSede, setEstouComSede] = useState(false);

  // HOOKS with useEffect
  // TODO: make
  const [errLocation] = useLocation(navigation.isFocused());
  useUpdatePostos();

  useEffect(() => {
    if (estouComSede && nearestPostos?.length > 0) {
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
      {currentLocation && postos?.length > 0 && nearestPostos?.length > 0 ? (
        <>
          <Map style={styles.backgroundMap} />
          <SearchbarFilter />

          {!!destination && !!nearestPostos && estouComSede && (
            <PostoSmallDetail
              posto={nearestPostos[0]}
              setEstouComSede={setEstouComSede}
            />
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
        <ActivityIndicator
          animating={true}
          style={{
            position: 'absolute',
            top: height / 2 - 30,
            left: width / 2 - 10,
          }}
        />
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
});
export default HomeScreen;
