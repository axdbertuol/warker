import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Searchbar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Context as SearchContext } from '../context/SearchContext';

const SearchbarFilter = () => {
  const {
    state: { query, results },
    setQuery,
  } = useContext(SearchContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <IconButton icon={'filter-variant'} size={20} style={styles.filter} /> */}
      <Searchbar
        icon={'menu'}
        //   icon={'filter-variant'}
        inputStyle={{ fontSize: 12 }}
        placeholder="Procure pelo nome do posto"
        value={query}
        onChangeText={(q) => setQuery(q)}
        onIconPress={() => navigation.toggleDrawer()}
        returnKeyType="search"
        onSubmitEditing={({ nativeEvent: { text } }) => {
          //   if (text) {
          //     navigation.navigate('ResultListNavigator', {
          //       screen: 'ResultList',
          //       params: { searchFromHome: true },
          //     });
          //   }
        }}
      />
    </View>
  );
};

SearchbarFilter.propTypes = {};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    width: '90%',
    alignSelf: 'center',
    // paddingTop: 40,
    elevation: 3,
    zIndex: 3,
  },
  //   filter: {
  //     position: 'absolute',
  //     top: 30,
  //     right: 50,
  //     zIndex: 4,

  //   },
});
export default SearchbarFilter;
