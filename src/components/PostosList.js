import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { Context as SearchContext } from '../context/SearchContext';
import { Subheading } from 'react-native-paper';

import PostoItem from './PostoItem';

/**
 * PostosList is a list of PostoItem. It can be made horizontal if needed.
 *
 */
const PostosList = ({ horizontal = false }) => {
  const {
    state: { results, query },
  } = useContext(SearchContext);

  const onRenderItem = ({ item }) => (
    <PostoItem posto={item} horizontal={horizontal} />
  );

  return (
    <>
      <Subheading style={{ textAlign: 'center' }}>
        Sua busca{query && ` por "${query}"`}:
      </Subheading>
      <FlatList
        horizontal={horizontal}
        data={results}
        initialNumToRender={5}
        updateCellsBatchingPeriod={100}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(posto) => Date.now() + '-' + posto._id}
        renderItem={onRenderItem}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </>
  );
};

export default PostosList;
