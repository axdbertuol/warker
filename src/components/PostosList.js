import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Context as DataContext } from '../context/DataContext';
import { Subheading, Caption, ActivityIndicator } from 'react-native-paper';

import PostoItem from './PostoItem';

const PostosList = ({
  expandHeight = false,
  title = 'Sua busca:',
  horizontal = false,
  filter,
}) => {
  const {
    state: { searchResults, filteredPostos },
  } = useContext(DataContext);

  const onRenderItem = ({ item }) => (
    <>
      <PostoItem posto={item} horizontal={horizontal} />
    </>
  );

  return (
    <>
      <Subheading style={{ textAlign: 'center' }}>{title}</Subheading>
      <FlatList
        horizontal={horizontal}
        data={filter ? filteredPostos[filter] : searchResults}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(posto) => Date.now() + '-' + posto._id}
        contentContainerStyle={
          horizontal
            ? {}
            : expandHeight
            ? { paddingBottom: 300 }
            : { paddingBottom: 150 }
        }
        renderItem={onRenderItem}
      />
    </>
  );
};

export default PostosList;
