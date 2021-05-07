import React, { useContext, useState } from 'react';
import { Image, Dimensions } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import convert from 'convert-units';

import { Context as LocationContext } from '../context/LocationContext';
import { Context as DataContext } from '../context/DataContext';
import { Context as SearchContext } from '../context/SearchContext';
import { GOOGLE_MAPS_KEY } from '../utils/constants';
import { mapRef, isReadyRef } from '../mapRef';
import mapStyle from './Map.style';

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
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
      showsMyLocationButton={false}
      toolbarEnabled={false}
      zoomEnabled={false}
      customMapStyle={mapStyle}
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
          // if destination is set, then don't draw
          if (posto.coords === destination?.coords) {
            return;
          }
          return (
            <Marker key={index} coordinate={posto.coords}>
              <Image
                source={require('../../assets/icons/map-marker-grey.png')}
                style={{ height: 20, width: 20 }}
              />
            </Marker>
          );
        })}

      {destination ? (
        <>
          <Marker coordinate={destination.coords}>
            <Image
              source={require('../../assets/icons/map-marker-red.png')}
              style={{ height: 20, width: 20 }}
            />
          </Marker>
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
                  top: 70,
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
