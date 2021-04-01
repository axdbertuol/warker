import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import * as Yup from 'yup';

/**
 * A Yup object containing the Schema required information for signing up
 * @const {Yup.ObjectSchema}
 */
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()

    .min(4, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),
});
const SignupScreen = () => {
  const { state, signup } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        headerText="Sign up for"
        headerTitle="WARKER"
        submitButtonText="Sign up"
        onSubmitForm={signup}
        errorMessage={state.errorMessage}
        schema={SignupSchema}
      />
      <NavLink
        navTo="Signin"
        text="Already a WARKER member? Sign in instead."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 30,
  },
});

export default SignupScreen;
