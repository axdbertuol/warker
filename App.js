import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import FilterScreen from './src/screens/FilterScreen';
// import ResultListScreen from './src/screens/ResultListScreen';
// import ResultDetailScreen from './src/screens/ResultDetailScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as DataProvider } from './src/context/DataContext';
// import { Provider as ModalProvider } from './src/context/ModalContext';
// import { Provider as CidadesProvider } from './src/context/CidadesContext';
import { Provider as SearchProvider } from './src/context/SearchContext';
import { navigationRef, isReadyRef } from './src/navigationRef';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import ExploreHeader from './src/components/ExploreHeader';

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();
const ExplorarStack = createStackNavigator();
const ResultStack = createStackNavigator();

/**
 *
 */
// const ResultsFlow = () => {
//   return (
//     <ResultStack.Navigator>
//       <ResultStack.Screen
//         name="ResultList"
//         component={ResultListScreen}
//         options={{ headerShown: false }}
//       />
//       <ResultStack.Screen name="ResultDetail" component={ResultDetailScreen} />
//     </ResultStack.Navigator>
//   );
// };

const explorarHeader = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <ExploreHeader
      title={title}
      backButton={title === 'Explorar' ? false : true}
      filter={title === 'Explorar' ? true : false}
      navigation={navigation}
    />
  );
};

const ExplorarFlow = () => {
  return (
    <ExplorarStack.Navigator screenOptions={{ header: explorarHeader }}>
      <ExplorarStack.Screen name="Explorar" component={HomeScreen} />
      <ExplorarStack.Screen name="Filtros" component={FilterScreen} />
    </ExplorarStack.Navigator>
  );
};

/**
 * The authentication flow of the app.
 * Should only appear if user is logged out or hasn't signed up
 */
const AuthFlow = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ResolveAuth"
        component={ResolveAuthScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

/**
 * The main flow of the app.
 * Should appear automatically if user is logged in or after signing up.
 */
const MainFlow = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Explorar" component={ExplorarFlow} />
    </Drawer.Navigator>
  );
};

/**
 * The root flow of the app.
 * It redirects to the main or the auth flow if state.token is present or not.
 */
const RootFlow = () => {
  const { state } = useContext(AuthContext);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {state.token != null ? <MainFlow /> : <AuthFlow />}
    </NavigationContainer>
  );
};
/**
 * A composition of local providers
 */
const LocalProviders = ({ children }) => (
  <AuthProvider>
    <LocationProvider>
      <SearchProvider>
        <DataProvider>{children}</DataProvider>
      </SearchProvider>
    </LocationProvider>
  </AuthProvider>
);
/**
 * A composition of third-party providers
 */
const ThirdPartyProviders = ({ children }) => (
  <SafeAreaProvider>
    <PaperProvider>{children}</PaperProvider>
  </SafeAreaProvider>
);

/**
 * The final composition of providers with the root flow
 */
const App = () => (
  <ThirdPartyProviders>
    <LocalProviders>
      <RootFlow />
    </LocalProviders>
  </ThirdPartyProviders>
);

export default App;
