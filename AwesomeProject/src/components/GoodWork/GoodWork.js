import React from 'react';
import {Text, View,navigator } from 'react-native';
import { Globalstyles } from '../../style/Global';


export default function GoodWork({navigation}) {
  return(
    <View style ={(Globalstyles.container)}>
    <Text style ={(Globalstyles.text)}> 優良作品 </Text>
    </View>
  )
}