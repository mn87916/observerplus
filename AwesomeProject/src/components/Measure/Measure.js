import React, {Component} from 'react';  
import {Platform, StyleSheet,Dimensions,ActivityIndicator,FlatList, Text, View,TouchableOpacity,Image,TextInput,ImageBackground,KeyboardAvoidingView,SafeAreaView,ScrollView} from 'react-native';
import '../../data/GlobalVariable.js';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Globalstyles } from '../../style/Global';
import { Header } from 'react-navigation-stack';
import { Video } from 'expo-av';
import { Camera } from 'expo-camera';
import Indicator from './Indicator';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImageManipulator from "expo-image-manipulator";
 
export default class App extends React.Component {
  constructor(props) 
        {
          super(props);
          this.state = {
          currentDay: new Date(), 
          plant_height: '',
          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,
          isLoading:true,
          video2: true,
          recording: false,
          img:[],
          Sendimg:"",
          Sendimg2:"",
          vid:[],
          feelings:"",
          rulur:"",
          water:"",
          obj_key:"",
          checkimage:false,
          checkvideo:false,
          checksend:false,
          obj_token:true,
          NTPWeather:[],
          TPWeather:[],
          rcd_ID:"",
          currentlongitude:"",
          currentlatitude:"",
          errorMessage:'',
          location:"",
          getweather:"",
          getW_number:"",
          TEMP:"",
          } 
        }


   componentDidMount() {
     //console.log(this.state.currentDay.getHours())
      global.imagenumber = 0;
      global.videonumber = 0;
      this.state.obj_token = this.props.navigation.getParam("obj_token");
      this.state.obj_key = this.props.navigation.getParam("obj_key");
      console.log(this.props.navigation.getParam("obj_token"))
     this.getPermissionAsync();
     this.setState({isLoading:false})
     console.log(this.state.obj_key)
     this._getLocation();
     this.forceUpdate();
     
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
     const place = await Location.reverseGeocodeAsync({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        });

        /*let city;
        place.find( p => {
          city = p.city
          setCity(p.city)
        });*/

     this.setState({location:place[0].region})

     //Alert.alert('測試',JSON.stringify(this.state.location))
     //console.log(location.coords.longitude);
     //console.log(location.coords.latitude);
     //this.state.currentlongitude = location.coords.longitude;
     //this.state.currentlatitude = location.coords.latitude;
     this.Getweather();
   }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

