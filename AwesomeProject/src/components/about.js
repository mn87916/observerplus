import React from 'react';
import { StyleSheet, Image,Text, View } from 'react-native';
import { Globalstyles } from '../style/Global';

export default function About({navigation}) {
  return(
    <View style = {Globalstyles.container}>
    <Text>{ navigation.getParam('title')}</Text>
    <Text>{ navigation.getParam('body')}</Text>
    <Text>{ navigation.getParam('rating')}</Text>
    </View>
  )
  
}