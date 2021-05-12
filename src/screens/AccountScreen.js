import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { ActivityIndicator, Button } from 'react-native-paper';
import { SettingsRow, SettingsRowItem } from '../components/SettingsRow';

/**
 * A blank screen that will try to log in user with token
 */
const AccountScreen = ({ theme }) => {
  const {
    state: { user },
    setUser,
    signout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setUser();
    }
  }, []);
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <SettingsRow>
            <SettingsRowItem
              icon="account"
              description="ID:"
              content={user._id}
              editable={false}
            />
          </SettingsRow>
          <SettingsRow>
            <SettingsRowItem
              icon="email"
              description="Seu email:"
              content={user.email}
              editable={true}
            />
          </SettingsRow>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
      <Button onPress={signout} mode={'contained'}>
        Signout
      </Button>
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
