import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,ImageBackground,Alert} from 'react-native';
import '../../data/GlobalVariable.js';
import { WebView } from 'react-native-webview';
  
export default class App extends React.Component {  
  constructor(props){
    super();
    this.state = {
      dataobj : {},
      teachersarr :[],
      parastring: '',
      school_name : global.GlobalVariable.school_name,
    }
  }

  componentDidMount(){
      //this.state.parastring = `getschoolid(`+ global.GlobalVariable.school_ID +`)`
      

  }
  inject(){
      this.webref.injectJavaScript(`getschoolid(`+ global.GlobalVariable.school_ID +`)`);
      this.webref.injectJavaScript(`getschoolname('`+ this.state.school_name +`')`);
       this.webref.injectJavaScript(`getknowid('`+ global.GlobalVariable.know_ID +`')`);
      console.log(global.GlobalVariable.school_ID) 
  }

  render() {  
    return (
        
    <ImageBackground source = {require('../../images/Track_growth.png')} style = {styles.backgroundimage}> 
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
         <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          cacheMode={'LOAD_NO_CACHE'}
          cacheEnabled={false}
          ref={(r) => (this.webref = r)}
          source={{ uri: 'http://192.192.155.112/TGOSMap/detail/detail.html' }}
          
          //injectedJavaScript='window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight)'
          //injectedJavaScript = {this.state.parastring}
           
          onMessage={(event) => {
            const message = JSON.parse(event.nativeEvent.data)
            if(message.command === 'get info'){            //接收座標資訊
            }
            else if(message.command === 'doneloading'){   //地圖讀取完畢
               this.inject()
             
              
            }
            
            this.forceUpdate();
          }}
          />


      </ImageBackground>
    );  
  }  
} 

const styles = StyleSheet.create({  
  background: {
    flex:1,
    backgroundColor:'#ffffff',
  },
      container: {
      alignItems:'center',
      //justifyContent:'center',
      height:"9%",
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
        marginVertical:10,
        paddingVertical : 4,
        marginTop:'10%'
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
    titletext:{
      fontSize:25,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
   backgroundimage: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
});  
