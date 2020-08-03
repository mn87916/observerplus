import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground,Animated} from 'react-native';
import { Globalstyles } from '../style/Global';
import '../data/GlobalVariable.js';
  
export default class App extends React.Component {  

 onLevelPress ()  
    {
     this.setState(previousState => ({ content: !previousState.content }))
    }

    constructor() {
    super();
    this.state = {
      content: false,
      levelscore: 0,

      viewState : true,
      levelbar: 0,
      levelstep:0,
    }
    var queryURL = 'https://observerplus.club/API/Level.aspx';
        let parameters = new FormData();
        parameters.append("account", global.GlobalVariable.account);
        parameters.append("password", global.GlobalVariable.password);

  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      if (responseData) {
        // 接到 Data
        console.log(responseData);
        this.state.levelscore = responseData.CurrentScore;
        this.state.levelbar = responseData.LevelStep;
        this.state.levelbar = (this.state.levelbar - 1)*25;
        this.state.levelstep = responseData.LevelStep;
         this.forceUpdate()
      } 
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }

  render() {  
    const animatedStyle = {
      height : this.state.levelbar + "%"
    }
    return (
        
        


         <ImageBackground source={require('../images/menu2_background.png')} style = {Globalstyles.Background}>

         <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.buttonimage}
          source={require("../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.recordbutton} onPress={()=>{ this.props.navigation.navigate("Record");}}>
          <Image style={styles.buttonimage}
          source={require("../images/record.png")}/>
          
        </TouchableOpacity>

         <TouchableOpacity style={styles.measurebutton} onPress={()=>{ this.props.navigation.navigate("Measure");}}>
          <Image style={styles.buttonimage}
          source={require("../images/measure.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.photosbutton} onPress={()=>{this.props.navigation.navigate("Gallery");}}>
          <Image style={styles.buttonimage}
          source={require("../images/photos.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.missionbutton} onPress={()=>{this.props.navigation.navigate("Task");}}>
          <Image style={styles.buttonimage}
          source={require("../images/mission.png")}/>
          
        </TouchableOpacity>
        <TouchableOpacity style = {styles.levelbutton}
           onPress={() =>this.onLevelPress()}>
                    
                        
          <Text style ={styles.levelbuttonText}>等級 {this.state.levelstep}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rankbutton} onPress={()=>{ this.props.navigation.navigate("Rank");}}>
          <Image style={styles.buttonimage}
          source={require("../images/rank.png")}/>
          
        </TouchableOpacity>

        

      <View style={styles.container}>

       {
        this.state.content ? 
        <View style = {styles.leveldetailcontainer}>
        <View style={styles.card}>
        <View style ={styles.levelscoretextcontainer}>
          <Text style={styles.leveltext}>目前積分  </Text>
          <Text style={styles.levelscoretext}>{this.state.levelscore}</Text>
          <Text style={styles.leveltext}>  分 </Text>
        </View>
        <TouchableOpacity style = {styles.closebutton}
           onPress={this.onLevelPress.bind(this)}>        
            <Image style={styles.buttonimage}
          source={require("../images/close.png")}/>
        </TouchableOpacity>
          <View style={styles.progresscontainer}>
            <Animated.View style={[styles.innerStyle,animatedStyle]}/>
            
          </View>
          <View style ={styles.levelsectiontextcontainer}>
          <Text style={styles.levelsectiontext}>---Lv5 </Text>
          <Text style={styles.levelsectiontext}>---Lv4 </Text>
          <Text style={styles.levelsectiontext}>---Lv3  </Text>
          <Text style={styles.levelsectiontext}>---Lv2 </Text>
          <Text style={styles.levelsectiontext}>---Lv1 小幫手 </Text>
          </View>
          <View style ={styles.bottomspace}>

          </View>
          </View>
         </View> : null
       }
      </View>

        </ImageBackground>

    );  
  }  
} 

const styles = StyleSheet.create({  
  container:{
    flex:1,
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
     rankbutton: {
   width: '12%',
   height: '7%',
   resizeMode:'stretch',
    left:'80%',
    position: 'absolute',
    top:'5%' ,
  },

   recordbutton: {
   width: "45%", 
    height: "20%",
   resizeMode:'stretch',
    left:'3%',
    position: 'absolute',
    bottom: '50%',
  },
  measurebutton: {
   width: "45%", 
    height: "20%",
   resizeMode:'stretch',
    left:'53%',
    position: 'absolute',
    bottom: '50%',
  },
  photosbutton: {
   width: "45%", 
    height: "20%",
   resizeMode:'stretch',
    left:'3%',
    position: 'absolute',
    bottom: '20%',
  },
  missionbutton: {
   width: "45%", 
    height: "20%",
   resizeMode:'stretch',
    left:'53%',
    position: 'absolute',
    bottom: '20%',
  },

  buttonimage: {
   width: '100%', 
   height: '100%',
   resizeMode:'stretch',
  },
  levelbutton:{
    left:'55%',
    bottom:'73%',
    width:150,
    backgroundColor:'#FBFADF',
    borderRadius:25,
    paddingVertical : 4,
    position: 'absolute',
  },

  levelbuttonText:{
    fontSize:25,
    fontWeight:'500',
    color:'#000000',
    textAlign :'center',
  },
  leveldetailcontainer: {  
      flex:1,
      alignItems:'center',
      justifyContent:'center',    
  }  ,
  card:{
      height:"80%",
      width:"90%",
      backgroundColor:"#FBFADF",
      borderRadius:15,
      borderWidth: 1,
      borderColor: "#000000",
      //elevation:30,
      //padding:10,
  },
  header: {
      flexDirection:"row",
  },
  headerText: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold"
  },
  progresscontainer: {
      width: "10%",
      height: "80%",
      padding: 3,
      borderColor: "#000000",
      borderWidth: 2,
      borderRadius: 30,
      left:"8%",
      top: "15%",
      justifyContent: "flex-end",
      position:"absolute",
      backgroundColor:"#d9cfc5",
    },
  innerStyle:{
      width: '100%',
      height: '100%',
      borderRadius: 16,
      backgroundColor:"#faa45b",
    },


  levelscoretextcontainer:{
      left:'4%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
    },
  leveltext:{
      fontSize:25,
    },
  levelscoretext:{
      fontSize:60,
    },
  levelsectiontextcontainer:{
      justifyContent:'space-between',
      flex: 1,
    },
  levelsectiontext:{
      left:'20%',
      fontSize:30,
    },
  closebutton: {
      width: '13%', 
      height: '8%',
      resizeMode:'stretch',
      left:'83%',
      position: 'absolute',
      top: '3%',
    },
  bottomspace:{
      width: '100%', 
      height: '3%',
    }
  
});  
