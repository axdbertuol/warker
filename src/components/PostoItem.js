import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Surface, Caption } from 'react-native-paper';

// import usePhotos from '../hooks/usePhotos';
// import { useNavigation } from '@react-navigation/native';

const PostoItem = ({ posto, horizontal }) => {
  // const [image, errorMessage] = usePhotos(posto?.photo_reference, 400);
  // const navigation = useNavigation();

  return (
    <Surface style={horizontal ? styles.surface : styles.surfaceVertical}>
      <TouchableOpacity
      // onPress={() => navigation.navigate('ResultDetail', { posto })}
      >
        {!!posto.photo_url && (
          <Image
            source={{
              uri: posto.photo_url,
            }}
            style={horizontal ? styles.image : styles.imageVertical}
          ></Image>
        )}
        <View style={styles.overlay}>
          <Caption style={[styles.caption, { fontWeight: 'bold' }]}>
            {posto.nome.length >= 20
              ? posto.nome.substring(0, 20) + '...'
              : posto.nome}
          </Caption>
          <Caption style={styles.caption}>
            Reservatório: {posto.reservatorio}%
          </Caption>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};
const styles = StyleSheet.create({
  surface: {
    marginRight: 5,
    height: 200,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
  },
  surfaceVertical: {
    // marginRight: 5,
    height: 200,
    width: '100%',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
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
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  caption: {
    textAlign: 'center',
    fontSize: 8,
  },
});
export default PostoItem;
