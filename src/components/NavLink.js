import React from 'react';
import Spacer from './Spacer';
import { Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * A navigation link component.
 *
 * @param {string} navTo - The name of the navigation link
 * @param {string} text - The navigation link text
 */
const NavLink = ({ navTo, text }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navTo)}>
      <Spacer margin={15}>
        <Paragraph style={styles.link}>{text}</Paragraph>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default NavLink;
