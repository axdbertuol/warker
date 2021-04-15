import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

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
    state: { query },
    setQuery,
  } = useContext(SearchContext);

  const {
    state: { nearestPostos, postos },
  } = useContext(DataContext);

  // LOCAL STATE
  const [estouComSede, setEstouComSede] = useState(false);

  // HOOKS with useEffect
  const [errLocation] = useLocation(navigation.isFocused());
  const [errUpdatePostos, postosDidSet] = useUpdatePostos();

  useEffect(() => {
    if (estouComSede && !!postos) {
      setDestination({
        ...destination,
        coords: {
          latitude: postos[0].coords.latitude,
          longitude: postos[0].coords.longitude,
        },
      });
    }
  }, [estouComSede]);

  return (
    <SafeAreaView style={styles.container}>
      {currentLocation ? (
        <>
          <Map style={styles.backgroundMap} />
          <Searchbar
            icon={'menu'}
            style={styles.searchbar}
            inputStyle={{ fontSize: 12 }}
            placeholder="Procure pelo nome do posto"
            value={query}
            onChangeText={(q) => setQuery(q)}
            onIconPress={() => navigation.toggleDrawer()}
            returnKeyType="search"
            onSubmitEditing={({ nativeEvent: { text } }) => {
              if (text) {
                navigation.navigate('ResultListNavigator', {
                  screen: 'ResultList',
                  params: { searchFromHome: true },
                });
              }
            }}
          />
          <IconButton
            style={styles.iconButton}
            size={22}
            animated={true}
            icon="filter-variant"
            color={Colors.black500}
            // onPress={() => handleModal(true)}
          />

          {!!destination && !!postos && estouComSede && (
            <Surface style={styles.surface}>
              <TouchableOpacity>
                <PostoSmallDetail
                  posto={postos[0]}
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
    </SafeAreaView>
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
    elevation: 3,
    zIndex: 3,
  },
  iconButton: {
    position: 'absolute',
    top: 74,
    left: 15,
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
