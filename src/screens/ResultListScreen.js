import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostosList from '../components/PostosList';

/**
 * This screen will show the results of search results.
 *
 */
const ResultListScreen = () => {
  return (
    <View style={styles.container}>
      <PostosList />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default ResultListScreen;
