import React, { useContext, useCallback } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import convert from 'convert-units';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';
import { GOOGLE_MAPS_KEY } from '../utils/constants';
import { mapRef, isReadyRef } from '../mapRef';
const { width, height } = Dimensions.get('window');

/**
 * A map view that can draw directions to the destination
 * contained in LocationContext. It also shows all Postos
 * in the map with a black circle.
 * @param {Object} style - A StyleSheet property for the map
 */
const Map = ({ style }) => {
  const {
    state: { currentLocation, destination },
    setDuration,
    setDistance,
  } = useContext(LocationContext);

  const {
    state: { postos },
  } = useContext(DataContext);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <MapView
      ref={(curr) => (mapRef.current = curr)}
      loadingEnabled={true}
      style={style}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158, 255, 0.3)"
      />
      {postos?.length > 0 &&
        postos.map((posto, index) => {
          // console.log('posto em Map', posto);
          return (
            <Circle
              key={index}
              center={posto.coords}
              radius={20}
              strokeColor="rgba(0,0,0,1.0)"
              fillColor="rgba(0,0, 0, 0.3)"
            />
          );
        })}
      {destination ? (
        <>
          <Marker coordinate={destination.coords} />
          <MapViewDirections
            origin={currentLocation.coords}
            destination={{ ...destination.coords }}
            apikey={GOOGLE_MAPS_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={(result) => {
              let distance = convert(result.distance).from('km').toBest();
              let duration = convert(result.duration).from('min').toBest();
              distance.val =
                distance % 1 != 0 ? distance.val.toFixed(1) : distance.val;
              // duration = duration % 1 != 0 ? duration.toFixed(1) : duration;
              setDuration(duration);
              setDistance(distance);

              isReadyRef.current = true;
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height + 20,
                  left: width / 20,
                  top: height / 20,
                },
                animated: true,
              });
            }}
            onError={(errorMessage) => {
              console.log('MapViewDirections ERROR >> ', errorMessage);
            }}
          />
        </>
      ) : null}
    </MapView>
  );
};

export default Map;
