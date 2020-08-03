import React from 'react';
import {Text, View,navigator } from 'react-native';
import { Globalstyles } from '../../style/Global';


export default function LearningFile({navigation}) {
  return(
    <View style ={(Globalstyles.container)}>
    <Text style ={(Globalstyles.text)}> 學習檔案 </Text>
    </View>
  )
}