     SendPersonal = ()  =>{
       
      let apiUrl = 'https://observerplus.club/API/Upload_Record.aspx';
      let parameters = new FormData();  
      parameters.append("account", global.GlobalVariable.account);
      parameters.append("password", global.GlobalVariable.password);
      parameters.append("feelings",this.state.feelings);
      parameters.append("height",this.state.rulur);
      parameters.append("water",this.state.water);
      parameters.append("obj_ID",this.state.obj_key);
      parameters.append("weather",this.state.getW_number);
      parameters.append("temp",this.state.temp);
      console.log(parameters)
      fetch(apiUrl, {  
        headers: {
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: parameters
      }).then((response) => response.json() )
      .then((responseData) => { 
          if(responseData.Message){
            this.setState({rec_ID:responseData.rcd_ID})
            this.forceUpdate();
            console.log(this.state.rec_ID)
            if(this.state.checkimage == true){
              this.Sendimage();
            }
            if(this.state.checkvideo == true){
              this.Sendvideo();
            }
            this.setState({checksend:true})
            this.setState({feelings:""})
            this.setState({rulur:""})
            this.setState({water:""})
            this.setState({img:[]})
            this.setState({vid:[]})
            alert("發布成功~")
          }
          else{
            alert("發布失敗~")
          }
          console.log(responseData)
        }
        ).catch(err => {
        console.log('err ')
        console.log(err)
      } )
      .done(); 
    }

     Sendimage = ()  =>{
       console.log(this.state.Sendimg)
       console.log(this.state.Sendimg2)
      let apiUrl = 'https://observerplus.club/API/Img.aspx';
      let parameters = new FormData();  
      parameters.append("rcd_ID",this.state.rec_ID);
      for(var i =0;i<imagenumber;i++){
        parameters.append("file",{  
        uri:this.state.img[i].image.uri,
        name:"file",
        type:"image/jpg",
        })
      }
      console.log(parameters)
      fetch(apiUrl, {  
        headers: {
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: parameters
      }).then((response) => response.json())
      .then((responseData) => { 
          console.log(responseData)
          //this.Sendvideo();
        }
        ).catch(err => {
        console.log('err ')
        console.log(err)
      } )
      .done(); 
    }
     

     Sendvideo = ()  =>{
       
      let apiUrl = 'https://observerplus.club/API/Mp4.aspx';
      let parameters = new FormData();  
      parameters.append("rcd_ID",this.state.rec_ID);
      for(var i =0;i<videonumber;i++){
        parameters.append("file2",{  
        uri:this.state.vid[i].vid,
        name:"file2",
        type:"video/mp4",
      })
      }
      console.log(parameters)
      fetch(apiUrl, {  
        /*headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },*/
        method: 'POST',
        body: parameters
      }).then((response) => response.json())
      .then((responseData) => { 
          console.log(responseData)
        }
        ).catch(err => {
        console.log('err ')
        console.log(err)
      } )
      .done(); 
    }

    Getweather = ()  =>{
    if(this.state.location == "New Taipei City")
    {
      this.setState({getweather:"%E6%96%B0%E5%8C%97%E5%B8%82"})
    }
    else{
      this.setState({getweather:"%E8%87%BA%E5%8C%97%E5%B8%82"})
    }
          let parameters = new FormData();
          this.forceUpdate();
          var queryURL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-681C8261-0F9A-4204-8B7E-45601731DD3B&format=JSON&locationName='+this.state.getweather+'&elementName=Wx,MinT,MaxT';
          fetch(queryURL,{
            method: 'GET',
            //body: parameters
                })
        // response.json() => 把 response 的資料轉成 json
        // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
        .then((response) => response.json() )
        .then((responseData) =>  { 
          //要傳給+7的資料
          this.setState({getW_number:responseData.records.location[0].weatherElement[0].time[0].parameter.parameterValue}) 
          //console.log(this.state.getW_number)
          var mint = parseInt(responseData.records.location[0].weatherElement[1].time[0].parameter.parameterName)
          var maxt = parseInt(responseData.records.location[0].weatherElement[2].time[0].parameter.parameterName)
          var temp = parseInt((mint+maxt)/2)
          this.setState({temp:temp})
         console.log(this.state.temp)
         /* for (var i = 0 ; i < 3;i++) {
          this.state.NTPWeather.push({
              LocationName:responseData.records.location[0].locationName,
              Weather:responseData.records.location[0].weatherElement[0].time[i].parameter.parameterName,
              MinT:responseData.records.location[0].weatherElement[1].time[i].parameter.parameterName,
              MaxT:responseData.records.location[0].weatherElement[2].time[i].parameter.parameterName,
              Time:responseData.records.location[0].weatherElement[0].time[i].endTime,
            })   
          }
          for (var i = 0 ; i < 3;i++) {
          this.state.TPWeather.push({
              LocationName:responseData.records.location[1].locationName,
              Weather:responseData.records.location[0].weatherElement[0].time[i].parameter.parameterName,
              MinT:responseData.records.location[1].weatherElement[1].time[i].parameter.parameterName,
              MaxT:responseData.records.location[1].weatherElement[2].time[i].parameter.parameterName,
              Time:responseData.records.location[1].weatherElement[0].time[i].endTime,
            })   
          }*/
          //console.log(this.state.NTPWeather)
          //console.log(this.state.TPWeather)
          //console.log("test:")
          //console.log(responseData.records.location[0].weatherElement[0])
          /*for (var i = 0 ; i < this.state.Gallery[i].Img.length;i++) {
          this.state.img.push(this.state.Gallery.Img[])       
          }*/
          //this.setState({isLoading:false})
        })
        .catch((error) => {
          console.warn(error);
        })
        .done();
    }

    checkNumber = (theObj) => {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    }

    Check = () => {
      this.forceUpdate();
      if(this.state.checksend == false){
       if(this.state.obj_token){
        if(this.checkNumber(this.state.rulur) ==false || this.checkNumber(this.state.water) ==false || this.state.feelings ==""){
          alert("請檢查測量長度、水和心得是否輸入正確資料^.^")
        }
        else{
          if(this.state.img.length == 0 && this.state.vid.length == 0){
            alert("照片或影片至少要一張喔~!")
          }
          else if(this.state.img.length != 0 && this.state.vid.length == 0){
          this.setState({checkimage:true})
          this.SendPersonal();
          }
          else if(this.state.img.length == 0 && this.state.vid.length != 0){
          this.setState({checkvideo:true})
          this.SendPersonal();
          }
          else{
          this.setState({checkimage:true})
          this.setState({checkvideo:true})
          this.SendPersonal();
            }
          }
        }
      else{
          if(this.checkNumber(this.state.water) ==false || this.state.feelings ==""){
            alert("請檢查測量長度和心得是否輸入資料")
          }
          else{
            if(this.state.img.length == 0 && this.state.vid.length == 0){
              alert("照片或影片至少要一張喔~!")
            }
            else if(this.state.img.length != 0 && this.state.vid.length == 0){
            this.setState({checkimage:true})
            this.SendPersonal();
            }
            else if(this.state.img.length == 0 && this.state.vid.length != 0){
            this.setState({checkvideo:true})
            this.SendPersonal();
            }
            else{
            this.setState({checkimage:true})
            this.setState({checkvideo:true})
            this.SendPersonal();
            }
          }
        }
      }
      else{
        alert("今天已經發布過囉~")
      }
    }

  _pickImage = async () => {
    try {
      let pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        //aspect: [4, 3], //這是裁切
        quality: 1,
      });
      if (!pickerResult.cancelled) {
          this._compressImage(pickerResult);      
        }        
      } 
      catch (E) {
      console.log(E);
    }
  };

