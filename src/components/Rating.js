import React from 'react';
import { Paragraph, IconButton, Colors } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

/**
 * A Rating with a star Icon component.
 *
 * @param {string || number} rating - The rating number
 */
const Rating = ({ rating }) => {
  return (
    <View style={styles.container}>
      <IconButton icon={'star'} size={10} color={Colors.yellowA700} />
      <Paragraph style={styles.text}>{rating}(70+)</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default Rating;
