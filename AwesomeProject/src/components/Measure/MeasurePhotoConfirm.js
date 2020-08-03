import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import '../../data/GlobalVariable.js';


  
export default class App extends React.Component { 
  constructor(props) 
        {
        super(props);

        this.state = {tempphotouri:''};

        this.state.tempphotouri = global.GlobalVariable.tempphotouri;

        }
        
   uploadImageAsync = (api)  =>{
    let apiUrl = 'https://observerplus.club/API/Img.aspx';
      var data = new FormData();  
      data.append("file",{  
        uri:api,
        name:"file",
        type:"image/jpg",
        
      })
      fetch(apiUrl, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: data
      }).then(response => response.text())
      .then(response => {
          console.log('succ ')
          //console.log(response)
          this.props.navigation.navigate("Measure");
        }
        ).catch(err => {
        console.log('err ')
        console.log(err)
      } )
      .done(); 
    }


  /*uploadVideo = (videouri)  => {
  let apiUrl = 'https://observerplus.club/API/Mp4.aspx';
    var data = new FormData();  
    data.append('file', {  
      uri: videouri,
      name: 'file',
      type: 'video/mp4'
    })

    fetch(apiUrl, {  
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(
      response => {
        console.log('succ ')
        console.log(response.json())
      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } )
    .done();
  }*/

  render() {  
    return (
        
    <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.navigate("Main");}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>

    
    
      
        <View style ={styles.container}>
      
      <Image source={{uri:this.state.tempphotouri}} style={{ width: '100%', height: '100%' ,resizeMode:'stretch'}} />

      <TouchableOpacity style = {styles.button} onPress={()=>{this.uploadImageAsync(this.state.tempphotouri);}}>
      
        <Text style ={styles.buttonText}>確認上傳</Text>
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
      height:"70%",
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

});  
