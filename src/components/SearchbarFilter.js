import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Context as SearchContext } from '../context/SearchContext';
import useSearchPostos from '../hooks/useSearchPostos';

/**
 * @desc
 * A Searchbar with a Filter button on the right side that leads to
 * the FilterScreen.
 */

const SearchbarFilter = () => {
  const {
    state: { query },
    setQuery,
    setDidSearch,
  } = useContext(SearchContext);

  const navigation = useNavigation();

  // useEffect hook
  useSearchPostos();

  return (
    <View style={styles.container}>
      <Searchbar
        icon={'filter-variant'}
        inputStyle={{ fontSize: 12 }}
        placeholder="Procure pelo nome do posto"
        value={query}
        onChangeText={(q) => setQuery(q)}
        onIconPress={() => navigation.navigate('Filtros')}
        returnKeyType="search"
        onSubmitEditing={({ nativeEvent: { text } }) => {
          if (text) {
            setDidSearch(true);
            navigation.navigate('ResultList');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
    zIndex: 3,
  },
});
export default SearchbarFilter;
