import React, { Component,useState, useEffect  } from 'react';
import { View, ScrollView, SafeAreaView,StyleSheet ,TouchableOpacity,Image,Alert,Text,ImageBackground,BackHandler,Switch,TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import '../../data/GlobalVariable.js';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import HyperlinkedText from 'react-native-hyperlinked-text';

export default class App extends Component {

  getLocationTGOS(){
      this._getLocation();
      this.webref.injectJavaScript(`WGS84toTWD97(`+this.state.currentlongitude+`,`+this.state.currentlatitude+`);`);
  }

  onClosePress ()  
    {
     this.setState(previousState => ({ content: !previousState.content }))
    }

  onSearchPress = async () =>{
    this.setState({ bottomModalAndTitle: false });
    global.GlobalVariable.searchtext = this.state.search_text;
    this.props.navigation.navigate("SearchMap",{callHome:this.movetosearchbutton.bind(this)})

  }
  movetosearchbutton(){
    if(global.GlobalVariable.searchoption != ''){
      console.log(global.GlobalVariable.searchoption)
      this.state.searchoption = global.GlobalVariable.searchoption;
      this.webref.injectJavaScript(`searchresult('`+this.state.searchoption+`');`);
    }
  }

  ChangeMode(){
    this.webref.injectJavaScript(`knowmapview()`);
    this.setState({ bottomModalAndTitle: false })
    if (this.state.detailbuttontext == "查看種植/飼養紀錄"){
      this.state.detailbuttontext = "查看介紹";
    }
    else{
      this.state.detailbuttontext = "查看種植/飼養紀錄";
    }
  }

  ChangeVisible(){
    this.state.visiblestatusarr = [];
    this.state.visiblestatusarr.push(this.state.schoolvisible)
    this.state.visiblestatusarr.push(this.state.citizenvisible)
    this.state.visiblestatusarr.push(this.state.butterflyvisible)
    this.state.visiblestatusarr.push(this.state.shopvisible)
    this.state.visiblestatusarr.push(this.state.farmvisible)
    this.state.visiblestatusarr.push(this.state.fireflyvisible)
    this.state.visiblestatusarr.push(this.state.ecologyvisible)
    console.log(this.state.visiblestatusarr)
    
    this.webref.injectJavaScript(`changevisible('`+ this.state.visiblestatusarr +`')`)
    this.setState({ bottomModalAndTitle: false })
  }

  gotoDetail(){
    if(this.state.school_name != ''){
      this.props.navigation.navigate("MapDetail");
    }
    else
    Alert.alert("請選擇有效的座標!")
    

  }


  setTGOSMapType(maptype){
     this.webref.injectJavaScript(`setMapType('`+maptype+`');`);
     this.setState({ bottomModalAndTitle: false });
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
    //--------------------------座標篩選Function--------------------------
    toggleschoolvisibleSwitch = (value) =>{
        this.setState({schoolvisible: value})
        //this.webref.injectJavaScript(`markervisible('school')`);
    }
    togglecitizenvisibleSwitch = (value) =>{
        this.setState({citizenvisible: value})
        //this.webref.injectJavaScript(`markervisible('citizen')`);
    }
    togglebutterflyvisibleSwitch = (value) =>{
        this.setState({butterflyvisible: value})
        //this.webref.injectJavaScript(`markervisible('butterfly')`);
    }
    toggleshopvisibleSwitch = (value) =>{
        this.setState({shopvisible: value})
        //this.webref.injectJavaScript(`markervisible('shop')`);
    }
    togglefarmvisibleSwitch = (value) =>{
        this.setState({farmvisible: value})
        //this.webref.injectJavaScript(`markervisible('farm')`);
    }
    togglefireflyvisibleSwitch = (value) =>{
        this.setState({fireflyvisible: value})
        //this.webref.injectJavaScript(`markervisible('firefly')`);
    }
    toggleecologyvisibleSwitch = (value) =>{
        this.setState({ecologyvisible: value})
        //this.webref.injectJavaScript(`markervisible('ecology')`);
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
                  isdetaillshow:false,
                  markertitle:null,
                  markeraddress:null,
                  markerwebsite:null,
                  markerdescription:null,
                  searchtext:null,
                  searchoption:null,
                  school_ID:null,
                  school_name:null,
                  know_ID:null,

                  schoolvisible:true,
                  citizenvisible:false,
                  butterflyvisible:false,
                  shopvisible:false,
                  farmvisible:false,
                  fireflyvisible:false,
                  ecologyvisible:false,
                  visiblestatusarr:[],

                  detailbuttontext:"查看種植/飼養紀錄",
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
            const message = JSON.parse(event.nativeEvent.data)
            console.log(message.command)
            if(message.command == 'getinfo'){            //接收座標資訊
               this.state.markertitle = message.payload.title;
               this.state.markeraddress = message.payload.address;
               this.state.markerwebsite = message.payload.website;
               this.state.markerdescription = message.payload.description;
               this.state.school_ID = message.payload.school_ID;
               this.state.school_name = message.payload.school_name;
              global.GlobalVariable.know_ID = ''; 

                if(this.state.content == false){
                  this.setState(previousState => ({ content: !previousState.content }))
                }
              
                if(this.state.school_name != ''){
                  global.GlobalVariable.school_ID =  this.state.school_ID;
                  global.GlobalVariable.school_name = this.state.school_name;
                  this.state.isdetaillshow =true;
                }
                else{
                  this.state.isdetaillshow =false;
                }

            }
            else if(message.command == 'getknow'){
              this.state.markerwebsite = '';
              this.state.markerdescription = '';
               this.state.markeraddress = message.payload.description;
               this.state.markertitle = message.payload.title;
               this.state.know_ID =  message.payload.know_ID;
               global.GlobalVariable.know_ID = this.state.know_ID;
               global.GlobalVariable.school_ID =  '';
               global.GlobalVariable.school_name = '';
               console.log(message.payload.know_ID)
               if(this.state.content == false){
                this.setState(previousState => ({ content: !previousState.content }))
                this.state.isdetaillshow =true;
              }
            }
            this.forceUpdate();
          }}
          />
        
        {
        this.state.content ? 
        <View style = {styles.leveldetailcontainer}>
        <View style={styles.card}>
        <ScrollView>
        
          <Text style={styles.markertitle}> {this.state.markertitle} </Text>
          <Text style={styles.markerdescription}>  {this.state.markeraddress} </Text>

          <HyperlinkedText style={styles.entry}>{this.state.markerwebsite}</HyperlinkedText>
         
          <Text style={styles.markerdescription}>  {this.state.markerdescription} </Text>
          <View style ={styles.bottomspace}>

          </View>
          </ScrollView>
            {
              this.state.isdetaillshow ?
              <TouchableOpacity style = {styles.detailbutton} onPress={()=> this.gotoDetail()}>
                <Text style ={styles.buttonText}>{this.state.detailbuttontext}</Text>
              </TouchableOpacity> :null
            }
            
        </View>

        <TouchableOpacity style = {styles.closebutton}
           onPress={this.onClosePress.bind(this)}>        
            <Image style={styles.buttonimage}
          source={require("../../images/close.png")}/>
        </TouchableOpacity>


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
          height={0.9}
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
          <View style = {styles.margin}>
          
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
          
          <View style = {styles.searchview}>
            <TextInput style = {styles.inputBox} placeholder = "搜尋座標" underlineColorAndroid= 'rgba(0,0,0,0)' onChangeText={(search_text) => this.setState({search_text})}/>
            <TouchableOpacity style = {styles.searchbutton} onPress = {this.onSearchPress.bind(this)}>
              <Image style={styles.buttonimage} source={require("../../images/glass.png")}/>
            </TouchableOpacity>
          </View>
          <View style  = {styles.searchview}>
            <TouchableOpacity style = {styles.switchmodebutton} onPress = {this.ChangeMode.bind(this)}>
              <Text style ={styles.buttonText}>切換地圖模式</Text>
            </TouchableOpacity>
            <Image style={styles.modeimage} source={require("../../images/normalmode.png")}/>
          </View>
        <View style = {styles.border}>
          <Text style = {styles.modalstext}>
            座標篩選:
          </Text>
          <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/SchoolC.png")}/>
            <Text style = {styles.modalstext}>
              學校:
            </Text>
            <Switch
            onValueChange = {this.toggleschoolvisibleSwitch} 
            value = {this.state.schoolvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/citizenfarmC.png")}/>
            <Text style = {styles.modalstext}>
              市民農園:
            </Text>
            <Switch
            onValueChange = {this.togglecitizenvisibleSwitch} 
            value = {this.state.citizenvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/butterflyC.png")}/>
            <Text style = {styles.modalstext}>
              蝴蝶園:
            </Text>
            <Switch
            onValueChange = {this.togglebutterflyvisibleSwitch} 
            value = {this.state.butterflyvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/shopC.png")}/>
            <Text style = {styles.modalstext}>
              商店:
            </Text>
            <Switch
            onValueChange = {this.toggleshopvisibleSwitch} 
            value = {this.state.shopvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/FarmC.png")}/>
            <Text style = {styles.modalstext}>
              農場:
            </Text>
            <Switch
            onValueChange = {this.togglefarmvisibleSwitch} 
            value = {this.state.farmvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/fireflyC.png")}/>
            <Text style = {styles.modalstext}>
              螢火蟲區:
            </Text>
            <Switch
            onValueChange = {this.togglefireflyvisibleSwitch} 
            value = {this.state.fireflyvisible}
            />
         </View>
         <View style = {styles.switchview}>
            <Image style={styles.mapfilterimage}
            source={require("../../images/ecologyC.png")}/>
            <Text style = {styles.modalstext}>
              生態園區:
            </Text>
            <Switch
            onValueChange = {this.toggleecologyvisibleSwitch} 
            value = {this.state.ecologyvisible}
            />
         </View>
           <TouchableOpacity style = {styles.switchmodebutton} onPress = {this.ChangeVisible.bind(this)}>
              <Text style ={styles.buttonText}>套用</Text>
            </TouchableOpacity>
         
            </View>
            </View>
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
    left:'2%',
    fontSize:20,
    //paddingTop:'2%',
  },
  maptypebutton:{
        width:'25%',
        height:'100%',
        borderRadius:50,
    },
  morefeaturebuttonview:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height:'13%',
      
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
      left:'1%',
      fontSize:30,
    },
    markerdescription:{
      fontSize:20,
      top:'2%',
      left:'1%',
    },
    border:{
      //paddingTop:'2%',
      borderColor:"gray",
      borderWidth:1,
      borderRadius:10,
    },
    margin:{
      justifyContent:"space-between",
    },
    switchview:{
       flexDirection: 'row',
       justifyContent:"space-between",
       height:"8%",
    },
    mapfilterimage:{
       width: "12%", 
       height: "100%",
       resizeMode:'stretch',
    },
        inputBox:{
        width:'100%',
        backgroundColor:'#FFFFFF',
        borderRadius: 5,
        borderWidth:1,
        paddingHorizontal:20,
        fontSize:25,
        marginVertical: 10,
        
    },
    searchview:{
      flexDirection: 'row',
      width:'85%',
      height:'10%',
    },
    searchbutton:{
       width:'15%',
    },
    switchmodebutton:{
        width:'100%',
        backgroundColor:'#faa45b',
        borderRadius:10,
        borderWidth:1,
        marginVertical:10,
        paddingVertical : 4,
    },
    buttonText:{
        fontSize:20,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
    modeimage:{
      width:'15%',
      resizeMode:'stretch',
      height:'90%',
    },
      detailbutton:{
        width:'90%',
        backgroundColor:'#faa45b',
        borderRadius:10,
        borderWidth:1,
        marginVertical:10,
        paddingVertical : 4,
        position: 'absolute',
        bottom:'1%',
        left:'5%',
    },
    bottomspace:{
      height: '10%',
    },
    entry: {
      textAlign: 'left',
      color: '#333333',
      margin: 15,
      fontSize:20,
  },

});
