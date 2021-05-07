/* eslint-disable react/prop-types */
import React, { useContext, useCallback, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Caption,
  ActivityIndicator,
} from 'react-native-paper';
// import { Context as ModalContext } from '../context/ModalContext';
import { Context as LocationContext } from '../context/LocationContext';
import { mapRef, isReadyRef } from '../mapRef';
import convert from 'convert-units';
import Spacer from './Spacer';

const { width, height } = Dimensions.get('window');

const PostoDetail = ({ posto }) => {
  const {
    state: { modal },
    handleModal,
    setModalContent,
  } = useContext(ModalContext);
  const {
    state: { currentLocation, destination },
    addDestination,
    setDuration,
    setDistance,
  } = useContext(LocationContext);

  if (!destination) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <>
      <Card style={styles.container}>
        <Card.Title
          title={posto.nome}
          subtitle={`Reservatório: ${posto.reservatorio}%`}
        />
        <Card.Cover style={styles.image} source={{ uri: posto.photo_url }} />
        <Spacer margin={5} />
        <Divider />
        <Spacer margin={5} />
        <Card.Content></Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 10,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    borderRadius: 4,
    height: 150,
  },
  card: {
    paddingTop: 20,
  },
});

export default PostoDetail;
