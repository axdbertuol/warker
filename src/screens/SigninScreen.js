import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import * as Yup from 'yup';

/**
 * A Yup object containing the Schema required information for signing in
 * @const {Yup.ObjectSchema}
 */
const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()

    .min(4, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),
});

/**
 * A screen to the Sign in form
 */
const SigninScreen = () => {
  const { state, signin } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        headerText="Sign in for"
        headerTitle="WARKER"
        submitButtonText="Sign in"
        onSubmitForm={signin}
        errorMessage={state.errorMessage}
        schema={SigninSchema}
      />
      <NavLink navTo="Signup" text="Not a WARKER member? Sign up now!" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default SigninScreen;
