import React from 'react';
import Spacer from './Spacer';
import { Paragraph, IconButton, Colors } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * A Favourite button to add something to favourites list.
 */
const Favourite = () => {
  return (
    <View style={styles.container}>
      <IconButton icon={'heart'} size={15} color={Colors.deepOrangeA700} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Favourite;
