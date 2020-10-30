import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground} from 'react-native';
import '../../data/GlobalVariable.js';
  
export default class App extends React.Component {  
  render() {  
    return (
     <ImageBackground source={require('../../images/Track_growth.png')} style = {styles.background}>   
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.navigate("Main");}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>
    <View style = {styles.containerbox}>
    <View style = {styles.container3}>
      <Text style={styles.text}> 用戶資料</Text>
    </View>
    <View style = {styles.container}>
    <View style = {styles.card}>
      <Text style={styles.welcome}> Name</Text>  
    <View style = {styles.accountcontainer}>
    <Text style={styles.welcome}> 帳號 </Text>
    <Text style={styles.welcome}> {global.GlobalVariable.account} </Text>
    </View>
    <View style = {styles.accountcontainer}>
    <Text style={styles.welcome}> 密碼 </Text>  
    <Text style={styles.welcome}> ****** </Text>
      </View>
      </View>

      <TouchableOpacity style = {styles.button} onPress={()=>{ this.props.navigation.replace("SignIn");}}>
      
        <Text style ={styles.buttonText}>登出</Text>
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
    backgroundColor:'#ffffff',
  },
    containerbox: {
      //backgroundColor:'#333',
      //justifyContent:'center',
      height:"70%",
      top:"20%",
    },
      container: {
      alignItems:'center',
      //backgroundColor:'#333',
      //justifyContent:'center',
      height:"35%",
    },
      container2: {
      alignItems:'center',
      //justifyContent:'center',
      height:"25%",
      //top:'3%'
      
    },
      container3: {
      alignItems:'flex-start',
      marginTop:'8%',
      marginLeft:'4%',
      marginVertical:"3%",
    },
      text: {
      fontSize:30,
    
    },
    card:{
        height:"100%",
        width:"90%",
        backgroundColor:"#FBFADF",
        borderRadius:10,
        elevation:10,
        alignItems:'flex-start',
        //position:'absolute',
        //padding:0,
        
      },
      card2:{
        height:"100%",
        width:"90%",
        backgroundColor:"#FBFADF",
        borderRadius:10,
        elevation:10,
        alignItems:'flex-start',
        //position:'absolute',
        
        //padding:0,
      },
      upperspace:{
        width: '100%', 
         height: '10%',
         marginBottom:'5%'
        },
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
  } ,
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
      button:{
        width:150,
        backgroundColor:'#faa45b',
        borderRadius:25,
        marginVertical:10,
        paddingVertical : 4,
        marginTop:'10%'
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        textAlign :'center',
    },
    accountcontainer:{
  flexDirection: 'row',
  justifyContent: 'flex-start',
},
});  
