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

     Alert.alert('測試',JSON.stringify(this.state.location))
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
          source={{html:`
          <html>

    <head>
    
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
               
                <script type="text/javascript" src="http://api.tgos.tw/TGOS_API/tgos?ver=2&AppID=x+JLVSx85Lk=&APIKey=in8W74q0ogpcfW/STwicK8D5QwCdddJf05/7nb+OtDh8R99YN3T0LurV4xato3TpL/fOfylvJ9Wv/khZEsXEWxsBmg+GEj4AuokiNXCh14Rei21U5GtJpIkO++Mq3AguFK/ISDEWn4hMzqgrkxNe1Q=="charset="utf-8"></script>
    
               <script type="text/javascript">
    
                         var messageBox;                    //訊息視窗物件  
    
                         var pMap;                      //初始化地圖物件
    
                         //-----------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定----------------------
    
                         var infotext =  ['<B>世新大學'];        //依序填入地標名稱及訊息視窗內容, 可自行增減數量
    
                         var markerPoint = [new TGOS.TGPoint(304926.924,2764627.737)];        //依序填入地標坐標位置, 坐標數須與標記數一致
    
                         var startPoint = new TGOS.TGPoint(304926.9247, 2764627.737);       
    
                         var imgUrl = ["http://api.tgos.tw/TGOS_API/images/marker2.png"];                //依序設定標記點圖示來源

                         var currentlocUrl = "http://api.tgos.tw/TGOS_API/images/marker1.png";

                         var mapTypeID = new TGOS.TGMapTypeId(F2IMAGE);

                        
    
                         //--------------------若網頁介面依照範例網頁的預設設定,以下程式碼可不修改--------------------------
    
                         function InitWnd()
    
                         {
    
                                    //------------------初始化地圖--------------------
                                   
                                    var pOMap = document.getElementById("OMap");
    
                                    var mapOptiions = {
    
                                               scaleControl: true,                //顯示比例尺
    
                                               navigationControl: true,     //顯示地圖縮放控制項
    
                                               navigationControlOptions: {        //設定地圖縮放控制項
    
                                                         controlPosition: TGOS.TGControlPosition.TOP_RIGHT,  //控制項位置
    
                                                         navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL,       //控制項樣式

                                                         
                                               },
    
                                               mapTypeControl: false,    //不顯示地圖類型控制項

                                             
    
                                    };
    
                                    pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826, mapOptiions,);    //EPSG3826 TWD97以X,Y順序為主；Google坐標系統的EPSG:3857 放大就沒東西
    
                                    pMap.setZoom(9);                                     //初始地圖縮放層級

                                    //pMap.setMapTypeId(mapTypeID);
    
                                   pMap.setCenter(startPoint);      //初始地圖中心點
                                  
                                  
                                    
    
                for(var i = 0; i < infotext.length; i++) {
    
                    //------------------建立標記點---------------------
    
                    var markerImg = new TGOS.TGImage(imgUrl[i], new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
    
                    var pTGMarker = new TGOS.TGMarker(pMap, markerPoint[i],'', markerImg, {flat:false});   //建立機關單位標記點

                    TGOS.TGEvent.addListener(pTGMarker, 'click', function () { window.ReactNativeWebView.postMessage("SHU"); } ); //滑鼠事件監聽
    
                    //-----------------建立訊息視窗--------------------
    
                    var InfoWindowOptions = {
    
                          maxWidth:4000,         //訊息視窗的最大寬度
    
                          pixelOffset: new TGOS.TGSize(5, -30) //InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負 
    
                    };             
    
                          messageBox= new TGOS.TGInfoWindow(infotext[i], markerPoint[i], InfoWindowOptions);   //建立訊息視窗                                                                  
    
                                               TGOS.TGEvent.addListener(pTGMarker, "mouseover", function (pTGMarker, messageBox) {
    
                                                         return function () {                  
    
                                                                    messageBox.open(pMap, pTGMarker);
    
                                                         }
    
                    } (pTGMarker, messageBox));//滑鼠監聽事件--開啟訊息視窗
    
                                               TGOS.TGEvent.addListener(pTGMarker, "mouseout", function (messageBox) {
    
                                                         return function () {
    
                                                                    messageBox.close();
    
                                                         }
    
                                               } (messageBox));
    
                                    }    
    
                         }
    
            function WGS84toTWD97(long , lat)  //將WGS84坐標系統轉換為TWD97(台灣)坐標系統
    
            {
   
            var TT = new TGOS.TGTransformation();
    
            TT.wgs84totwd97(long,lat);
    
           //alert(TT.transResult.x + "," +TT.transResult.y);

              MoveCurrentLocation(TT.transResult.x,TT.transResult.y)
            }

            function MoveCurrentLocation(long,lat)
            {
              var CurrentPoint = new TGOS.TGPoint(long, lat);

              var markerImg = new TGOS.TGImage(currentlocUrl, new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
    
              var pTGMarker = new TGOS.TGMarker(pMap, CurrentPoint,'', markerImg, {flat:false});  

              pMap.setCenter(CurrentPoint);
              
            }
             
    
               </script>
    
    </head>
    
    <body style="margin:0px" onload="InitWnd();">

    
    
     <div id="OMap" style=" width:100%; height: 100%; border:0px solid #000000;"></div>
    
    </html>
`}}
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