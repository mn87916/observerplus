import React, {Component} from 'react'; 
import {Platform,ScrollView, StyleSheet, Text, View,TouchableOpacity,Image,Dimensions,Alert,ActivityIndicator,ImageBackground} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import '../../data/GlobalVariable.js';
import { Globalstyles } from '../../style/Global';



export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      obj_ID:"",
      isLoading:true,
      datesplit:[],
      datefix:[],
      dates:[],
      data: {
           labels: [],
           datasets: [
               {
                   data: []
                }
            ]
        }
      }
    }
    componentDidMount()
    {
    this.state.obj_ID = this.props.navigation.getParam("obj_key");
    const self = this;
    var queryURL = 'https://observerplus.club/API/Record.aspx';
      let parameters = new FormData();
      parameters.append("account", global.GlobalVariable.account);
      parameters.append("password", global.GlobalVariable.password);  
      parameters.append("obj_ID",this.state.obj_ID);

      fetch(queryURL,{
        method: 'POST',
        body: parameters
            })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      for(var i =0;i<responseData.length;i++){
         this.state.datesplit.push(responseData[i].Date.split("/"))
         this.forceUpdate()
         this.state.datefix.push(this.state.datesplit[i][1]+"/"+this.state.datesplit[i][0])
      }
       this.forceUpdate()
      console.log(this.state.datefix)
      
      const dataClone = {...self.state.data}

      const values = responseData.map(value => value.Height);
      const valuesdate = this.state.datefix.map(value => value);

      dataClone.datasets[0].data = values ;
      dataClone.labels = valuesdate;
      
      self.setState({
        data: dataClone,
      });
      //console.log(this.state.data)
      this.forceUpdate()
      this.setState({isLoading:false})
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
    }



    render(){
      if(this.state.isLoading){
        return(
          <ImageBackground source = {require('../../images/login_background.png')} style = {styles.login_image}>
          <View style ={styles.background}>
          <ActivityIndicator size = {80} color="#4d805e"/>
          </View>
          </ImageBackground>
        )
      }
      else{



        return(
    <ImageBackground source={require('../../images/Track_growth.png')} style = {styles.background}>
      <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
        <Image style={styles.back}
          source={require("../../images/retune.png")}/>
      </TouchableOpacity>
  
    <View style = {styles.container3}>
      <Text style={styles.text}>植物紀錄</Text>
      </View>

  <View style = {styles.linechart}>
  <ScrollView horizontal ={true}>
  <LineChart
    data={this.state.data}
    width={Dimensions.get("window").width * 1} // from react-native
    height={Dimensions.get("window").height * 0.7}
    //yAxisLabel="$"
    yAxisSuffix="公分"
    svg={{fill: 'grey',}}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#FBFADF",
      backgroundGradientTo: "#FBFADF",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(250, 164, 91, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
      }
    }}
    bezier
    style={{
      //top:10,
      paddingTop:35,
      //paddingRight:50,
      //marginVertical: 8,
    }}
  />
  </ScrollView>
</View>
     <TouchableOpacity style = {styles.listbutton} onPress={()=>{ this.props.navigation.navigate("Recordtable",{"obj_ID":this.state.obj_ID});}}>                        
       <Text style ={styles.buttonText}>顯示表格 > </Text>
     </TouchableOpacity>
   </ImageBackground>
      )
    }
  }
}


const styles = StyleSheet.create({ 
  background: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },

    upperspace:{
        width: '100%', 
        height: '10%',
        marginBottom:'5%'
    },

    backbutton: {
    resizeMode:'stretch',
    width: "8%", 
    height: "7%",
    left:'5%',
    top:"6.5%",
    //bottom:'0%' ,
    position: 'absolute',
    //backgroundColor:'#333',
  },
    back: {
        width: "100%", 
        height: "100%",
        resizeMode:'stretch',
    },
    login_image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
    linechart:{
      width: "85%", 
      height: "70%",
      alignItems:'center',
      //fontSize: 30,
      top:'17.5%',
      left:'7.5%',
      position: 'absolute',
     // backgroundColor:'#333',
    },
     container3: {
      alignItems:'flex-start',
      //backgroundColor:'#333',
      width:'40%',
      alignItems:'center',
      top:'15%',
      left:'15%',
      position: 'absolute',
    },
      text: {
      fontSize:30,
      //backgroundColor:'#333',
      //borderRadius:25,
      textAlign :'center',
      
      
},
      listbutton:{
        left:'65%',
        top:'90%',
        position: 'absolute',
      },
      
      buttonText:{
        fontSize:25,
      }

});  