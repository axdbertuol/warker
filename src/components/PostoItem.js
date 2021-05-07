import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Surface, Caption, Paragraph, IconButton } from 'react-native-paper';

import SmallCard from './SmallCard';
import FuelChip from './FuelChip';
// import usePhotos from '../hooks/usePhotos';
// import { useNavigation } from '@react-navigation/native';

/**
 *
 * @desc An Item that displays information about the Posto. It is used with @function PostosList.
 * @param {Object} posto - The posto to display
 * @param {Boolean} horizontal - Change to horizontal mode
 */
const PostoItem = ({ posto, horizontal }) => {
  // const navigation = useNavigation();

  return (
    <Surface style={horizontal ? styles.surface : styles.surfaceVertical}>
      <TouchableOpacity
      // onPress={() => navigation.navigate('ResultDetail', { posto })}
      >
        <SmallCard
          imageSrc={{ uri: posto?.photo_url }}
          containerStyle={{ width: '100%' }}
          rating={posto.rating}
          title={posto.nome}
          withCloseButton={false}
          contentContainerStyle={{ flexDirection: 'column' }}
        >
          <View style={styles.smallInfo}>
            <IconButton icon="tanker-truck" size={15} />
            <Caption>Reservatório: {posto.reservatorio}%</Caption>
          </View>
          <View style={[styles.smallInfo, { marginBottom: 10 }]}>
            <FuelChip posto={posto} fuel={'Diesel'} />
            <FuelChip posto={posto} fuel={'GNV'} />
            <FuelChip posto={posto} fuel={'Etanol'} />
          </View>
        </SmallCard>
      </TouchableOpacity>
    </Surface>
  );
};
const styles = StyleSheet.create({
  surface: {
    // marginRight: 5,
    // height: 200,
    // width: 150,
    // alignItems: 'center',
    // backgroundColor: 'transparent',
    // borderRadius: 10,
    // overflow: 'hidden',
  },
  surfaceVertical: {
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: 150,
    // elevation: 5,
    // height: 80,
    maxHeight: 80,
  },
  imageVertical: {
    height: 100,
    maxHeight: 100,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  caption: {
    textAlign: 'center',
    fontSize: 8,
  },
  smallInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PostoItem;
