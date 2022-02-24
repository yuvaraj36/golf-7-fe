import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const SignupButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.or}>Don't have an account? SignUp</Text>
    </TouchableOpacity>
  );
};

export default SignupButton;

const styles = StyleSheet.create({
  or: {
    padding: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});
