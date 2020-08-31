import React, { Component } from 'react';
import { StyleSheet, ImageBackground,Text, View ,TextInput, TouchableOpacity,Alert,Navigator,ActivityIndicator} from 'react-native';
import { getCurrentFrame } from 'expo/build/AR';
import '../data/GlobalVariable.js';


export default class Form extends Component{
        constructor(props) 
        {
        super(props);

        this.state = {user_txt: '',pass_txt: ''};
        this.state = {somedata: ''};
        this.state = {
          isLoading:false,
        }
        
        }
    onButtonPress ()  
    {
        this.state.isLoading = true;
        this.forceUpdate()
        //Alert.alert('測試','帳號為：'+this.state.user_text+'，密碼為：'+this.state.pass_text)


        var queryURL = 'https://observerplus.club/API/login.aspx';
        let parameters = new FormData();
        parameters.append("account", this.state.user_text);
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
          

          this.props.navigation.replace("Main");
        }
        else
        {
          Alert.alert('錯誤!','帳號或密碼錯誤!')
          this.state.isLoading = false;
         this.forceUpdate()
        }
      } 
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
    }


    render(){
      if(this.state.isLoading){
        return(
            <ImageBackground source = {require('../images/login_background.png')} style = {styles.image}>   
                <View style = {styles.container}>

                <ActivityIndicator size = {80} color="#4d805e"/>

                <Text style={styles.logintext}>
                        登入中...
                    </Text>
                   
                    </View>

               </ImageBackground>
        )
      }
      else{
        return(      
          
          <ImageBackground source = {require('../images/login_background.png')} style = {styles.image}>   
                <View style = {styles.container}>
                  
                    <View style={styles.card}>
                        <View style={styles.header}>
                        
                    <Text style={styles.title}>
                        登入</Text>
                        </View>
                    
                    <Text style={styles.accpasstext}>
                        帳號 :</Text>
                    
                    <View style = {styles.centerview}>

                    <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                    
                     onChangeText={(user_text) => this.setState({user_text})} //寫入state
                     
                    />
                    </View>

                    <Text style={styles.accpasstext}>
                        密碼 :
                    </Text>

                    <View style = {styles.centerview}>

                    <TextInput style = {styles.inputBox} underlineColorAndroid= 'rgba(0,0,0,0)' 
                    
                     secureTextEntry={true}
                     
                     onChangeText={(pass_text) => this.setState({pass_text})}
                    />

                    </View>

                    <View style = {styles.centerview}>

                    <TouchableOpacity style = {styles.button}
                    onPress={this.onButtonPress.bind(this)}>
                        <Text style ={styles.buttonText}>登入</Text>
                        </TouchableOpacity>

                  </View>

                    </View>



                </View>
               </ImageBackground>
              

               
        )
      }
        
    }
}




const styles = StyleSheet.create({  
    container: {  
      
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    }  ,
    
    inputBox:{
        width:'90%',
        backgroundColor:'#FFFFFF',
        //borderRadius: 25,
        borderWidth:1,
        paddingHorizontal:20,
        fontSize:25,
        marginVertical: 10,
        
    },

    button:{
        top:'20%',
        width:150,
        backgroundColor:'#faa45b',
        borderRadius:10,
        borderWidth:1,
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
      
       top:'15%',
        height:280,
        width:"80%",
        backgroundColor:"#FBFADF",
        borderRadius:10,
        borderWidth:1,
        elevation:10,
        //alignItems:'center',
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
        textAlign: 'center',
        fontSize:25,
        backgroundColor:'#5d9b84',
        width:"100%",
        padding:8,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        //marginVertical: 4,
        color: 'white',
      },
      image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
      accpasstext:{
        left:'5%',
        fontSize:25,
      },
      centerview:{
        justifyContent:'center',
        alignItems:'center',
      },
      logintext:{
        fontSize:25,
      }

  });  