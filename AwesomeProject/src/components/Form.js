import React, { Component } from 'react';
import { StyleSheet, ImageBackground,Text, View ,TextInput, TouchableOpacity,Alert,Navigator} from 'react-native';
import { getCurrentFrame } from 'expo/build/AR';
import '../data/GlobalVariable.js';


export default class Form extends Component{
        constructor(props) 
        {
        super(props);

        this.state = {user_txt: '',pass_txt: ''};
        this.state = {somedata: ''};
        
        }
    onButtonPress ()  
    {

        Alert.alert('測試','帳號為：'+this.state.user_text+'，密碼為：'+this.state.pass_text)


        var queryURL = 'https://observerplus.club/API/login.aspx';
        let parameters = new FormData();
        parameters.append("accound", this.state.user_text);
        parameters.append("password", this.state.pass_text);
        global.GlobalVariable.account = this.state.user_text;
        global.GlobalVariable.password = this.state.pass_text;


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
        
            if(responseData.result == "Successful")
         {
          this.state = {
            somedata: responseData.somedata
          }
          

          this.props.navigation.replace("Mainmenu");
        }
        else
        {
          Alert.alert('帳號或密碼錯誤')
        }
      } 
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
    }


    render(){
        return(      
          <ImageBackground source = {require('../images/login_background.png')} style = {styles.image}>   
                <View style = {styles.container}>
                  
                    <View style={styles.card}>
                        <View style={styles.header}>
                        
                    <Text style={styles.title}>
                        歡迎進入你的小菜園</Text>
                        </View>
                    

                    <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "帳號"
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state
                     
                    />
                    <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                     placeholder = "密碼"
                     secureTextEntry={true}
                     placeholderTextColor = "#ADADAD"
                     onChangeText={(pass_text) => this.setState({pass_text})}
                    />

                    <TouchableOpacity style = {styles.button}
                    onPress={this.onButtonPress.bind(this)}>
                    
                        
                        <Text style ={styles.buttonText}>登入</Text>
                        </TouchableOpacity>

                    </View>



                </View>
               </ImageBackground>

               
        )
    }
}




const styles = StyleSheet.create({  
    container: {  
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    }  ,

    inputBox:{
        width:'100%',
        backgroundColor:'#FFFFFF',
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize:25,
        marginVertical: 10,
    },

    button:{
        width:150,
        backgroundColor:'#faa45b',
        borderRadius:25,
        marginVertical:10,
        paddingVertical : 4,
    },

    buttonText:{
        fontSize:25,
        fontWeight:'500',
        color:'#000000',
        textAlign :'center',
    },

    card:{
        height:280,
        width:"80%",
        backgroundColor:"#FBFADF",
        borderRadius:10,
        elevation:10,
        alignItems:'center',
        padding:15,
      },


      profileImg:{
        width:30,
        height:30,
        borderRadius:50,
        marginRight:10,
      },
      header: {
        flexDirection:"row",
      },

      title:{
        fontWeight:"bold",
        fontSize:25,
        backgroundColor:'#4d805e',
        width:"100%",
        padding:12,
        borderRadius:10,
        marginVertical: 4,
        
      },
      image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },

  });  