import React, {Component} from 'react';  
import {Platform, StyleSheet,Dimensions,Linking, Text, View,TouchableOpacity,Image,ActivityIndicator,FlatList,ScrollView,ImageBackground } from 'react-native';
import '../../data/GlobalVariable.js';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { Gallery } from '../Gallery/GalleryStyle';
import * as FileSystem from 'expo-file-system';
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
           obj_key:"",
           pdfUrl: '',
           download:true,
          }
        }
  componentDidMount()
  {
     this.state.obj_key = this.props.navigation.getParam("obj_key");
     this.forceUpdate();
     this.Send();
  }

  Send = () =>{
    
      var queryURL = 'https://observerplus.club/API/Memoirs.aspx';
      let parameters = new FormData();
      parameters.append("account", global.GlobalVariable.account);
      parameters.append("password", global.GlobalVariable.password);  
      parameters.append("obj_ID",this.state.obj_key);
      fetch(queryURL,{
        method: 'POST',
        body: parameters,
            })
      // response.json() => 把 response 的資料轉成 json
      // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
      .then((response) => response.json() )
      .then((responseData) =>  { 
        for (var i = 0 ; i < responseData.length;i++) {
        this.state.Gallery.push(responseData[i])   
        }
        console.log(this.state.Gallery)
        this.setState({isLoading:false})
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }
  /*handleVideoRef = async (component) => {
      if (component && !this.playbackObject) {
        this.playbackObject = component;
        await this.playbackObject.loadAsync(Asset.fromModule(source={ uri:item.Media1}));
        await this.playbackObject.playAsync();
      }
    }*/

    ImgorVideo = (item) => { 
      console.log(item.Type1)
      if (item.Type1 == "jpg" ) {
        return(
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"rcd_ID":item.ID});}} style ={(Gallery.CardBox2)}>
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
              source={{ uri:item.Media1}}
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
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"rcd_ID":item.ID});}} style ={(Gallery.CardBox3)}>
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
              source={{uri:item.Media2}}
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

    download = () => {
     /* FileSystem.downloadAsync(
      'https://observerplus.club/w.docx',
      FileSystem.documentDirectory + 'w.docx'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
      })
      .catch(error => {
        console.error(error);
      });*/
      this.setState({download:false})
      var queryURL = 'https://observerplus.club/API/E_file.aspx';
      let parameters = new FormData();
      parameters.append("obj_ID",this.state.obj_key);
      fetch(queryURL,{
        method: 'POST',
        body: parameters,
            })
      // response.json() => 把 response 的資料轉成 json
      // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
      .then((response) => response.json() )
      .then((responseData) =>  { 
        this.setState({pdfUrl:responseData})
        this.setState({download:true})
        Linking.canOpenURL(this.state.pdfUrl.file).then(supported => {
    if (!supported) {
    console.warn('Cant handle url: ' + this.state.pdfUrl.file);
    } else {
    return Linking.openURL(this.state.pdfUrl.file);
    }
    }).catch(err => console.error('An error occurred',this.state.pdfUrl.file));
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
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
    if(this.state.isLoading || this.state.isLoading ==false && this.state.download == false){
        return(
          <ImageBackground source = {require('../../images/login_background.png')} style = {Gallery.login_image}>
          <View style ={Gallery.container}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
      else if(this.state.isLoading ==false && this.state.download == true){
          return (
        
    <ImageBackground source={require('../../images/Gallery_background.png')} style = {Gallery.container}>
        <TouchableOpacity style={Gallery.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={Gallery.back}
          source={require("../../images/retune.png")}/> 
        </TouchableOpacity>
    <TouchableOpacity style={Gallery.backbutton2} onPress= {() =>this.download()}>
          <Image style={Gallery.back}
          source={require("../../images/download.png")}/>
        </TouchableOpacity>
     <View style ={(Gallery.container1)}>
      <FlatList data = {this.state.Gallery} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>
        <View style ={(Gallery.CardBox)}>       
            <View style ={(Gallery.CardBox6)}>
            <Text style ={(Gallery.Title)}>{item.Date}</Text>
            </View>
            <View style ={(Gallery.CardBox5)}>
            <Text style ={(Gallery.Contents)}>{item.Re.substring(0,10)+"......"}</Text>     
            </View>       
            {this.ImgorVideo(item)}
            {this.ImgorVideo2(item)}
          <TouchableOpacity onPress ={()=>{ this.props.navigation.navigate("Data_record",{"rcd_ID":item.ID});}} style ={(Gallery.CardBox4)}>
            <Image style={Gallery.Photos}
            source={require("../../images/picture.png")}/>     
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

