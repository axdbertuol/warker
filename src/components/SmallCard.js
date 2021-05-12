import React from 'react';
import { Colors, Subheading, IconButton } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Rating from './Rating';
import Favourite from './Favourite';
const { width, height } = Dimensions.get('window');

/**
 * A navigation link component.
 *
 * @param {string} navTo - The name of the navigation link
 * @param {string} text - The navigation link text
 */
const SmallCard = ({
  children,
  imageSrc,
  containerStyle,
  contentContainerStyle,
  rating,
  title,
  resetDestination,
  setEstouComSede,
  withCloseButton = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={imageSrc} style={styles.image} />
      <LinearGradient
        style={[styles.overlay, styles.overlayTop]}
        colors={[Colors.black, 'transparent']}
      >
        <Rating rating={rating} />
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Favourite />
          {withCloseButton && (
            <IconButton
              icon="close"
              size={15}
              style={{ backgroundColor: Colors.white }}
              color={Colors.redA700}
              onPress={() => {
                setEstouComSede(false);
                resetDestination();
              }}
            />
          )}
        </View>
      </LinearGradient>
      <LinearGradient
        style={[styles.overlay, styles.overlayBottom]}
        colors={['transparent', Colors.black]}
      >
        <Subheading style={{ color: Colors.white }}>
          {title.length > 25 ? title.substring(0, 25) : title}
        </Subheading>
      </LinearGradient>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (2 / 3) * width,
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  overlay: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 4,
  },

  overlayTop: {
    justifyContent: 'space-between',
  },
  overlayBottom: {
    justifyContent: 'center',
    top: 80,
  },
  image: {
    height: 100,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default SmallCard;
