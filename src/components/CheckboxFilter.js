import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Checkbox } from 'react-native-paper';

import { Context as SearchContext } from '../context/SearchContext';

const CheckboxFilter = ({ filter, text }) => {
  const {
    state: { filters, results },
    addFilter,
    removeFilter,
  } = useContext(SearchContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      addFilter(filter);
      console.log('Added filter: ', filter);
    } else {
      removeFilter(filter);
      console.log('Removed filter: ', filter);
    }
  }, [checked]);

  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <Paragraph style={styles.text}>{text}</Paragraph>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // padding: 5,
  },
  text: {
    paddingTop: 5,
  },
});

export default CheckboxFilter;
