import React from 'react';
import { View } from 'react-native';
/**
 * A component that wraps some content with a given margin
 *
 * @param {} children - The components to be wrapped in
 * @param {number} margin - The margin
 */
const Spacer = ({ children, margin }) => {
  return <View style={{ margin: margin }}>{children}</View>;
};

export default Spacer;
