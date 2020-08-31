import React, { Component,useState, useEffect  } from 'react';
import { View, ScrollView, SafeAreaView,StyleSheet ,TouchableOpacity,Image,Alert,Text,ImageBackground,BackHandler,Switch } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

export default class App extends Component {
  
  getLocationTGOS(){
      this._getLocation();
      this.webref.injectJavaScript(`WGS84toTWD97(`+this.state.currentlongitude+`,`+this.state.currentlatitude+`);`);
  }

  onClosePress ()  
    {
     this.setState(previousState => ({ content: !previousState.content }))
    }

  setTGOSMapType(maptype){
     this.webref.injectJavaScript(`setMapType('`+maptype+`');`);
  }

  backAction = () => {   //Andorid 返回鍵事件 為了Modal功能表而建
    if(this.state.bottomModalAndTitle === true){
      this.setState({ bottomModalAndTitle: false })
    }
    else if (this.state.bottomModalAndTitle === false){
      this.props.navigation.goBack();
    }
    return true;
  };

   
   state = {
     errorMessage:'',
     location:{},
     currentlongitude:'',
     currentlatitude:'',
     bottomModalAndTitle: false,
     bottomModal: false,
     
   }
   
    componentDidMount(){
     this._getLocation();
     BackHandler.addEventListener("hardwareBackPress", this.backAction);  //返回鍵監聽
    }

    componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    toggleSwitch = (value) => {
        this.setState({usermarkerswitchValue: value})
        this.webref.injectJavaScript(`toggleuserMarker()`);
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

    this.state = { webViewHeight: 0 ,
                  usermarkerswitchValue: false,
                  content: false,
                  markertitle:null,
                  };
    
  }
 
  onWebViewMessage = (event) => {
    this.setState({ webViewHeight: Number(event.nativeEvent.data) });
  }
 
  render() {
    //const TGOSHTML = require('./TGOS.html'); //廢棄,Andorid WebView不能呼叫本機html,不會render僅顯示文字
    return (
    <ImageBackground source = {require('../../images/map_background.png')} style = {styles.backgroundimage}>   
      
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
          cacheMode={'LOAD_NO_CACHE'}
          cacheEnabled={false}
          ref={(r) => (this.webref = r)}
          source={{ uri: 'http://192.192.155.112/TGOSMap/MobileMap.html' }}
          
          //injectedJavaScript='window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight)'
           
          onMessage={(event) => {
            
            if(this.state.content == false){
              this.setState(previousState => ({ content: !previousState.content }))
            }
          
            this.state.markertitle = event.nativeEvent.data;
             this.forceUpdate();
          }}

          

        />
        
        {
        this.state.content ? 
        <View style = {styles.leveldetailcontainer}>
        <View style={styles.card}>
        
          <Text style={styles.markertitle}> {this.state.markertitle} </Text>
          
        </View>
        <TouchableOpacity style = {styles.closebutton}
           onPress={this.onClosePress.bind(this)}>        
            <Image style={styles.buttonimage}
          source={require("../../images/close.png")}/>
        </TouchableOpacity>
          
          
          <View style ={styles.bottomspace}>

          </View>
          
         </View> : null
       }

        </View>

        


        <View style = {styles.buttonview} >
        <TouchableOpacity style = {styles.button} onPress={() =>this.getLocationTGOS()}>
      
        <Image style={styles.buttonimage}
          source={require("../../images/current_loc.png")}/>
     </TouchableOpacity>

     <TouchableOpacity style = {styles.button} onPress={() => {
              this.setState({
                bottomModalAndTitle: true,
              });
            }}>
      
        <Image style={styles.buttonimage}
          source={require("../../images/more_feature.png")}/>
     </TouchableOpacity>
     </View>
      
      </View>
      <Modal.BottomModal
          visible={this.state.bottomModalAndTitle}
          onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
          height={0.5}
          width={1}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          modalTitle={
            <ModalTitle
              title="更多功能"
              hasTitleBar
              textStyle={
                {
                  color:'white',
                }
              }
              style={{
              backgroundColor: '#5d9b84',
            }}
            />
          }
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: '#FBFADF',
            }}
          >

          <Text style = {styles.modalstext}>
          地圖類型:
          </Text>
          <View style = {styles.morefeaturebuttonview}>
          <TouchableOpacity style = {styles.maptypebutton} onPress={() =>this.setTGOSMapType('TGOSMAP')}>
               <ImageBackground style={styles.buttonimage}
                source={require("../../images/TGOS.png")}>
               
                <Text style = {styles.maptypetext}>
                TGOS
                </Text>
               
                </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.maptypebutton} onPress={() =>this.setTGOSMapType('F2IMAGE')}>
               <ImageBackground style={styles.buttonimage}
                source={require("../../images/Sat.png")}>
               
                <Text style = {styles.maptypetext}>
                衛星
                </Text>
               
                </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.maptypebutton} onPress={() =>this.setTGOSMapType('ROADMAP')}>
               <ImageBackground style={styles.buttonimage}
                source={require("../../images/Hybrid.png")}>
               
                <Text style = {styles.maptypetext}>
                混合
                </Text>
               
                </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.maptypebutton} onPress={() =>this.setTGOSMapType('SEGISMAP')}>
               <ImageBackground style={styles.buttonimage}
                source={require("../../images/GIS.png")}>
               
                <Text style = {styles.maptypetext}>
                GIS
                </Text>
               
                </ImageBackground>
          </TouchableOpacity>

          </View>
          <Text style = {styles.modalstext}>
          點選新增座標功能:
          </Text>
          <Switch

         onValueChange = {this.toggleSwitch} 
         value = {this.state.usermarkerswitchValue}/>

         <Text style = {styles.modalstext}>
          座標篩選:
          </Text>
         <Switch
         />
         <Switch
         />
         <Switch
         />
         <Switch
         />
            
          </ModalContent>
        </Modal.BottomModal>

        

      </ImageBackground>

      

    )
  }
  
}
const styles = StyleSheet.create({  
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
        width:'25%',
        height:'30%',
        paddingVertical : 4,
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
    buttonview:{
       flexDirection: 'row',
      justifyContent: 'space-around',
    },
    backgroundimage: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
  buttonimage: {
   width: '100%', 
   height: '100%',
   resizeMode:'stretch',
   
  },
  modalstext:{
    fontSize:20,
    paddingTop:'2%',
  },
  maptypebutton:{
        width:'25%',
        height:'100%',
        borderRadius:50,
    },
  morefeaturebuttonview:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height:'30%',
    },
  maptypetext:{
    fontSize:20,
    textAlign :'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'white',
    position: 'absolute',
    bottom:0,
    width:'100%',
  },
  leveldetailcontainer: { 
      flex:1,
      alignItems:'center',
      justifyContent:'center',    
  }  ,
  card:{
      height:"95%",
      width:"95%",
      backgroundColor:"#FBFADF",
      borderRadius:15,
      borderWidth: 1,
      borderColor: "#000000",
      //elevation:30,
      //padding:10,
  },
  closebutton: {
      width: '13%', 
      height: '15%',
      resizeMode:'stretch',
      left:'83%',
      position: 'absolute',
      top: '5%',
    },
    markertitle:{
      top:'3%',
      left:'3%',
      fontSize:30,
    }
});
