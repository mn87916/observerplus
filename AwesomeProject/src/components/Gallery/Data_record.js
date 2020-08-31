import React,{Component} from 'react';
import { StyleSheet,ActivityIndicator,Text, View, navigator,Dimensions,ImageBackground,ScrollView,TouchableOpacity,Image,FlatList } from 'react-native';
import { Video }  from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Gallery } from '../Gallery/GalleryStyle';
//import ImageView from "react-native-image-viewing";


export default class Data_record extends React.Component {
      constructor(props) 
        {
        super(props);  
	    this.state = {
		  mute: false,
		  shouldPlay: false,
      visible:true,
      isLoading:true,
			Data_record:"",
      img:[],
      vid:[],
	            }
        }
		

componentDidMount()
  {
	  /*console.log(this.props.navigation.getParam("ID"));
      var queryURL = 'http://observerplus.club/API/asd.aspx';
      let parameters = new FormData();
        parameters.append("myID","1");
console.log(parameters)
      fetch(queryURL,{
        method: 'POST',
        body: parameters   
            })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()

    /*.then((response) => response.json())
    .then((responseData) =>  { 
      console.log("123")
      for (var i = 0 ; i < responseData.length;i++) {
       this.state.Data_record.push(responseData[i])   	   
      }
	  console.log(responseData)
    /*.then(response => {
console.log(JSON.stringify(response, null, 4))
return response.json()
})
    .then(
      response => {
        console.log('succ ')
        console.log(response)*/
      
      /*for (var i = 0 ; i < this.state.Gallery[i].Img.length;i++) {
       this.state.img.push(this.state.Gallery.Img[])       
      }*/
      //this.forceUpdate()
      //this.setState({isLoading:false})
    /*})
    .catch((error) => {
      console.warn(error);
    })
    .done();*/





        var queryURL = 'https://observerplus.club/API/test2.aspx';
        let parameters = new FormData();
        parameters.append("ID",this.props.navigation.getParam("ID"));
        console.log(parameters);
        


  fetch(queryURL,{
    method: 'POST',
    body: parameters
  })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json())
    .then((responseData) => { 
      this.setState({Data_record:responseData})
      console.log(this.state.Data_record);
      this.setState({isLoading:false})
      //console.log(this.state.Data_record);

        
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();  
  }

  Img = (item) => { 
    if(item !="undefined")
    {
    console.log(item)
    for (var i = 0 ; i < item.length;i++) {
      this.state.img.push(item[i])
      console.log(this.state.img)
      }
    
    return this.state.img.map((img) => {  
      return (           
        <View style={Gallery.RecordBox}>       
        <Image style={Gallery.Photos2}
          source={{uri:img}}/>       
        </View>
        
      )
     })
    }
  }

      Vid = (item) => { 
    console.log(item[1])
    for (var i = 0 ; i < item.length;i++) {
      this.state.vid.push(item[i])
      console.log(this.state.vid)
      }
    return this.state.vid.map((vid) => {  
      return (           
        
        <View style ={(Gallery.RecordBox)}>   
        <Video
              source={{ uri:vid}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="stretch"
                            shouldPlay ={false}
                            isLooping ={false}
                            useNativeControls
              style={ {width:'100%' , height:220}}
            /> 
        </View>   
        
      )
     })
  }

  ImgT = (item) => { 
    console.log("123456798");
    console.log(item);
    return this.state.img.map((item) => {  
      return (               
        <ImageView
        images={{uri:this.state.img}}
        imageIndex={1}
        visible={this.state.visible}
        onRequestClose={() => this.setState({visible:false})}
        />         
      )
     })
  }

  render() {
		const { width , height} = Dimensions.get('window');
		if(this.state.isLoading){
        return(
          <View style ={Gallery.container}>
          <ActivityIndicator size="large" color="#4d805e"/>
          </View>
        )
      }
      else{
      return (
      <ImageBackground source={require('../../images/Gallery_background.png')} style = {Gallery.container}>   
      <TouchableOpacity onPress ={() => this.props.navigation.goBack()} style = {Gallery.R_backbutton}>
      <Image source={require('../../images/retune.png')} style = {Gallery.R_back}>
      </Image>
      </TouchableOpacity>   
      <View style ={(Gallery.container2)}>      
      
      <ScrollView >
      <Text style ={(Gallery.Title)}>心得:</Text>
      <Text style ={(Gallery.Rec)}>{this.state.Data_record.Date}</Text>
      <Text style ={(Gallery.Rec)}>{this.state.Data_record.rec}</Text>
      <Text style ={(Gallery.Title)}>照片:</Text>
      {this.Img(this.state.Data_record.Img)}
      <Text style ={(Gallery.Title)}>影片:</Text>
      {this.Vid(this.state.Data_record.Mp4)}
      </ScrollView>
      </View>      
      
    </ImageBackground>
		);
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	},
	controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	}
});