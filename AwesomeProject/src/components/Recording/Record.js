import React, {Component} from 'react'; 
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,Dimensions,Alert,ActivityIndicator,ImageBackground} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import '../../data/GlobalVariable.js';
import { Globalstyles } from '../../style/Global';



export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      
      isLoading:true,
      data: {
           labels: [],
           datasets: [
               {
                   data: []
               }
           ]
       }
    }
    
    const self = this;
    var queryURL = 'http://observerplus.club/API/Record.aspx';
      let parameters = new FormData();
        

      fetch(queryURL,{
        method: 'GET',
        //body: parameters
            })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
      

      const dataClone = {...self.state.data}

      const values = responseData.map(value => value.Height);
      const valuesdate = responseData.map(value => value.Date);

      dataClone.datasets[0].data = values ;

      

      dataClone.labels = valuesdate;

      self.setState({
        data: dataClone,
      });

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
          
          <ImageBackground source={require('../../images/article_background.png')} style = {Globalstyles.Background}>

          <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>



          <View style ={styles.container}>
          <ActivityIndicator size= 'large' color="#4d805e"/>
          </View>
          </View>
          </ImageBackground>
        )
      }
      else{



        return(
<ImageBackground source={require('../../images/article_background.png')} style = {Globalstyles.Background}>
    <View style ={styles.background}>
     <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
  
    <View style = {styles.container3}>
      <Text style={styles.text}>植物紀錄</Text>
      </View>

  <View style = {styles.linechart}>
  <LineChart
    data={this.state.data}
    width={Dimensions.get("window").width * 0.9} // from react-native
    height={Dimensions.get("window").height * 0.7}
    //yAxisLabel="$"
    yAxisSuffix="公分"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#FBFADF",
      backgroundGradientTo: "#FBFADF",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(250, 164, 91, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
     <TouchableOpacity style = {styles.listbutton} onPress={()=>{ this.props.navigation.navigate("Recordtable");}}>
                    
                        
       <Text style ={styles.buttonText}>顯示表格 > </Text>
     </TouchableOpacity>

</View>
   </ImageBackground>


        )

    }

}
}


const styles = StyleSheet.create({ 
    background: {
        flex:1,
        
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
    linechart:{
      alignItems:'center',
      
    },
     container3: {
      alignItems:'flex-start',
      marginLeft:'5%'
    
},
      text: {
      fontSize:30,
      backgroundColor:'#FBFADF',
      borderRadius:25,
      width:'50%',
      textAlign :'center'
},
      listbutton:{
        left:'65%'
      },
      
      buttonText:{
        fontSize:25,
      }

});  