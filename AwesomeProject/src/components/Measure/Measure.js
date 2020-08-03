import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,TextInput,ImageBackground,KeyboardAvoidingView,SafeAreaView,ScrollView} from 'react-native';
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

        this.state = {plant_height: ''};
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
        global.GlobalVariable.tempphotouri = result.uri ;
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
     
     
    

    <ImageBackground source={require('../../images/Measure_background.png')} style = {Globalstyles.Background}>
   
    <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>

    
      <View style = {styles.container}>
      <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "公分"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state
                     
                    />
      <TouchableOpacity style = {styles.buttonok} onPress={()=>{alert("S");}}>
      
        <Text style ={styles.buttonText}>確定</Text>
     </TouchableOpacity>

      </View>

      <View style = {styles.container1}>

      <TouchableOpacity style = {styles.button} onPress={this._pickImage}>
        <Text style ={styles.buttonText}>拍照</Text>
     </TouchableOpacity>

      <TouchableOpacity style = {styles.button} onPress={()=>{ this.props.navigation.navigate("MeasureRecord");}}>
        <Text style ={styles.buttonText}>錄影</Text>
     </TouchableOpacity>

     <TouchableOpacity style = {styles.button} onPress={this._pickImageLib}>
        <Text style ={styles.buttonText}>從相簿選擇</Text>
     </TouchableOpacity>

     </View>
    
    </View>
    
    </ImageBackground>
     
    
    
    );  
  }  
} 

const styles = StyleSheet.create({  
  background: {
    flex:1,
    alignItems:'center'
  },
      container: {
      top:"10%",
      alignItems:'center',
      justifyContent:'center',
      height:"50%",
      width:"80%",
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
      text: {
      fontSize:30,
    
},
   
      upperspace:{
        width: '100%', 
         height: '10%',
         marginBottom:'5%'
        },

    backbutton: {
    resizeMode:'stretch',
    width: "10%", 
    height: "90%",
    left:'2%',
    bottom:'0%' ,
    position: 'absolute',
  },
  back: {
   width: "100%", 
   height: "100%",
   resizeMode:'stretch',
  },
      buttonok:{
        width:150,
        backgroundColor:'#82ab8f',
        borderRadius:25,
        marginVertical:10,
        paddingVertical : 4,
        marginTop:'10%',
        borderColor: "#000000",
        borderWidth: 1,
    },
    button:{
        width:150,
        //top:'28%',
        backgroundColor:'#82ab8f',
        borderRadius:25,
        borderColor: "#000000",
        borderWidth: 1,
        marginVertical:10,
        paddingVertical : 4,
        marginTop:'3%'
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
   
inputBox:{
        //top:'18%',
        width:'100%',
        backgroundColor:'#FFFFFF',
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize:25,
        marginVertical: 10,
    },
});  
