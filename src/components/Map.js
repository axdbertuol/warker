import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import convert from 'convert-units';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';
import { Context as SearchContext } from '../context/SearchContext';
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
    state: { postos, nearestPostos },
  } = useContext(DataContext);

  const {
    state: { results },
  } = useContext(SearchContext);

  // const [marginBottom, setMarginBottom] = useState(1);

  // const _onMapReady = () => {
  //   isReadyRef.current = true;
  //   setMarginBottom(0);
  // };
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <MapView
      showsUserLocation
      provider={MapView.PROVIDER_GOOGLE}
      ref={(curr) => (mapRef.current = curr)}
      loadingEnabled={true}
      style={{ height: height, width: width }}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      }}
      showsMyLocationButton={true}
      toolbarEnabled={false}
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
      {/* {nearestPostos?.length > 0 &&
        nearestPostos.map((result, index) => {
          return (
            <Marker
              key={index}
              coordinate={result.coords}
              pinColor={Colors.grey800}
              opacity={0.3}
              title={result.nome}
            />
          );
        })} */}
      {destination ? (
        <>
          <Marker coordinate={destination.coords} pinColor={Colors.greenA100} />
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
