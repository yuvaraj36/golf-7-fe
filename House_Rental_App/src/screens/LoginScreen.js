import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import Logo from '../../assets/images/Logo_1.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import SignupButton from '../components/SignupButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const baseUrl = 'http://392c-223-235-218-80.ngrok.io/signin';

import {Formik, Field} from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  pass: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = () => {
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const registerHandle = async (email, pass) => {
    try {
      const response = await axios.post(`${baseUrl}`, {
        email: email,
        password: pass,
      });
      console.log(response.data.token);
      if (response.status === 200) {
        AsyncStorage.setItem('token', response.data.token);

        navigation.navigate('HomeScreen');
      }
    } catch (e) {
      alert('Email or Password is invalid');
      console.log(e);
    }
  };
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          pass: '',
        }}
        onSubmit={values => {
          registerHandle(values.email, values.pass);
        }}>
        {({handleSubmit, isValid}) => (
          <>
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
            />

            <Field
              component={CustomInput}
              name="pass"
              placeholderTextColor="gray"
              placeholder="Password"
            />
            <CustomButton name="SignIn" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Text style={styles.or}>or</Text>
      <SocialButton />

      <SignupButton onPress={onSignUpPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
  or: {
    padding: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignItems: 'flex-start',
  },
});

export default LoginScreen;
