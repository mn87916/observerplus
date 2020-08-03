import React,{Component} from 'react';
import { StyleSheet, Image,Text, View,navigator,ScrollView,ImageBackground,TouchableOpacity } from 'react-native';
import { AnnounceStyles } from '../Announce/AnnounceStyles';

export default class Article extends React.Component {
    render() {
    return(
    <ImageBackground source={require('../../images/article_background.png')} style = {AnnounceStyles.Artbackground}>
    <TouchableOpacity onPress ={() => this.props.navigation.navigate("Announce")} style = {AnnounceStyles.Artback}>
      <Image source={require('../../images/retune.png')} style = {AnnounceStyles.imagesize}>
      </Image>
      </TouchableOpacity>  
    <View style ={(AnnounceStyles.Arttext)}>
    <ScrollView >  
    <Text style ={(AnnounceStyles.ArtTitle)}>{this.props.navigation.getParam('AnnounTitle')}</Text>
    <Text style ={(AnnounceStyles.ArtDate)}>{this.props.navigation.getParam('AnnounDate')}</Text>
    <Text style ={(AnnounceStyles.ArtContent)}>{this.props.navigation.getParam('AnnounContent')}</Text>
    <Text style ={(AnnounceStyles.ArtContent)}>{this.props.navigation.getParam('AnnounContent')}</Text>
    <Text style ={(AnnounceStyles.ArtTitle)}>{this.props.navigation.getParam('key')}</Text>
    </ScrollView>
    </View>
    </ImageBackground>
    )
  }
}

