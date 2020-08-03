import React, {Component} from 'react';  
import {Platform, StyleSheet,Dimensions, Text, View,TouchableOpacity,Image,ActivityIndicator,FlatList,ScrollView,ImageBackground } from 'react-native';
import '../../data/GlobalVariable.js';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { Gallery } from '../Gallery/GalleryStyle';
//import { MaterialIcons, Octicons } from '@expo/vector-icons';
//import ImageView from "react-native-image-viewing";
  
export default class App extends React.Component {  

  constructor(props) 
        {
        super(props);   
        this.state = {
           Gallery:[],
           img:[],
           isLoading:true,
           mute: false,
           shouldPlay: true,
          }
        }
  componentDidMount()
  {
      var queryURL = 'https://observerplus.club/API/test.aspx';
      let parameters = new FormData();
        

      fetch(queryURL,{
        method: 'GET',
        //body: parameters
            })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) =>  { 
      for (var i = 0 ; i < responseData.length;i++) {
       this.state.Gallery.push(responseData[i])   
      }
      /*for (var i = 0 ; i < this.state.Gallery[i].Img.length;i++) {
       this.state.img.push(this.state.Gallery.Img[])       
      }*/
      this.forceUpdate()
      this.setState({isLoading:false})
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }


    ImgorVideo = (item) => { 
      console.log(item.Type1)
      if (item.Type1 == "jpg" ) {
        return(
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"ID":item.ID});}} style ={(Gallery.CardBox2)}>
           <Image style={Gallery.Photos}
          source={{uri:item.Media1}}/>          
          </TouchableOpacity>
        )
      }
      else{
        console.log(item.Media1)
        return(
          <View style ={(Gallery.CardBox2)}>
          <Video
              source={{ uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="stretch"
                            shouldPlay ={false}
                            isLooping ={false}
                            useNativeControls
              style={ {width:'100%' , height:'100%'}}
            />
            </View>
        )
      }
        }

    ImgorVideo2 = (item) => { 
      console.log(item.Type2)
      if (item.Type2 == "jpg" ) {
        return(
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"ID":item.ID});}} style ={(Gallery.CardBox3)}>
           <Image style={Gallery.Photos}
          source={{uri:item.Media2}}/>          
          </TouchableOpacity>
        )
      }
      else{
        console.log(item.Media2)
        return(   
          <View style ={(Gallery.CardBox3)}>
          
          <Video
              source={{uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            useNativeControls
              style={ {width:'100%' , height:'100%'}}
            />
            </View>
        )
      }
        }

       /* handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }
  
  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }*/

  render() {
    const { width , height} = Dimensions.get('window');
    if(this.state.isLoading){
        return(
          <View style ={Gallery.container}>
          <ActivityIndicator size="large" color="#4d805e"/>
          </View>
        )
      }
      else{
          return (
        
    <ImageBackground source={require('../../images/Gallery_background.png')} style = {Gallery.container}>
     <View style ={Gallery.upperspace}>
        <TouchableOpacity style={Gallery.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={Gallery.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
    
     <View style ={(Gallery.container1)}>
      <FlatList data = {this.state.Gallery} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>
        <View style ={(Gallery.CardBox)}>       
            <Text style ={(Gallery.Title)}>{item.Date}</Text>
            <Text style ={(Gallery.Contents)}>{item.Re}</Text>            
            {this.ImgorVideo(item)}
            {this.ImgorVideo2(item)}
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"ID":item.ID});}} style ={(Gallery.CardBox4)}>
            <Text style ={(Gallery.OverFlow)}>{item.Overflow}</Text> 
          </TouchableOpacity>
        </View>       
        </ScrollView>
        );
      }}
      />
      </View> 

    </ImageBackground>
    );  
      }
    
  }  
} 

