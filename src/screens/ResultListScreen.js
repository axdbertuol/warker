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
/**
 * This screen will show the filters available for searching postos.
 *
 */
const ResultListScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(10);
  const {
    state: { filters, results },
    addFilter,
    removeFilter,
  } = useContext(SearchContext);
  useEffect(() => {
    console.log('Filters ', filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      <Paragraph>Pesquise por posto</Paragraph>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sliderTextContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
  },
});
export default ResultListScreen;
