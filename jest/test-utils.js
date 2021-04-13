// test-utils.js
import 'react-native-gesture-handler/jestSetup';

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { render } from 'react-native-testing-library';
import {
  // Context as AuthContext,
  Provider as AuthProvider,
} from '../src/context/AuthContext';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const AllTheProviders = ({ children }) => {
  return (
    <PaperProvider>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from 'react-native-testing-library';

// override render method
export { customRender as render };
