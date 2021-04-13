import React, { useState } from 'react';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
import {
  TextInput,
  Button,
  Title,
  Paragraph,
  Headline,
  Caption,
  HelperText,
} from 'react-native-paper';

/**
 * Displays an authentication form with two fields: email and password.
 * @param {string} headerText - The header text
 * @param {string} submitButtonText - The submit button text
 * @param {function} onSubmitForm - A callback function to be called when form is submitted
 * @param {errorMessage} errorMessage - The error message from the callback
 * @param {Yup.ObjectSchema} schema - The schema object from Yup
 * @param {string} headerTitle - The header title
 */

const AuthForm = ({
  headerText,
  submitButtonText,
  onSubmitForm,
  errorMessage,
  schema,
  headerTitle,
}) => {
  const onSubmit = (values) => onSubmitForm(values);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <Spacer margin={15}>
            {!!headerText && (
              <>
                <Headline style={{ textAlign: 'center' }}>
                  {headerText}
                </Headline>
                <Title style={{ textAlign: 'center' }}>{headerTitle}</Title>
              </>
            )}
            <Spacer margin={20} />
            <TextInput
              testID="email-input"
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.email && touched.email}
            ></TextInput>

            <HelperText type="error" visible={!!errors.email && touched.email}>
              *{errors.email}
            </HelperText>
            <TextInput
              testID="pass-input"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              error={!!errors.password}
            />

            <HelperText
              type="error"
              visible={!!errors.password && touched.password}
            >
              *{errors.password}
            </HelperText>

            {!!errorMessage && (
              <Caption style={styles.errorMessage}>{errorMessage}</Caption>
            )}
          </Spacer>
          <Button testID="submit-button" onPress={handleSubmit}>
            {submitButtonText}
          </Button>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
