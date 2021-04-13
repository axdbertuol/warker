import React from 'react';
import { render, fireEvent } from '../jest/test-utils';
import NavLink from '../src/components/NavLink';
import { useNavigation } from '@react-navigation/native';

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
describe('<NavLink />', () => {
  it('displays the passed-in text', () => {
    const { queryByText } = render(<NavLink navTo="" text="Teste" />);
    expect(queryByText('Teste')).not.toBeNull();
  });
  it('navigates to the passed-in route', () => {
    const mockNavigate = jest.fn();
    useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));
    const { queryByText } = render(<NavLink navTo="Home" text="Teste" />);
    expect(queryByText('Teste')).not.toBeNull();
    fireEvent.press(queryByText('Teste'));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
