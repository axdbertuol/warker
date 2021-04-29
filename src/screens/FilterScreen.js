import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Divider,
  Paragraph,
  Searchbar,
  Caption,
  Button,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';

import { Context as SearchContext } from '../context/SearchContext';
import CheckboxFilter from '../components/CheckboxFilter';
import Spacer from '../components/Spacer';
import useSearchPostos from '../hooks/useSearchPostos';
/**
 * This screen will show the filters available for searching postos.
 *
 */
const FilterScreen = ({ navigation }) => {
  // const [didClick, setDidClick] = useState(false);
  const {
    state: { filters, results, radius, query },
    setRadius,
    setDidSearch,
    setQuery,
  } = useContext(SearchContext);
  // useEffect(() => {
  //   console.log('Filters ', filters);
  //   console.log('Radius ', radius);
  // }, [filters]);
  useSearchPostos();

  return (
    <View style={styles.container}>
      <Paragraph>Pesquise por posto</Paragraph>
      <Searchbar
        placeholder="Pesquisar"
        style={{ height: 30 }}
        onChangeText={(q) => setQuery(q)}
        value={query}
      />
      <Divider />
      <Spacer margin={5} />
      <Paragraph>Combustível</Paragraph>
      <CheckboxFilter filter={'diesel'} text={'Diesel'} />
      <CheckboxFilter filter={'gnv'} text={'GNV'} />
      <CheckboxFilter filter={'etanol'} text={'Etanol'} />
      <Spacer margin={5} />
      <Divider />
      <Spacer margin={5} />
      <Paragraph>Nível do Reservatório</Paragraph>
      <CheckboxFilter filter={'res_baixo'} text={'Última gota'} />
      <CheckboxFilter filter={'res_medio'} text={'Duas últimas gotas'} />
      <CheckboxFilter filter={'res_cheio'} text={'Reservatório cheio'} />
      <Spacer margin={5} />
      <Divider />
      <Spacer margin={5} />
      <Paragraph>Distância da minha localização</Paragraph>
      <View style={styles.sliderTextContainer}>
        <Caption>0km</Caption>
        <Caption>15km</Caption>
      </View>
      <Slider
        style={{ width: 300, height: 20 }}
        minimumValue={0}
        maximumValue={15}
        value={radius}
        // onValueChange={(value) => setDistance(value)}
        // onSlidingStart={(value) => removeFilter('dist_' + value)}
        onSlidingComplete={(value) => setRadius(value)}
        step={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#FFFFFF"
      />
      <Caption>{radius}km</Caption>
      <Spacer margin={5} />

      <Button
        mode="contained"
        onPress={() => {
          // search and store in results
          // setDidClick(true);
          setDidSearch(true);
          // console.log('Results:', results);
          // navigation.navigate('ResultsFlow');
        }}
      >
        Ver Resultados
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sliderTextContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
  },
});
export default FilterScreen;
