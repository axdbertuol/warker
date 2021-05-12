import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title, subtitle = '', backButton, drawer, navigation }) => {
  const _goBack = () => navigation.goBack();

  return (
    <Appbar.Header>
      {backButton && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {drawer && (
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      )}
    </Appbar.Header>
  );
};

export default Header;
