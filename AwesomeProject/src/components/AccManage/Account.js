import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import '../../data/GlobalVariable.js';
  
export default class App extends React.Component {  
  render() {  
    return (
        
    <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.navigate("Main");}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
    <View style = {styles.container}>
    <View style = {styles.card}>
      <Text style={styles.welcome}> Name</Text>  
    </View>
    </View>
    <View style = {styles.container3}>
      <Text style={styles.text}> 用戶設定</Text>
      </View>
    <View style = {styles.container2}>
    <View style = {styles.card2}>
    <View style = {styles.accountcontainer}>
    <Text style={styles.welcome}> 帳號 </Text>
    <Text style={styles.welcome}> {global.GlobalVariable.account} </Text>
    </View>
    <View style = {styles.accountcontainer}>
    <Text style={styles.welcome}> 密碼 </Text>  
    <Text style={styles.welcome}> {global.GlobalVariable.password} </Text>
      </View>
      </View>

      <TouchableOpacity style = {styles.button} onPress={()=>{ this.props.navigation.replace("SignIn");}}>
      
        <Text style ={styles.buttonText}>登出</Text>
     </TouchableOpacity>
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
      container2: {
      alignItems:'center',
      //justifyContent:'center',
      height:"15%",
      top:'3%'
      
},
      container3: {
      alignItems:'flex-start',
      marginTop:'8%',
      marginLeft:'4%'
    
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
    accountcontainer:{
  flexDirection: 'row',
  justifyContent: 'flex-start',
},
});  
