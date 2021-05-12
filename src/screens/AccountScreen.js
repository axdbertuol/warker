import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import { SettingsRow, SettingsRowItem } from '../components/SettingsRow';

/**
 * A blank screen that will try to log in user with token
 */
const AccountScreen = ({ theme }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <SettingsRow>
        <SettingsRowItem
          icon="account"
          description="Seu email:"
          content="an email"
          editable={true}
        />
      </SettingsRow>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderTextContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
  },
  smallTxt: {
    fontSize: 9,
  },
});
export default AccountScreen;
