import React ,{ useState , Component } from 'react';
import {Text, View,navigator,ActivityIndicator,ImageBackground,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native';
import { Globalstyles } from '../../style/Global';
import { GWStyles } from '../GoodWork/GWstyle';


export default class GW_date extends React.Component {
    constructor(props) 
        {
        super(props);   
        this.state = {
           isLoading:true,
           rcd_ID:"",
           Data_record:[],
        }   
      }
  componentDidMount()
  {
    this.state.rcd_ID = this.props.navigation.getParam("rcd_ID");
    console.log(this.state.rcd_ID);
    this.forceUpdate();
    var queryURL = 'https://observerplus.club/API/Goodwork.aspx';
    let parameters = new FormData();
    parameters.append("rcd_ID", this.state.rcd_ID); 
  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json())
    .then((responseData) => { 
       for (var i = 0 ; i < responseData.length;i++) {
        this.state.Data_record.push(responseData[i])   
        }
      console.log(this.state.Data_record[0].date);
      this.setState({isLoading:false})
      //console.log(this.state.Data_record);

        
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
  }

  Img = (item) => { 
    return(
      <FlatList data = {item.img} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
          return(
        <View style = {GWStyles.CardBox2}>
        <Image style={GWStyles.image2}
        source={{uri:item}}/>   
        </View>       
        );
      }}
      />
    )
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
      <ImageBackground source={require('../../images/GW_background.png')} style = {GWStyles.container}>
      <TouchableOpacity onPress ={() => this.props.navigation.navigate("GoodWork")} style = {GWStyles.backbutton}>
        <Image source={require('../../images/retune.png')} style = {GWStyles.imagesize}>
        </Image>
        </TouchableOpacity> 
        <View style ={(GWStyles.AnnounceCard)}>
        <FlatList data = {this.state.Data_record} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>       
            <Text style ={(GWStyles.AnnounTitle2)}>{item.name}</Text>
            <Text style ={(GWStyles.AnnounTitle2)}>{item.date}</Text>
            <Text style ={(GWStyles.AnnounContent)}>當日心得:</Text>
            <Text style ={(GWStyles.AnnounContent)}>{item.feeling}</Text>
            {this.Img(item)}
            <Text style ={(GWStyles.AnnounContent)}>老師評語:</Text>
            <Text style ={(GWStyles.AnnounContent)}>{item.Comments}</Text>
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