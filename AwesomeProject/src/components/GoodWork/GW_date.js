import React ,{ useState , Component } from 'react';
import {Text, View,navigator,ImageBackground,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native';
import { Globalstyles } from '../../style/Global';
import { GWStyles } from '../GoodWork/GWstyle';


export default class GW_date extends React.Component {
  render() {
    return(
      <ImageBackground source={require('../../images/GoodWork_background.png')} style = {GWStyles.container}>
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("GoodWork")} style = {GWStyles.back}>
        <Image source={require('../../images/retune.png')} style = {GWStyles.imagesize}>
        </Image>
        </TouchableOpacity>   
        <View style ={(GWStyles.AnnounceCard)}>
        <ScrollView>       
            <Text style ={(GWStyles.AnnounTitle2)}>高亞丞</Text>
          <View style ={(GWStyles.toptext2)}>
            <Text style ={(GWStyles.AnnounTitle2)}>2020/08/11 第5天</Text>
            <Text style ={(GWStyles.AnnounContent)}>當日心得:</Text>
            <Text style ={(GWStyles.AnnounContent)}>今天看照片看得很爽</Text>
            <View style = {GWStyles.CardBox2}>
            <Image source={require('../../images/test123.jpg')} style = {GWStyles.image}>
            </Image>
            </View>
            <Text style ={(GWStyles.AnnounContent)}>老師評語:</Text>
            <Text style ={(GWStyles.AnnounContent)}>胡晴雅拿著水果刀很火</Text>
          </View> 
        </ScrollView>
      </View> 
      </ImageBackground>
    )
  }
}