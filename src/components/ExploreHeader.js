import * as React from 'react';
import { Appbar } from 'react-native-paper';

const ExploreHeader = ({
  title,
  subtitle = '',
  backButton,
  filter,
  navigation,
}) => {
  const _goBack = () => navigation.goBack();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      {backButton && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {filter && (
        <Appbar.Action
          icon="filter-variant"
          onPress={() => navigation.navigate('Filtros')}
        />
      )}
    </Appbar.Header>
  );
};

export default ExploreHeader;
