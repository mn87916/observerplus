import React from 'react';
import {Text, View,navigator } from 'react-native';
import { Globalstyles } from '../../style/Global';


export default function AccManage({navigation}) {
  return(
    <View style ={(Globalstyles.container)}>
    <Text style ={(Globalstyles.text)}> 帳號管理 </Text>
    </View>
  )
}