  _compressImage = async (pickerResult) => {
    console.log('compress');

    const manipResult = await ImageManipulator.manipulateAsync(
            pickerResult.uri,
            [{ resize: { width:500, height:500} }],
            { compress: 0.7}
        );
        console.log(manipResult);
        imagenumber++;
        this.state.img.push({key:imagenumber,image:manipResult});
        console.log(this.state.img); 
        this.forceUpdate(); 
        this.imagephoto1(this.state.img);
  }
// API : 紀錄+img : Upload_Record.aspx  ==> return : record_ID
//        mp4     : Mp4.aspx            ==> Set : record_ID 
  imagephoto1 = (item) => {
      //console.log(this.state.image1)
      //console.log(this.state.task1)
    return this.state.img.map((img) => {   
      return (           
        <View style ={styles.cameraview1} key={img.key}>
          <Image style = {styles.camera_image} 
                source={{uri:img.image.uri}}/>  
        </View>     
      )
     })
    }

    imagephoto2 = () => {
    
          //this.setState({ image1:"123"});
            //console.log(this.state.vid)
            //console.log(this.state.task1)
                return this.state.vid.map((vid) => {  
            return (           
              <View style ={styles.cameraview1} key={vid.key}>
                <Video
                source={{ uri:vid.vid}}
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
     })
    }

      _pickImageLib = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        //aspect: [4, 3],//這是裁切
        quality: 1,
      });
      if (!result.cancelled) {
        this._compressImage(result);     
      }
      this.forceUpdate();
    } catch (E) {
      console.log(E);
    }
  };
          //a[c] =result.uri;
          //console.log(a[c]);
          
          //console.log(this.state.img);
          
          //const numbers = [a];
          //console.log(numbers);
          //Object d =new Object {"image":'"+'result.uri+'"',}
          //this.state.image2.push(result[c])
        

        
        
        //const idList = Object.keys(a);
        //console.log(idList);
        //this.setState({ image:result.uri});
        
        //console.log(this.state.image);
         //console.log(result);
        //a += this.state.image+',';
        
     //return global.a.map((img) => {  
        
      //)
    // })
        //this.uploadImageAsync(result.uri)
        //global.GlobalVariable.tempphotouri = result.uri ;
        //this.props.navigation.navigate("MeasurePhotoConfirm");



      //console.log(this.state.image2);
      
      //console.log(b);
      //console.log(this.state.image2);
      



     
    //if(global.b != 0)
    //{   
      
        //console.log(this.state.img);
      /*console.log(global.b+"123")
      console.log(item)
      for (var i = 0 ; i < global.b;i++) {
      this.state.image2.push(item[i])
      console.log(this.state.image2[0])
      }*///晚上先把轉圈圈的載入用132好在來測試
      
  
    /*<View style = {styles.cameraview1}>
              <FlatList 
              data = {this.state.img} 
              keyExtractor={(item, key) =>key.toString()}
              renderItem = {({item})=>{
              return(
              <View style ={styles.cameraview1}>  
              <Text>123</Text>
              <Image style = {styles.camera_image}
                source={{uri:item.image}}/>              
              </View>       
                )}
              }
                
              />
              </View> */


    // function to take snap || click photo
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
        }
    };

    _StartRecord = async () => {
        console.log("video record started")
        if (this.camera) {
            this.setState({ recording: true }, async () => {
                const video = await this.camera.recordAsync();
                videonumber++;
                  this.state.vid.push({key:videonumber,vid:video.uri});
                //this.setState({ vid:video.uri });
                console.log(123)
                console.log(this.state.vid)
                this.forceUpdate();
            });
        }
    }

    _StopRecord = async () => {
        this.setState({ recording: false }, () => {
            this.camera.stopRecording();
            console.log("star");
            console.log(this.state.vid);
            
            this.setState({video2:true})

        });
    };


    toogleRecord = () => {
        const { recording } = this.state;
        if (recording) {
            this._StopRecord();
        } else {
            this._StartRecord();
        }
    };

    Plant_or_Animal = () =>{
      if(this.state.obj_token == "True"){
        return(
        <View style ={styles.background}>
          <View style = {styles.ruler_B}>
            <Image style = {styles.ruler}
              source={require("../../images/Re_ruler.png")}/>
          </View>

          <View style = {styles.water_B}>
            <Image style = {styles.water}
              source={require("../../images/Re_water.png")}/>
          </View>
        

        <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "公分"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(rulur) => this.setState({rulur})}
                     value={this.state.rulur}//寫入state           
                    />
        <TextInput style = {styles.inputBox2} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "毫升"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(water) => this.setState({water})}
                     value={this.state.water} //寫入state           
                    />
        </View>
        )
      }
      else{
        return(
          <View style ={styles.background}>
          <View style = {styles.ruler_B2}>
            <Image style = {styles.ruler}
            source={require("../../images/Re_ruler.png")}/>
          </View>

          <TextInput style = {styles.inputBox3} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "公分"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(rulur) => this.setState({rulur})}
                     value={this.state.rulur}//寫入state           
                    />
          </View>
        )
      }
    }



