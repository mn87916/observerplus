import React, { useState , Component } from 'react';
import { BarStyle,ActivityIndicator,StyleSheet,ScrollView, FlatList,Text, View ,ImageBackground,TouchableOpacity,Image,navigator} from 'react-native';
import { AnnounceStyles } from '../Announce/AnnounceStyles';
import '../../data/GlobalVariable.js';


export default class Announce extends React.Component {

constructor(props) 
        {
        super(props);   
        this.state = {
           Announment:[],
           isLoading:true,
           announce:true,
        }   
      }

componentDidMount()
{
  

  var queryURL = 'https://observerplus.club/API/Announce.aspx';
  let parameters = new FormData();
        parameters.append("account", global.GlobalVariable.account);
        parameters.append("password", global.GlobalVariable.password);

  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      if(responseData.length == 0){
        this.setState({isLoading:false})
        this.setState({announce:false})
      }
      else{
      for (var i = 0; i < responseData.length; i++) {
      this.state.Announment.push(responseData[i])
      this.setState({isLoading:false})
        }
      }     
      this.forceUpdate();
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
   
}

  render() {
  if(this.state.isLoading && this.state.announce){
        return(
          <ImageBackground source = {require('../..//images/login_background.png')} style = {AnnounceStyles.login_image}>
          <View style ={AnnounceStyles.container}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
  else if(this.state.isLoading == false && this.state.announce){
   return(
    <ImageBackground source={require('../../images/announcement_background.png')} style = {AnnounceStyles.container}>      
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("Main")} style = {AnnounceStyles.backbutton}>
      <Image source={require('../../images/retune.png')} style = {AnnounceStyles.imagesize}>
      </Image>
      </TouchableOpacity>     
      <View style ={(AnnounceStyles.AnnounceCard)}>
      <FlatList data = {this.state.Announment} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>       
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("Article",item)} style ={(AnnounceStyles.toptext)}>
            <Text style ={(AnnounceStyles.AnnounTitle)}>{item.AnnounTitle}</Text>
            <Text style ={(AnnounceStyles.AnnounDate)}>{item.AnnounDate}</Text>
            <Text style ={(AnnounceStyles.AnnounContent)}>{item.AnnounContent.substring(0,15)+"......"}</Text>
          </TouchableOpacity>        
        </ScrollView>
        );
      }}
      />
      </View> 
    </ImageBackground>
   );
  }
  else if(this.state.isLoading == false && this.state.announce == false){
    return(
    <ImageBackground source={require('../../images/announcement_background.png')} style = {AnnounceStyles.container}>      
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("Main")} style = {AnnounceStyles.backbutton}>
      <Image source={require('../../images/retune.png')} style = {AnnounceStyles.imagesize}>
      </Image>
      </TouchableOpacity>   
      <View style ={(AnnounceStyles.AnnounceCard2)}>
      <Text style ={(AnnounceStyles.AnnounTitle2)}>現在沒有公告喔~!</Text>
      </View>
     </ImageBackground> 
    );
  }
 }
} 


