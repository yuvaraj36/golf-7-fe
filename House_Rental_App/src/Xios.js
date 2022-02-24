import {View, Text} from 'react-native';
import React from 'react';
import axios from 'axios';

const Xios = () => {
  axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
    console.log(res);
  });
  return (
    <View>
      <Text>Xios</Text>
    </View>
  );
};

export default Xios;
