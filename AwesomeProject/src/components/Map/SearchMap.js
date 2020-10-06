import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Alert,FlatList,ActivityIndicator} from 'react-native';
import '../../data/GlobalVariable.js';
import { WebView } from 'react-native-webview';
  
export default class App extends React.Component {

  componentWillUnmount(){
    const {params} = this.props.navigation.state;
    params.callHome();
  }

  onSearchPress(){
    this.state.searchresult= [];
    this.webref.injectJavaScript(`searchmarker('`+ this.state.search_text+`')`);
  }

  constructor(props) {
    super(props);

    this.state = {
      search_text:null,
      searchresult:[],
      isLoading:true,
    };

  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  GetItem (item) {
    global.GlobalVariable.searchoption = item;
    this.props.navigation.goBack();
  }


  render() {

    return (
    <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{this.props.navigation.goBack();global.GlobalVariable.searchtext = ''; }}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>
        </View>
      
        <View style = {styles.searchview}>
            <TextInput style = {styles.inputBox} placeholder = "搜尋座標" underlineColorAndroid= 'rgba(0,0,0,0)' defaultValue = {global.GlobalVariable.searchtext} onChangeText={(search_text) => this.setState({search_text})}/>
            <TouchableOpacity style = {styles.searchbutton} onPress = {this.onSearchPress.bind(this)}>
              <Image style={styles.buttonimage} source={require("../../images/glass.png")}/>
            </TouchableOpacity>
        </View>

      {this.state.isLoading ?
        <View style = {styles.container}>
          <ActivityIndicator size = {80} color="#4d805e"/> 
        </View> : null
      }
       <FlatList
          data={this.state.searchresult}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
         />
       
        <View style = {styles.invisible}>
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
            if(message.command === 'searchresult'){   //接收搜尋結果
              for(var i = 0 ; i < message.payload.result.length ; i++){
                this.state.searchresult.push({key:message.payload.result[i]});
              }
              //console.log(message.payload.result);
            }
            else if(message.command === 'doneloading'){   //地圖讀取完畢
              this.state.search_text = global.GlobalVariable.searchtext;
              this.onSearchPress();
              this.state.isLoading = false;
            }
            
            if(this.state.content == false){
              this.setState(previousState => ({ content: !previousState.content }))
            }
            this.forceUpdate();
          }}
          />
        </View>
      </View>
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
      buttonimage: {
       width: '100%', 
       height: '100%',
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
      width:'82%',
      marginLeft:'2%',
      height:'10%',
    },
    searchbutton:{
       width:'15%',
    },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
