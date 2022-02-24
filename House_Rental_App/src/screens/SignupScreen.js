import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik, Field} from 'formik';
const baseUrl = 'http://392c-223-235-218-80.ngrok.io/user/registration';
import * as yup from 'yup';
const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()

    .required('First name is required'),
  phoneNumber: yup
    .string()

    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  pass: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const SignupScreen = () => {
  const registerHandle = async (
    firstName,
    lastName,
    email,
    pass,
    phoneNumber,
  ) => {
    const response = await axios.post(`${baseUrl}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
      password: pass,
    });
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          pass: '',
          referal: '',
        }}
        onSubmit={values => {
          registerHandle(
            values.firstName,
            values.lastName,
            values.email,
            values.pass,
            values.phoneNumber,
          );
        }}>
        {({handleSubmit, isValid}) => (
          <>
            <Field
              component={CustomInput}
              name="firstName"
              placeholder="First Name *"
              placeholderTextColor="gray"
            />
            <Field
              component={CustomInput}
              name="lastName"
              placeholder="Last Name"
              placeholderTextColor="gray"
            />
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email *"
              placeholderTextColor="gray"
              keyboardType="email-address"
            />

            <Field
              component={CustomInput}
              name="pass"
              placeholderTextColor="gray"
              placeholder="Password *"
            />

            <Field
              component={CustomInput}
              name="phoneNumber"
              placeholder="Phone Number *"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />

            <Field
              component={CustomInput}
              name="referal"
              placeholder="Referal Code  "
              placeholderTextColor="gray"
              secureTextEntry
            />

            <CustomButton name="SignUp" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
export default SignupScreen;
