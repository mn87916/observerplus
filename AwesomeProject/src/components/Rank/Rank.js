import React, {Component} from 'react';  
import {Platform,ImageBackground,ActivityIndicator, StyleSheet,FlatList,ScrollView, Text, View,TouchableOpacity,Image} from 'react-native';
import '../../data/GlobalVariable.js';
  
export default class App extends React.Component {  
  constructor() {
    super();
    this.state = {
      rank:[],
      myrank:[],
      levelscore: 0,
      levelstep: 0,
      number: 0,
      isLoading:true,
      }
    }

      componentDidMount()
  {
      global.a = [];
      var queryURL = 'https://observerplus.club/API/Rank.aspx';
        let parameters = new FormData();
        parameters.append("account", global.GlobalVariable.account);
        parameters.append("password", global.GlobalVariable.password);
        parameters.append("obj_ID", this.props.navigation.getParam('obj_key'));

      fetch(queryURL,{
      method: 'POST',
      body: parameters
    })
      // response.json() => 把 response 的資料轉成 json
      // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
      .then((response) => response.json() )
      .then((responseData) => { 
        for (var i = 0 ; i < responseData.length-1;i++) {
        this.state.rank.push(responseData[i]) 
        this.state.number += 1;
        }
        console.log(this.state.rank)
        console.log(this.state.number)
        this.setState({ myrank:responseData[this.state.number] });
        this.setState({ isLoading: false });  
        console.log(this.state.myrank)
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
    }

  render() {  
    if(this.state.isLoading){
        return(
          <View style ={styles.background}>
          <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
    else{
    return (
    <ImageBackground source={require('../../images/Rank_Background.png')} style = {styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>
        </View> 
        <View style ={(styles.MyReallyCard)}> 
          <Text style ={(styles.Ranknumber)}>{this.state.myrank.rank}</Text>
          <Text style ={(styles.Rankname)}>{this.state.myrank.name}</Text>
          <Text style ={(styles.Ranklevel)}>{"等級:"+this.state.myrank.levelname}</Text>   
          <Text style ={(styles.RankScore)}>{this.state.myrank.score+"分"}</Text>  
        </View>  
    <View style = {styles.RankCard}>
    <FlatList data = {this.state.rank} 
        keyExtractor={(item, key) =>key.toString()}
        renderItem = {({item})=>{
        return(
        <ScrollView>     
        <View style ={(styles.ReallyCard)}>    
            <Text style ={(styles.Ranknumber)}>{item.rank}</Text>
            <Text style ={(styles.Rankname)}>{item.name}</Text>
            <Text style ={(styles.Ranklevel)}>{"等級:"+item.levelname}</Text>   
            <Text style ={(styles.RankScore)}>{item.score+"分"}</Text>  
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
} 

const styles = StyleSheet.create({  
  background: {
    flex:1,
    backgroundColor:'#ffffff',
    resizeMode:'contain',
    justifyContent:'center',
  },
    RankCard:{  
    height:"65%",
    width:"100%",
    top:'15%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    justifyContent: 'center',
    //marginBottom:'10%',
    //backgroundColor:'#d9cfc5',
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
        width: '70%', 
        height: '7.5%',
        //marginBottom:'5%',
        position:'absolute',
        top:'3%',
        left:'3%',
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
    borderRadius:10,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#e5f08a',
    //justifyContent: 'center',
    marginHorizontal:"12.5%",
    height:70,
    width:"75%",
    
    
        /*marginHorizontal:"10%",
        backgroundColor:"#d9cfc5",
        borderRadius:10,
        elevation:10,
        marginVertical:"2.5%",
        //alignItems:'center',
        //padding:15,*/
  },  
  MyReallyCard:{  
    fontFamily:'nunito-bold',
    borderRadius:10,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#ffb3b3',
    //justifyContent: 'center',
    marginHorizontal:"12.5%",
    height:70,
    width:"75%",
    position:'absolute',
    top:'15%',
  },  
  Ranklevel:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'-10%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    top:'35%',
    left:'50%',

  },  
  RankScore:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'15%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    left:'70%',
    //top:'1%',

  },
  Ranknumber:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'10%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    //top:'1%',
  },
  Rankname:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'10%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    position:'absolute',
    left:"15%"
    //top:'1%',
  },
  toptext:{
    fontSize: 30,
    position:'absolute',
    top:'7.5%',
    left:'40%',
  }
});  
