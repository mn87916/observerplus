import React from 'react';
import { StyleSheet, Image,Text,ActivityIndicator,FlatList, View ,TouchableOpacity,ImageBackground,Alert,Platform,Animated, ScrollView,Dimensions} from 'react-native';
import { Globalstyles } from '../style/Global';


export default class App extends React.Component {
  animation = new Animated.Value(0);
  constructor() {
    super();
    this.state = {
      main:'',
      content: false,
      levelscore: 0,
      viewState : true,
      levelbar: 0,
      isLoading:true,
    }
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;   
  }

  componentDidMount()
  {
    this.state.main = global.GlobalVariable.main;
    console.log(this.state.main)
    this.forceUpdate();
    this.setState({ isLoading: false });
  }

  ImageColor = (item)=>
  {
    if(item.obj_key % 3 == 1)
    {
      return(
        <TouchableOpacity style={styles.menu2button,{height: Dimensions.get('window').height * 0.5, width: Dimensions.get('window').width * 0.55}} onPress={()=>{ this.props.navigation.navigate("Menu2",item);}}>
        <Image style={styles.switchimage}
          source={require("../images/menu2.png")}>
          </Image>
          <View style ={styles.bookname_1}>
         <Text style ={styles.T_bookname}>{item.obj_name}</Text>
         </View>
         </TouchableOpacity>
      )
    }
    else if(item.obj_key % 3 == 2)
    {
      return(
        <TouchableOpacity style={styles.menu2button,{height: Dimensions.get('window').height * 0.5, width: Dimensions.get('window').width * 0.55}} onPress={()=>{ this.props.navigation.navigate("Menu2",item);}}>
        <Image style={styles.switchimage}
          source={require("../images/menu2_1.png")}>
          </Image>
          <View style ={styles.bookname_2}>
         <Text style ={styles.T_bookname}>{item.obj_name}</Text>
         </View>
         </TouchableOpacity>
      )
    }
    else
    {
      return(
        <TouchableOpacity style={styles.menu2button,{height: Dimensions.get('window').height * 0.5, width: Dimensions.get('window').width * 0.55}} onPress={()=>{ this.props.navigation.navigate("Menu2",item);}}>
        <Image style={styles.switchimage}
          source={require("../images/menu2_2.png")}>
          </Image>
          <View style ={styles.bookname_3}>
         <Text style ={styles.T_bookname}>{item.obj_name}</Text>
         </View>
         </TouchableOpacity>
      )
    }
  }
  render() {
      const animatedStyle = {
      height : this.state.levelbar + "%"
    }
    if(this.state.isLoading){
        return(
          <ImageBackground source = {require('../images/login_background.png')} style = {styles.login_image}>
          <View style ={styles.background}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
  else{
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
        <FlatList horizontal data = {this.state.main.obj_list} 
        keyExtractor={(item,obj_key) =>obj_key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView >
        <View style ={styles.switchbutton}>    
         {this.ImageColor(item)}     
        </View>
         </ScrollView>
           );
        }}
        />       
        </View>

        <TouchableOpacity style={styles.mapsbutton} onPress={()=>{ this.props.navigation.navigate("Map");}}>
          <Image style={styles.buttonimage}
          source={require("../images/maps.png")}/>       
        </TouchableOpacity>
        <TouchableOpacity style={styles.goodworkbutton} onPress={()=>{ this.props.navigation.navigate('CommonRead', {refresh:()=>this.componentDidMount()});}}>
          <Image style={styles.buttonimage}
          source={require("../images/know.png")}/>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
  }
}

const styles = StyleSheet.create({
  background: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'contain',
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
    login_image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
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
    //width: "50%", 
    //height: "100%",
    //left:'20%',
    //bottom:'44%' ,
    //position: 'absolute',
    //backgroundColor:'#333',
    
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
    top:"72.5%",
    position: 'absolute',
    //backgroundColor:'#333',
  },
    goodworkbutton: {
    resizeMode:'stretch',
    width: "45%", 
    height: "20%",
    left:'51%',
    top:"72.5%",
    position: 'absolute',
  },


  switchingcontainer:{
    width:'100%',
    height:'50%',
    justifyContent: 'center',
    alignItems: 'center',
    top:"-9%",
   //paddingHorizontal:'5%'
   //backgroundColor:'#333',
    
  },
  switchimage:{
    width:"100%",
    height:"100%",
    resizeMode:'stretch',
  },
  switchbutton:{
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:30,
  },
  bookname_1:{
    left:'15%',
    top:'27.5%' ,
    width:"60%",
    position: 'absolute',
    textAlign :'center',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#333',
  },
    bookname_2:{
    left:'30%',
    top:'18%' ,
    width:"35%",
    height:"15%",
    position: 'absolute',
    //backgroundColor:'#333',
    textAlign :'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
    bookname_3:{
    left:'30%',
    top:'18%' ,
    width:"35%",
    height:"15%",
    position: 'absolute',
    //backgroundColor:'#333',
    textAlign :'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  T_bookname:{
    fontSize:20,
    fontFamily:'nunito-bold',
  },
});