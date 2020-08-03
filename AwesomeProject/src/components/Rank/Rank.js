import React, {Component} from 'react';  
import {Platform,ImageBackground, StyleSheet,FlatList,ScrollView, Text, View,TouchableOpacity,Image} from 'react-native';
import '../../data/GlobalVariable.js';
  
export default class App extends React.Component {  
  constructor() {
    super();
    this.state = {
      rank:"",
      levelscore: 0,
      levelstep: 0,
    }
    
    var queryURL = 'https://observerplus.club/API/Rank.aspx';
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
        this.setState({rank:responseData})
        console.log(this.state.rank);
      } 
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }
  render() {  
    return (
    <ImageBackground source={require('../../images/announcement_background.png')} style = {styles.background}>
     <Text style ={(styles.toptext)}>排名</Text>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
    <View style = {styles.card}>
    <FlatList data = {this.state.rank} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>   
        <View style ={(styles.ReallyCard)}>    
            <Text style ={(styles.AnnounContent)}>{item.rank+'.'}{item.name}</Text>
            <Text style ={(styles.AnnounTitle)}>{"等級:"+item.level}</Text>   
            <Text style ={(styles.AnnounDate)}>{item.score+"分"}</Text>  
          </View>       
        </ScrollView>
        );
      }}
      />   
    </View>
    </ImageBackground>
    );  
  }  
} 

const styles = StyleSheet.create({  
  background: {
    flex:1,
    backgroundColor:'#ffffff',
    resizeMode:'contain',
    justifyContent:'center',
  },
    card:{
    //top:'15%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    justifyContent: 'center',
    //marginBottom:'2.5%',

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
        width: '90%', 
        height: '6%',
        //marginBottom:'5%',
        position:'absolute',
        top:'3%',
        left:'6%',
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
    //bottom:'0%' ,
    position: 'absolute',
  },
  back: {
   width: "100%", 
   height: "100%",
   //resizeMode:'stretch',
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
  ReallyCard:{  
    fontFamily:'nunito-bold',
    borderRadius:30,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#d9cfc5',
    justifyContent: 'center',
    marginHorizontal:"10%",
    height:100,
    width:"80%",
        /*marginHorizontal:"10%",
        backgroundColor:"#d9cfc5",
        borderRadius:10,
        elevation:10,
        marginVertical:"2.5%",
        //alignItems:'center',
        //padding:15,*/
  },  
AnnounTitle:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    marginVertical:'15%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    top:'1%',
    left:'50%',

  },  
  AnnounDate:{
    fontFamily:'nunito-bold',
    fontSize: 28,
    marginVertical:'15%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    //left:'35%',
    top:'1%',

  },
  AnnounContent:{
    fontFamily:'nunito-bold',
    fontSize: 30,
    marginVertical:'10%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    //top:'1%',

  },
  toptext:{
    fontSize: 30,
    position:'absolute',
    top:'7.5%',
    left:'40%',
  }
});  
