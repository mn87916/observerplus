import React ,{Component}from 'react';
import {Text, View,navigation,ImageBackground,TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import { Taskstyles } from '../Task/TaskStyles';
import '../../data/GlobalVariable.js';


export default class Task extends React.Component {
  constructor(props) 
        {
        super(props);   
        this.state = {
           task:"",
           isLoading:true,
        }   
      }
  componentDidMount()
  {
      var queryURL = 'https://observerplus.club/API/Mission.aspx';
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
      this.setState({isLoading:false})
      this.setState({task:responseData})
      console.log(this.state.task);
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }

  Send = () => 
  {
        var queryURL = 'http://192.192.155.112/API/Water.aspx';
        //let parameters = new FormData();
  fetch(queryURL/*,{
    method: 'POST',
    body: parameters
  }*/)
    .then((response) => response.json() )
    .then((responseData) => { 
      console.log(responseData);
      this.setState({task:responseData})
      console.log(this.state.task.Miswater);       
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
  }

  task1 = (index) => {
    if (index == false) {
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/task.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>澆水</Text>
        </View> 
     )
    }
    else{
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>澆水</Text>
        </View> 
     )
    }
  }

  task2_1 = (index) => {
    if (index == false) {
    return (
          <Image source={require('../../images/task.png')} style = {Taskstyles.image1} >
          </Image>
     )
    }
    else{
    return (
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image1} >
          </Image>
     )
    }
  }

  task2_2 = (index) => {
    if (index == false) {
    return (
          <Image source={require('../../images/task.png')} style = {Taskstyles.image2} >
          </Image>
     )
    }
    else{
    return (
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image2} >
          </Image>
     )
    }
  }

    task2_3 = (index) => {
    if (index == false) {
    return (
          <Image source={require('../../images/task.png')} style = {Taskstyles.image3} >
          </Image>
     )
    }
    else{
    return (
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image3} >
          </Image>
     )
    }
  }

  task3 = (index) => {
    if (index == false) {
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/task.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>照片</Text>
        </View> 
     )
    }
    else{
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>照片</Text>
        </View> 
     )
    }
  }

  task4 = (index) => {
    if (index == false) {
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/task.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>每日共讀</Text>
        </View> 
     )
    }
    else{
    return (
        <View style ={(Taskstyles.toptext)}>
          <Image source={require('../../images/Ftask.png')} style = {Taskstyles.image3} >
          </Image>
          <Text style ={(Taskstyles.taskwater)}>每日共讀</Text>
        </View> 
     )
    }
  }

  task1_change()
  {
    if(this.state.task.Miswater == false)
    {
      this.Send();
    }
  }
  task2_change()
  {
    if(this.state.task.Examount1 == false)
    {
      let Dailey_Exam_ID = this.state.task.Dailey_Exam_ID
      this.props.navigation.navigate("ExamA",{"Dailey_Exam_ID":Dailey_Exam_ID})
    }
    else if(this.state.task.Examount1 == true && this.state.task.Examount2 == false)
    {
      let Dailey_Exam_ID = this.state.task.Dailey_Exam_ID
      this.props.navigation.navigate("ExamB",{"Dailey_Exam_ID":Dailey_Exam_ID})
    }
    else if(this.state.task.Examount1 == true && this.state.task.Examount2 == true && this.state.task.Examount3 == false)
    {
      let Dailey_Exam_ID = this.state.task.Dailey_Exam_ID
      this.props.navigation.navigate("ExamC",{"Dailey_Exam_ID":Dailey_Exam_ID})
    }
    else
    {     
    }
    
  }
  task3_change()
  {
    if(this.state.task.DaileyImage == false)
    {
      this.props.navigation.navigate("Measure");
    }
  }
  task4_change()
  {
    if(this.state.task.DaileyRead == false)
    {
      this.props.navigation.navigate("CommonRead");
    }
    
  }
    render() {
      if(this.state.isLoading){
        return(
          <View style ={Taskstyles.container}>
          <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      else{
        return(
          <ImageBackground source={require('../../images/taskbackground.png')} style = {Taskstyles.container}> 
          <TouchableOpacity onPress ={() => this.props.navigation.navigate("Menu2")} style = {Taskstyles.back}>
            <Image source={require('../../images/retune.png')} style = {Taskstyles.imagesize}>
            </Image>
          </TouchableOpacity>   
            <TouchableOpacity onPress= {() =>this.task1_change()} style ={(Taskstyles.tableview)}>
            {this.task1(this.state.task.Miswater)}
            </TouchableOpacity>
            <TouchableOpacity onPress= {() =>this.task2_change()} style ={(Taskstyles.tableview)}>
            <View style ={(Taskstyles.toptext)}>
            {this.task2_1(this.state.task.Examount1)}
            {this.task2_2(this.state.task.Examount2)}
            {this.task2_3(this.state.task.Examount3)}
            <Text style ={(Taskstyles.taskwater)}>題目</Text>
            </View> 
            </TouchableOpacity>
            <TouchableOpacity onPress= {() =>this.task3_change()} style ={(Taskstyles.tableview)}>
            {this.task3(this.state.task.DaileyImage)}
            </TouchableOpacity>
            <TouchableOpacity onPress= {() =>this.task4_change()} style ={(Taskstyles.tableview)}>
            {this.task4(this.state.task.DaileyRead)}
            </TouchableOpacity>
          </ImageBackground>
      )
    }
  }
}