//source={uri?{uri: uri }:null}/>
  render() { 
    let { image } = this.state;
      if(this.state.isLoading){
        return(
          <ImageBackground source = {require('../../images/login_background.png')} style = {styles.login_image}>
          <View style ={styles.background}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
  else if(this.state.isLoading == false && this.state.video2){
    return (
    <ImageBackground source={require('../../images/Re_background.png')} style = {styles.background}>
   
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ 
          this.props.navigation.state.params.refresh();
          this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>

        <View style ={styles.center}>
        <View style ={styles.dateview}>
        <Text style ={styles.date}>{(this.state.currentDay.getMonth()+1)+"/"+this.state.currentDay.getDate()} </Text>
        </View>
        <TextInput style = {styles.inputtext} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "在想什麼呢?"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(feelings) => this.setState({feelings})} 
                     value={this.state.feelings}//寫入state           
                    />
        <View style ={styles.center2}>
        <ScrollView>  
        <Text style ={(styles.Title)}>照片:</Text>
        {this.imagephoto1()}
        <Text style ={(styles.Title)}>影片:</Text>
        {this.imagephoto2()}
        </ScrollView>  
        </View>
        </View>
        <TouchableOpacity style = {styles.sendbutton}  onPress={this.Check}>
        <Text style = {styles.SB_text}>發布</Text>
     </TouchableOpacity>
      <View style ={styles.PorA}>
      {this.Plant_or_Animal()}
      </View>

      <TouchableOpacity style = {styles.camera_B} onPress={this._pickImage}>
      <Image style = {styles.camera}
          source={require("../../images/Re_camera.png")}/>
     </TouchableOpacity>
     
      <TouchableOpacity style = {styles.video_B}  onPress={()=>{this.setState({video2 :false})}}>
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
    else if (this.state.video2 == false)
    {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
      return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                position: 'absolute',
                                left: 10,
                                bottom: 2,
                                right: 10
                            }}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Ionicons name="ios-reverse-camera" size={70} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.toogleRecord() }}
                            >
                                <Ionicons name="ios-radio-button-on" size={70} color={this.state.recording ? "red" : "white"} />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
                
            );
    }
  }
} 

