import React, {Component} from 'react'; 
import {Text, View,navigator,StatusBar,StyleSheet } from 'react-native';
import { Globalstyles } from '../../style/Global';

export default class PSInformation extends React.Component{
  render(){
  return(
    <ImageBackground source={require('../../images/Track_growth.png')} style = {styles.background}>
    <StatusBar
    //barStyle="light-content"
    //backgroundColor = "#3498db"
    hidden={true}
    />
    <Text style ={(Globalstyles.text)}> 個人資訊</Text>
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({ 
  background: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
});