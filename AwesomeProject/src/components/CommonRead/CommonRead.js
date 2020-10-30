import React,{Component} from 'react';
import { StyleSheet, Image,Text, View,navigator,ScrollView,ImageBackground,ActivityIndicator,TouchableOpacity} from 'react-native';
import { CRstyle } from '../CommonRead/CRstyle';

export default class Article extends React.Component {
    constructor(props) 
        {
        super(props);   
        this.state = {
           CommonRead:"",
           isLoading:true,
           obj_list:"",
        }   
      }
  componentDidMount()
  {
    this.state.obj_list = global.GlobalVariable.main.obj_list;
    console.log(this.state.obj_list)
      var queryURL = 'https://observerplus.club/API/CommonRead.aspx';
      let parameters = new FormData();
      parameters.append("account", global.GlobalVariable.account);
        for(var i =0;i<this.state.obj_list.length;i++)
        {
          parameters.append("obj_ID",this.state.obj_list[i].obj_key);
        }
      console.log(parameters)
  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    .then((response) => response.json() )
    .then((responseData) => { 
      this.setState({CommonRead:responseData})
      this.setState({isLoading:false})
      console.log(responseData)
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
  }

  /*test = () =>{
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }*/
    render() {
      if(this.state.isLoading){
        return(          
          <ImageBackground source = {require('../..//images/login_background.png')} style = {CRstyle.login_image}>
          <View style ={CRstyle.container}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
      else{
        return(
    <ImageBackground source={require('../../images/knowledge_background.png')} style = {CRstyle.container}>
        <TouchableOpacity style={CRstyle.backbutton} onPress={()=>{ 
          this.props.navigation.state.params.refresh();
          this.props.navigation.goBack();}}>
          <Image style={CRstyle.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>
    <View style ={(CRstyle.CRtext)}>
    <ScrollView >  
    <Text style = {CRstyle.title}>{this.state.CommonRead.title}</Text>
    <Text style = {CRstyle.Content}>{this.state.CommonRead.content}</Text>
    </ScrollView>
    </View>
    </ImageBackground>
    );
    }
  }
}