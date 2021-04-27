/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Card, Divider, Chip, Colors } from 'react-native-paper';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';
import FuelChip from './FuelChip';

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
    <>
      <Card style={styles.container}>
        <Card.Title title={posto.nome} titleStyle={{ fontSize: 11 }} />
        <Card.Cover
          style={styles.image}
          source={{ uri: posto?.photo_url }}
          resizeMode="cover"
        />
        <Spacer margin={5} />
        <Divider />
        <Spacer margin={5} />
        {destination ? (
          <Card.Content
            style={{
              flex: 1,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Chip icon="alarm" mode="outlined" textStyle={styles.description}>
                {Math.round(destination.duration?.val)}{' '}
                {destination.duration?.unit}
              </Chip>
              <Chip
                icon="car-convertible"
                mode="outlined"
                textStyle={styles.description}
              >
                {destination.distance?.val} {destination.distance?.unit}
              </Chip>

              <Chip
                icon="tanker-truck"
                mode="outlined"
                textStyle={styles.description}
              >
                {posto.reservatorio}%
              </Chip>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <FuelChip posto={posto} fuel={'diesel'} />
              <FuelChip posto={posto} fuel={'gnv'} />
              <FuelChip posto={posto} fuel={'etanol'} />
            </View>
          </Card.Content>
        ) : null}
        <Card.Actions style={styles.closeWindow}>
          <Button
            onPress={() => {
              setEstouComSede(false);
              resetDestination();
            }}
          >
            x
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: (2 / 3) * width,
    // height: 200,
  },
  image: {
    borderRadius: 4,
    // resizeMode: "center",
    height: 80,
    // width: 200,
    paddingHorizontal: 5,
  },
  card: {
    // paddingTop: 20,
  },
  closeWindow: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  description: {
    // textAlign: "center",
    // justifyContent: "flex-start",
    fontSize: 10,
  },
});

export default PostoSmallDetail;
