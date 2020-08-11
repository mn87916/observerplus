import React, {Component} from 'react';  
import {Platform, StyleSheet,Dimensions, Text, View,TouchableOpacity,Image,TextInput,ImageBackground,KeyboardAvoidingView,SafeAreaView,ScrollView} from 'react-native';
import '../../data/GlobalVariable.js';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Globalstyles } from '../../style/Global';
import { Header } from 'react-navigation-stack';
  
export default class App extends React.Component {
  constructor(props) 
        {
        super(props);

        this.state = {plant_height: '',
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        };     
        }
  state = {
    image: null,
  };
  

   componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        //aspect: [4, 3], 這是裁切
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        //this.uploadImageAsync(result.uri)
        //global.GlobalVariable.tempphotouri = result.uri ;
        this.props.navigation.navigate("MeasurePhotoConfirm");

      }

      console.log('result');
      
      
    } catch (E) {
      console.log(E);
    }
  };

   /*uploadImageAsync = (rest)  =>{
    let apiUrl = 'https://observerplus.club/API/upImg.aspx';
      let data = new FormData();  
      data.append("file",{  
        uri:rest,
        name:"file",
        type:"image/jpg",
        
      })
      fetch(apiUrl, {  
        headers: {
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: data
      }).then(
        response => {
          console.log('succ ')
          console.log(response.json())
          this.props.navigation.navigate("Measure");
        }
        ).catch(err => {
        console.log('err ')
        console.log(err)
      } )
      .done(); 
    }*/


  _pickImageLib = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        //aspect: [4, 3],這是裁切
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });

        global.GlobalVariable.tempphotouri = result.uri ;
        this.props.navigation.navigate("MeasurePhotoConfirm");
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  render() { 
    let { image } = this.state;
    return (
     
     
    

    <ImageBackground source={require('../../images/Re_background.png')} style = {Globalstyles.Background}>
   
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>

        <View style ={styles.center}>
        <View style ={styles.dateview}>
        <Text style ={styles.date}>2020/09/16</Text>
        </View>
        <View style ={styles.inputview}>
        <TextInput style = {styles.inputtext} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "在想什麼呢?"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state           
                    />
        </View>
        <View style ={styles.cameraview1}>
        <Image style = {styles.camera_image}
          source={{uri:this.state.image}}/>
        </View>
        <View style ={styles.cameraview2}>
        </View>
        <View style ={styles.cameraview3}>
        </View>
        </View>
        <TouchableOpacity style = {styles.sendbutton}  onPress={()=>{ this.props.navigation.navigate("MeasureRecord");}}>
        <Text style = {styles.SB_text}>發布</Text>
     </TouchableOpacity>
      <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "公分"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state           
                    />
      <TextInput style = {styles.inputBox2} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "毫升"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state           
                    />
      <View style = {styles.ruler_B}>
      <Image style = {styles.ruler}
          source={require("../../images/Re_ruler.png")}/>
     </View>

    <View style = {styles.water_B}>
      <Image style = {styles.water}
          source={require("../../images/Re_water.png")}/>
     </View>

      <TouchableOpacity style = {styles.camera_B} onPress={this._pickImage}>
      <Image style = {styles.camera}
          source={require("../../images/Re_camera.png")}/>
     </TouchableOpacity>
     
      <TouchableOpacity style = {styles.video_B}  onPress={()=>{ this.props.navigation.navigate("MeasureRecord");}}>
        <Image style={styles.video2}
          source={require("../../images/Re_video.png")}/>
     </TouchableOpacity>
     

     <TouchableOpacity style = {styles.gallery_B} onPress={this._pickImageLib}>
        <Image style={styles.gallery}
          source={require("../../images/Re_image.png")}/>
     </TouchableOpacity>  
    </ImageBackground>
     
    
    
    );  
  }  
} 