const styles = StyleSheet.create({  
  background: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
  },
  background2: {
    resizeMode:'contain',
    flex:1,
  },
  login_image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
      container: {
      top:"30%",
      left:"20%",
      alignItems:'center',
      justifyContent:'center',
      height:"50%",
      //backgroundColor:'#333',
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
        backgroundColor:'#82ab8f',
        top:'1%',
        //left:"5%",
        position: 'absolute',
        },

        center:{
        width: '92.5%', 
        height: '49%',
        //backgroundColor:'#82ab8f',
        top:'-10%',
        //marginVertical:"10%",
        left:"4%",
        borderRadius:15,
        //marginBottom:'5%',
        //position: 'absolute',
        },
        center2:{
        width: '90%', 
        height: '55%',
        //backgroundColor:'#333',
        top:'41%',
        //marginVertical:"10%",
        left:'5%',
        borderRadius:15,
        //marginBottom:'5%',
        position: 'absolute',
        },
        dateview:{
        width: '25%', 
        height: '8%',
        //backgroundColor:'#fbfadf',
        top:'2.5%',
        alignItems:'center',
        justifyContent:'center',
        textAlign: 'center',
        borderRadius:15,
        position: 'absolute',
        },
        date:{
        fontFamily:'nunito-bold',
        fontSize: 20,
        },
        inputtext:{
        top:'10%',
        height:'30%',
        width:'90%',
        left:'5%',
        textAlignVertical:"top",
        //backgroundColor:'#333',
        borderColor: "#000000",
        borderRadius: 15, 
        fontSize:25,
        position: 'absolute',
        //borderWidth: 1,
        },
        cameraview1:{
        width: '60%', 
        height: 110,
        //backgroundColor:'#000000',
        //top:'10%',
        marginVertical:"2.5%",
        left:"20%",
        //marginBottom:'5%',
        //position: 'absolute',
        },
        cameraview2:{
        width: '60%', 
        height: 170,
        backgroundColor:'#000000',
        //top:'10%',
        marginVertical:"2.5%",
        left:"20%",
        //marginBottom:'5%',
        //position: 'absolute',
        },
        cameraview3:{
        width: '60%', 
        height: 170,
        backgroundColor:'#000000',
        //top:'10%',
        marginVertical:"2.5%",
        left:"20%",
        //marginBottom:'5%',
        //position: 'absolute',
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
        top:'87.5%',
        left:"5%",
        width: "26.52%",  
        height: "9.7%",
        position: 'absolute',
        borderRadius:15,
        },
        video_B:{
        top:'87.5%',
        left:"37%",
        width: "26.52%",  
        height: "9.7%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:15,
        },
        gallery_B:{
        top:'87.5%',
        left:"69%",
        width: "26.52%",  
        height: "9.7%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:15,
        },
        ruler_B:{
        left:"2%",
        width: "20%",  
        height: "100%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:100,
        },
        ruler_B2:{
        left:"25%",
        width: "20%",  
        height: "100%",
        backgroundColor:'#333',
        position: 'absolute',
        borderRadius:100,
        },
        water_B:{
        left:"52%",
        width: "20%",  
        height: "100%",
        position: 'absolute',
        borderRadius:100,
        },
        PorA:{
          top:'73%',
          height:'10%',
          width:'90%',
          left:'5%',
          position: 'absolute',
          //backgroundColor:'#333',
        },
    backbutton: {
    resizeMode:'stretch',
    width: "8%", 
    height: "7%",
    left:'5%',
    top:"6.5%",
    //bottom:'0%' ,
    position: 'absolute',
    //backgroundColor:'#333',
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
      resizeMode:'stretch',
    },
    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },
   
    inputBox:{
        //top:'76.5%',
        height:'75%',
        width:'22%',
        left:'25%',
        position: 'absolute',
        backgroundColor:'#FFFFFF',
        textAlign: 'center',
        borderColor: "#000000",
        borderRadius: 10, 
        fontSize:25, 
        borderWidth: 1,
    },
    inputBox2:{
        //top:'76.5%',
        height:'75%',
        width:'22%',
        left:'75%',
        position: 'absolute',
        backgroundColor:'#FFFFFF',
        textAlign: 'center',
        borderColor: "#000000",
        borderRadius: 10, 
        fontSize:25,
        borderWidth: 1,
    },
    inputBox3:{
        //top:'76.5%',
        height:'75%',
        width:'22%',
        left:'50%',
        position: 'absolute',
        backgroundColor:'#FFFFFF',
        textAlign: 'center',
        borderColor: "#000000",
        borderRadius: 10, 
        fontSize:25,
        borderWidth: 1,
    },
    Title:{  
    fontSize: 25,
    //marginVertical:'5%',
    justifyContent: 'center',
    //marginHorizontal:'5%',
  },
});  
