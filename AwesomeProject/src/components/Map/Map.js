import React, { Component,useState, useEffect  } from 'react';
import { View, ScrollView, SafeAreaView,StyleSheet ,TouchableOpacity,Image,Alert,Text} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export default class App extends Component {
  
  
  getLocationTGOS(){
      this._getLocation();
       this.webref.injectJavaScript(`WGS84toTWD97(`+this.state.currentlongitude+`,`+this.state.currentlatitude+`);`);
      
  }
   
   state = {
     errorMessage:'',
     location:{},
     currentlongitude:'',
     currentlatitude:'',
   }
   
   componentWillMount(){
     this._getLocation();
   }
   
   _getLocation = async() =>{
     const {status} = await Location.requestPermissionsAsync();

     if(status !== 'granted'){
       console.log('沒權限');

       this.setState({
         errorMessage:'沒權限'
       })
     }

     const location = await Location.getCurrentPositionAsync({
       accuracy: Location.Accuracy.Highest
     });

     this.setState({
       location,
     })

     //Alert.alert('測試',JSON.stringify(this.state.location))
     console.log(location.coords.longitude);
     console.log(location.coords.latitude);
     this.state.currentlongitude = location.coords.longitude;
     this.state.currentlatitude = location.coords.latitude;
   }

  constructor(props) {
    super(props);

    this.state = { webViewHeight: 0 };
    
  }
 

  onWebViewMessage = (event) => {
    this.setState({ webViewHeight: Number(event.nativeEvent.data) });
  }

  render() {
    //const TGOSHTML = require('./TGOS.html'); //廢棄,Andorid WebView不能呼叫本機html,不會render僅顯示文字
    return (
      
      <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.navigate("Main");}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
      <View style={{ flex: 1 }}>

        <View style={{ height: '90%',width:'100%'}}>
          <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          ref={(r) => (this.webref = r)}
          source={{ uri: 'http://192.192.155.112/MobileMap.html' }}
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight)'
           
          onMessage={(event) => {

            if(event.nativeEvent.data == 'SHU'){
              Alert.alert("React Native 傳值測試" ,event.nativeEvent.data);
            }
            
          }}
        />
        </View>
        <View style = {styles.buttonview} >
        <TouchableOpacity style = {styles.button} onPress={() =>this.getLocationTGOS()}>
      
        <Text style ={styles.buttonText}>現在位置</Text>
     </TouchableOpacity>
     </View>
      </View>
      </View>
    )
  }
  
}
const styles = StyleSheet.create({  
  background: {
    flex:1,
    backgroundColor:'#ffffff',
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
      button:{
        width:150,
        backgroundColor:'#82ab8f',
        borderRadius:25,
       
        paddingVertical : 4,
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
    buttonview:{
       alignItems:'center',
    }
});  