import React from 'react';
import {Text, View,navigator,StatusBar } from 'react-native';
import { Globalstyles } from '../../style/Global';


export default function PSInformation({navigation}) {
  return(
    <View style ={(Globalstyles.container)}>
    <StatusBar
    //barStyle="light-content"
    //backgroundColor = "#3498db"
    hidden={true}
    />
    <Text style ={(Globalstyles.text)}> 個人資訊</Text>
    </View>
  )
}