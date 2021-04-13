import React from 'react';
import { render, fireEvent } from '../jest/test-utils';
import AuthForm from '../src/components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.useFakeTimers();
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: jest.fn(),
}));
describe('<AuthForm />', () => {
  it('renders correctly', () => {
    const rendered = render(
      <AuthForm headerText="HelloHeader" submitButtonText="HelloSubmit" />
    );
    expect(rendered.toJSON()).toBeTruthy();
  });
});
