/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import { Surface, IconButton, Caption } from 'react-native-paper';

import { Context as LocationContext } from '../context/LocationContext';
import SmallCard from './SmallCard';

const { width, height } = Dimensions.get('window');

/**
 *
 * Displays a window with information about the Posto.
 *
 * @param {Object} posto - The posto object to be displayed
 * @param {Boolean} setEstouComSede - The setter to the estouComSede property from HomeScreen
 */
const PostoSmallDetail = ({ posto, setEstouComSede }) => {
  const {
    state: { destination },
    resetDestination,
  } = useContext(LocationContext);

  return (
    <Surface style={styles.surface}>
      <TouchableOpacity>
        <SmallCard
          imageSrc={{ uri: posto?.photo_url }}
          rating={posto.rating}
          resetDestination={resetDestination}
          title={posto.nome}
          setEstouComSede={setEstouComSede}
        >
          <View style={styles.smallInfo}>
            <IconButton icon="alarm" size={15} />
            <Caption>
              {Math.round(destination.duration?.val)}{' '}
              {destination.duration?.unit}
            </Caption>
          </View>
          <View style={styles.smallInfo}>
            <IconButton icon="car-convertible" size={15} />
            <Caption>
              {destination.distance?.val} {destination.distance?.unit}
            </Caption>
          </View>
          <View style={styles.smallInfo}>
            <IconButton icon="tanker-truck" size={15} />
            <Caption>{posto.reservatorio}%</Caption>
          </View>
        </SmallCard>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },

  closeWindow: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 5,
  },
  smallInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostoSmallDetail;
