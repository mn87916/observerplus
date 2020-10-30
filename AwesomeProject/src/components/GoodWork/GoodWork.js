import React ,{ useState , Component } from 'react';
import {Text, View,navigator,ImageBackground,TouchableOpacity,ActivityIndicator,Image,FlatList,ScrollView } from 'react-native';
import { Globalstyles } from '../../style/Global';
import { GWStyles } from '../GoodWork/GWstyle';


export default class GoodWork extends React.Component {
  constructor(props) 
        {
        super(props);   
        this.state = {
           isLoading:true,
           obj_ID:"",
           GookWord:[],
        }   
      }
  componentDidMount()
  {
    this.state.obj_ID = this.props.navigation.getParam("obj_key");
    console.log(this.state.obj_ID)
      this.forceUpdate();
      var queryURL = 'https://observerplus.club/API/Goodwork_List.aspx';
      let parameters = new FormData();
      parameters.append("obj_ID",this.state.obj_ID);
  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      for (var i = 0 ; i < responseData.length;i++) {
        this.state.GookWord.push(responseData[i])   
        }
        console.log(this.state.GookWord)
      this.setState({isLoading:false})
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }
  render() {
    if(this.state.isLoading){
        return(
          <ImageBackground source = {require('../../images/login_background.png')} style = {GWStyles.login_image}>
          <View style ={GWStyles.container}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
      else{
    return(
      <ImageBackground source={require('../../images/GoodWork_background.png')} style = {GWStyles.container}>
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("Menu2")} style = {GWStyles.backbutton}>
        <Image source={require('../../images/retune.png')} style = {GWStyles.imagesize}>
        </Image>
        </TouchableOpacity> 
        <View style ={(GWStyles.container1)}>
        <FlatList data = {this.state.GookWord} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>  
        <View style ={(GWStyles.GW_Card)}>     
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("GW_date",{"rcd_ID":item.rcd_ID})} style ={(GWStyles.GW_Box)}>
          <View style ={(GWStyles.GWTitlebox)}>
            <Text style ={(GWStyles.GWTitle)}>{item.name}</Text>
            </View>
            <View style ={(GWStyles.GWTimebox)}>
            <Text style ={(GWStyles.GWTime)}>{item.date}</Text>
            </View>
            <View style = {GWStyles.CardBox}>
            <Image source={{uri:item.Img}} style = {GWStyles.image}>
            </Image>
            </View>
          </TouchableOpacity> 
        </View> 
        </ScrollView> 
        );
      }}
      />
      </View> 
      </ImageBackground>
      )
    }
  }
}