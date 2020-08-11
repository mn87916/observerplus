import React ,{ useState , Component } from 'react';
import {Text, View,navigator,ImageBackground,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native';
import { Globalstyles } from '../../style/Global';
import { GWStyles } from '../GoodWork/GWstyle';


export default class GoodWork extends React.Component {
  render() {
    return(
      <ImageBackground source={require('../../images/GoodWork_background.png')} style = {GWStyles.container}>
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("Main")} style = {GWStyles.back}>
        <Image source={require('../../images/retune.png')} style = {GWStyles.imagesize}>
        </Image>
        </TouchableOpacity>   
        <View style ={(GWStyles.AnnounceCard)}>
        <ScrollView>       
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("GW_date")} style ={(GWStyles.toptext)}>
            <Text style ={(GWStyles.AnnounTitle)}>高亞丞 2020/08/10</Text>
            <View style = {GWStyles.CardBox}>
            <Image source={require('../../images/test123.jpg')} style = {GWStyles.image}>
            </Image>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("GW_date")} style ={(GWStyles.toptext)}>
            <Text style ={(GWStyles.AnnounTitle)}>高亞丞 2020/08/11</Text>
            <View style = {GWStyles.CardBox}>
            <Image source={require('../../images/test123.jpg')} style = {GWStyles.image}>
            </Image>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("GW_date")} style ={(GWStyles.toptext)}>
            <Text style ={(GWStyles.AnnounTitle)}>高亞丞 2020/08/12</Text>
            <View style = {GWStyles.CardBox}>
            <Image source={require('../../images/test123.jpg')} style = {GWStyles.image}>
            </Image>
            </View>
          </TouchableOpacity>  
        </ScrollView>
      </View> 
      </ImageBackground>
    )
  }
}