const styles = StyleSheet.create({  
  background: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
      container: {
      top:"30%",
      left:"20%",
      alignItems:'center',
      justifyContent:'center',
      height:"50%",
      //width:"80%",
},
      container1: {
      alignItems:'center',
      justifyContent:'center',
      //height:"15%",
      //top:'3%'
      
},
      container3: {
      alignItems:'flex-start',
      marginTop:'8%',
      marginLeft:'4%'
    
},   
      upperspace:{
        width: '100%', 
        height: '8%',
        //marginBottom:'5%',
        //backgroundColor:'#82ab8f',
        top:'1%',
        //left:"5%",
        position: 'absolute',
        },

        center:{
        width: '92.5%', 
        height: '55.5%',
        //backgroundColor:'#82ab8f',
        top:'-11.1%',
        //marginVertical:"10%",
        left:"4%",
        borderRadius:15,
        //marginBottom:'5%',
        //position: 'absolute',
        },
        dateview:{
        width: '100%', 
        height: '8%',
        //backgroundColor:'#fbfadf',
        top:'4%',
        //marginVertical:"10%",
        //left:"4%",
        borderRadius:15,
        //marginBottom:'5%',
        //position: 'absolute',
        },
        date:{
        width: '95%', 
        height: '100%',
        //backgroundColor:'#333',
        //top:'5%',
        //marginVertical:"10%",
        left:"5%",
        borderRadius:15,
        fontFamily:'nunito-bold',
        fontSize: 20,
        //marginBottom:'5%',
        //position: 'absolute',
        },
        inputview:{
        width: '100%', 
        height: '38%',
        //backgroundColor:'#fbfadf',
        top:'4%',
        borderRadius:15,
        },
        inputtext:{
        top:'3%',
        height:'97%',
        width:'90%',
        left:'5%',
        textAlignVertical:"top",
        //backgroundColor:'#FFFFFF',
        borderColor: "#000000",
        borderRadius: 15, 
        fontSize:25,
        //borderWidth: 1,
        },
        cameraview1:{
        width: '45%', 
        height: '35%',
        backgroundColor:'green',
        top:'52%',
        //marginVertical:"10%",
        left:"4%",
        //marginBottom:'5%',
        position: 'absolute',
        },
        cameraview2:{
        width: '45%', 
        height: '17%',
        backgroundColor:'yellow',
        top:'52%',
        //marginVertical:"10%",
        left:"51%",
        //marginBottom:'5%',
        position: 'absolute',
        },
        cameraview3:{
        width: '45%', 
        height: '17%',
        backgroundColor:'pink',
        top:'70%',
        //marginVertical:"10%",
        left:"51%",
        //marginBottom:'5%',
        position: 'absolute',
        },
        sendbutton:{
        top:'62.5%',
        left:"35%",
        width: '30%', 
        height: '8%',
        backgroundColor:'#82ab8f',
        position: 'absolute',
        borderRadius: 15, 
        borderWidth: 1,
        },
        SB_text:{
        width: '100%', 
        height: '100%',
        //backgroundColor:'#333',
        borderRadius:15,
        fontFamily:'nunito-bold',
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical:"center",
        },
        camera_B:{
        top:'88.5%',
        left:"5%",
        width: "26.52%",  
        height: "9.7%",
        position: 'absolute',
        borderRadius:15,
        },
        video_B:{
        top:'88.5%',
        left:"37%",
        width: "26.52%",  
        height: "9.7%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:15,
        },
        gallery_B:{
        top:'88.5%',
        left:"69%",
        width: "26.52%",  
        height: "9.7%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:15,
        },
        ruler_B:{
        top:'74%',
        left:"5%",
        width: "19.57%",  
        height: "11.8%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:100,
        },
        water_B:{
        top:'74%',
        left:"51%",
        width: "19.57%",  
        height: "11.8%",
        position: 'absolute',
        borderRadius:100,
        },
    backbutton: {
    resizeMode:'stretch',
    width: "10%", 
    height: "100%",
    left:'5%',
    //bottom:'0%' ,
    position: 'absolute',
  },
  back: {
   width: "100%", 
   height: "100%",
   resizeMode:'stretch',
  },
    camera:{
        width: "100%", 
        height: "100%",
        //top:'28%',
        //backgroundColor:'#82ab8f',
        borderRadius:15,
        borderColor: "#000000",
        borderWidth: 1,
        //marginVertical:10,
        //paddingVertical : 4,
        //marginTop:'3%',
    },
    video2:{
      width: "100%", 
      height: "100%",
      borderRadius:15,
      borderWidth: 1,
      borderColor: "#000000",
    },
    gallery:{
      height:"100%",
      width:"100%",
      borderRadius:15,
      borderWidth: 1,
      borderColor: "#000000",
    },
    ruler:{
      width: "100%", 
      height: "100%",
      borderRadius:100,
      borderWidth: 1,
      borderColor: "#000000",
    },
    water:{
      width: "100%", 
      height: "100%",
      borderRadius:100,
      borderWidth: 1,
      borderColor: "#000000",
    },
    camera_image:{
      width: "100%", 
      height: "100%",
    },
    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
   
    inputBox:{
        top:'76.5%',
        height:'7%',
        width:'22%',
        left:'26%',
        position: 'absolute',
        backgroundColor:'#FFFFFF',
        textAlign: 'center',
        borderColor: "#000000",
        borderRadius: 10, 
        fontSize:25, 
        borderWidth: 1,
    },
    inputBox2:{
        top:'76.5%',
        height:'7%',
        width:'22%',
        left:'72%',
        position: 'absolute',
        backgroundColor:'#FFFFFF',
        textAlign: 'center',
        borderColor: "#000000",
        borderRadius: 10, 
        fontSize:25,
        borderWidth: 1,
    },
});  
