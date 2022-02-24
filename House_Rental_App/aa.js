import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = () => {
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={values => console.log(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <ScrollView style={styles.container}>
          <View style={styles.logo}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1126/1126012.png',
              }}
              style={styles.ReactLogo}
            />
          </View>
          <Text style={styles.welcome}>Welcome!</Text>

          <TextInput
            name="email"
            placeholder="Email Address"
            style={(styles.input, styles.loginContainer)}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            name="password"
            placeholder="Password"
            style={(styles.input, styles.loginContainer)}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            style={styles.submitContainer}
            onPress={handleSubmit}>
            <Text style={(styles.text, styles.button)}>Login</Text>
          </TouchableOpacity>
          <View style={styles.items}>
            <Text style={[styles.link, styles.margin]}>Forgot Password?</Text>
          </View>
          <View style={styles.social}>
            <TouchableOpacity>
              <View style={styles.socialButton}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/145/145802.png',
                  }}
                  style={styles.socialLogo}
                />
                <Text style={styles.text}>Facebook</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/300/300221.png',
                }}
                style={styles.socialLogo}
              />
              <Text style={styles.text}>Google</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sign}>
            Don't have an account?{' '}
            <Text style={[styles.text, styles.link]}>Sign Up</Text>
          </Text>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E4E2',
    paddingHorizontal: 30,
  },
  social: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sign: {
    fontSize: 14,
    color: '#ABB4BD',
    textAlign: 'center',
    marginTop: 24,
  },
  items: {
    alignItems: 'center',
  },
  margin: {
    marginTop: 20,
  },
  button: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  welcome: {
    color: 'black',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontStyle: 'normal',
    color: 'black',
  },
  socialButton: {
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(171, 180, 189, 0.65)',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  ReactLogo: {
    width: 76,
    height: 76,
  },
  link: {
    color: '#FF1654',
    fontSize: 14,
    fontWeight: '500',
  },

  input: {
    paddingVertical: 2,
    color: '#1D2029',
    fontSize: 14,
  },
  submitContainer: {
    backgroundColor: '#FF1654',
    borderRadius: 15,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
  },
  loginContainer: {
    backgroundColor: '#DCDCDC',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
export default LoginScreen;
