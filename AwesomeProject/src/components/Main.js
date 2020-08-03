import React from 'react';
import { StyleSheet, Image,Text, View ,TouchableOpacity,ImageBackground,Alert,Platform,Animated, ScrollView,Dimensions} from 'react-native';
import { Globalstyles } from '../style/Global';


export default class App extends React.Component {
  animation = new Animated.Value(0);
  
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
    }
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height; 
    var queryURL = 'http://192.192.155.112/API/level.aspx';
      let parameters = new FormData();
        

      fetch(queryURL,{
        method: 'GET',
        //body: parameters
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
      } 
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }

  state=
    {
      progressStatusValue: 0,
    }

  render() {

      const animatedStyle = {
      height : this.state.levelbar + "%"
    }
    return (
      <ImageBackground source={require('../images/menu_background.png')} style = {Globalstyles.Background}>

        <TouchableOpacity style={styles.accountbutton} onPress={()=>{ this.props.navigation.navigate("Account");}}>
          <Image style={styles.buttonimage}
          source={require("../images/account.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.announcebutton} onPress={()=>{ this.props.navigation.navigate("Announce");}}>
          <Image style={styles.buttonimage}
          source={require("../images/announcement.png")}/>
          
        </TouchableOpacity>

          

        <View style ={styles.switchingcontainer}> 
        <ScrollView horizontal>
        <View style ={styles.switchbutton}>
         <TouchableOpacity style={styles.menu2button} onPress={()=>{ this.props.navigation.navigate("Menu2");}}>
         
          <Image style={styles.switchimage,{height: Dimensions.get('window').height * 0.4, width: Dimensions.get('window').width * 0.5}}
          source={require("../images/menu2.png")}/>
          
        </TouchableOpacity>
        </View>

        <View style ={styles.switchbutton}>
        <TouchableOpacity style={styles.menu2button} onPress={()=>{ this.props.navigation.navigate("Menu2");}}>
        
          <Image style={styles.switchimage,{height: Dimensions.get('window').height * 0.4, width: Dimensions.get('window').width * 0.5}}
          source={require("../images/menu2_1.png")}/>
          
          
        </TouchableOpacity>
        </View>


          <View style ={styles.switchbutton}>
        <TouchableOpacity style={styles.menu2button} onPress={()=>{ this.props.navigation.navigate("Menu2");}}>
        
          <Image style={styles.switchimage,{height: Dimensions.get('window').height * 0.4, width: Dimensions.get('window').width * 0.5}}
          source={require("../images/menu2_2.png")}/>
          
          
        </TouchableOpacity>
        </View>

         </ScrollView>
        </View>
      
         

        <TouchableOpacity style={styles.learningbutton} onPress={()=>{alert("you clicked learningfiles")}}>
          <Image style={styles.buttonimage}
          source={require("../images/learningfiles.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapsbutton} onPress={()=>{ this.props.navigation.navigate("Map");}}>
          <Image style={styles.buttonimage}
          source={require("../images/maps.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.goodworkbutton} onPress={()=>{alert("you clicked goodwork")}}>
          <Image style={styles.buttonimage}
          source={require("../images/goodwork.png")}/>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.knowbutton} onPress={()=>{this.props.navigation.navigate("CommonRead")}}>
          <Image style={styles.buttonimage}
          source={require("../images/know.png")}/>
          
        </TouchableOpacity>

        
      
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   accountbutton: {
    resizeMode:'stretch',
    width: '12%', 
    height: '7%',
    resizeMode:'stretch',
    left:'85%',
    position: 'absolute',
    top:'5%' ,
  },
  buttonimage: {
   width: '100%', 
   height: '100%',
   resizeMode:'stretch',
  },
    announcebutton: {
   width: '12%', 
   height: '7%',
   resizeMode:'stretch',
    left:'70%',
    position: 'absolute',
    top:'5%' ,
  },
     rankbutton: {
   width: '12%',
   height: '7%',
   resizeMode:'stretch',
    left:'55%',
    position: 'absolute',
    top:'5%' ,
  },
    learningbutton: {
    resizeMode:'stretch',
    width: "45%", 
    height: "20%",
    left:'5%',
    bottom:'25%' ,
    position: 'absolute',
  },
  menu2button: {
    //resizeMode:'stretch',
    //width: "60%", 
    //height: "42%",
    //left:'20%',
    //bottom:'44%' ,
    //position: 'absolute',
    
  },
  knowbutton: {
   width: "45%", 
    height: "20%",
   resizeMode:'stretch',
    left:'51%',
    position: 'absolute',
    bottom: '25%',
  },
  mapsbutton: {
    resizeMode:'stretch',
    width: "45%", 
    height: "20%",
    left:'5%',
    bottom:'3%' ,
    position: 'absolute',
  },
    goodworkbutton: {
    resizeMode:'stretch',
    width: "45%", 
    height: "20%",
    left:'51%',
    bottom:'3%' ,
    position: 'absolute',
  },


  switchingcontainer:{
    width:'100%',
    height:'40%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:'15%',
   //paddingHorizontal:'5%'
    
  },
  switchimage:{
    
    resizeMode:'stretch',
  },
  switchbutton:{
    
    alignItems: 'center',
    marginHorizontal:50,
  },
  
  
});