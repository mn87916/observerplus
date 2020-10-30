import React,{Component} from 'react';
import { StyleSheet, Image,Text, View,navigator,ScrollView,ActivityIndicator,ImageBackground,TouchableOpacity } from 'react-native';
import { AnnounceStyles } from '../Announce/AnnounceStyles';

export default class Article extends React.Component {
  constructor(props) 
        {
        super(props);   
        this.state = {
           isLoading:true,
        }   
      }
      componentDidMount(){
         this.setState({isLoading:false})
         this.forceUpdate();
      }
    render() {
    if(this.state.isLoading){
      return(
          <ImageBackground source = {require('../..//images/login_background.png')} style = {AnnounceStyles.login_image}>
          <View style ={AnnounceStyles.container}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
  else{
    return(
    <ImageBackground source={require('../../images/article_background.png')} style = {AnnounceStyles.Artbackground}>
    <TouchableOpacity onPress ={() => this.props.navigation.navigate("Announce")} style = {AnnounceStyles.backbutton}>
      <Image source={require('../../images/retune.png')} style = {AnnounceStyles.imagesize}>
      </Image>
      </TouchableOpacity>    
    <View style ={(AnnounceStyles.Arttext)}>
    <ScrollView >  
    <Text style ={(AnnounceStyles.ArtTitle)}>{this.props.navigation.getParam('AnnounTitle')}</Text>
    <Text style ={(AnnounceStyles.ArtDate)}>{this.props.navigation.getParam('AnnounDate')}</Text>
    <Text style ={(AnnounceStyles.ArtContent)}>{this.props.navigation.getParam('AnnounContent')}</Text>
    <Text style ={(AnnounceStyles.ArtTitle)}>{this.props.navigation.getParam('key')}</Text>
    </ScrollView>
    </View>
    </ImageBackground>
      )
    }
  }
}

