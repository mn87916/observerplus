import React,{Component} from 'react';
import { StyleSheet, Image,Text, View,navigator,ScrollView,ImageBackground ,TouchableOpacity} from 'react-native';
import { CRstyle } from '../CommonRead/CRstyle';

export default class Article extends React.Component {
    constructor(props) 
        {
        super(props);   
        this.state = {
           CommonRead:"",
           isLoading:true,
        }   
      }
  componentDidMount()
  {
      var queryURL = 'https://observerplus.club/API/CommonRead.aspx';
  fetch(queryURL)
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      this.setState({isLoading:false})
      this.setState({CommonRead:responseData})
      console.log(this.state.CommonRead);
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }
    render() {
    return(
    <ImageBackground source={require('../../images/knowledge_background.png')} style = {CRstyle.container}>

      <View style ={CRstyle.background}>
     <View style ={CRstyle.upperspace}>
        <TouchableOpacity style={CRstyle.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={CRstyle.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
        </View>

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