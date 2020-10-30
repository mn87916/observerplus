import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,Image,ActivityIndicator,Alert,Dimensions,ImageBackground,ScrollView} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import '../../data/GlobalVariable.js';
import { Globalstyles } from '../../style/Global';

export default class TableExample extends Component {

     getImage = (Weather) => {

        if(Weather <=2)
         {
           return require("../../images/sunny.png")
         }
         else if(Weather <= 5)
         {
           return require("../../images/partly_cloudy.png")
         }
         else if(Weather <= 7)
         {
           return require("../../images/cloudy.png")
         }
         else
         {
           return require("../../images/raining.png")
         }
         /*晴天:1-2
          多雲:3-5
          陰天:6-7
          雨天:>=8*/
    }

    constructor(props) {
    

    super(...arguments);
        
    this.state = {
      isLoading:true,
      tableData: [],
      obj_ID:"",
        }
    }
    
    componentDidMount()
    {
    this.state.obj_ID = this.props.navigation.getParam("obj_ID");
    console.log(this.state.obj_ID)
    var width = Dimensions.get('window').width;
    var queryURL = 'https://observerplus.club/API/Table.aspx';
    let parameters = new FormData();
    parameters.append("obj_ID",this.state.obj_ID);
      fetch(queryURL,{
        method: 'POST',
        body: parameters
            })
    // response.json() => 把 response 的資料轉成 json
    // 如果你想要原封不動的接到 response 的資料，可以用 response.text()
    .then((response) => response.json() )
    .then((responseData) => { 
    /*if(responseData.records.location[0].weatherElement[0].time[0].parameter.parameterValue <=2)
         {
           console.log("123")
         }
         else if(responseData.records.location[0].weatherElement[0].time[0].parameter.parameterValue <= 5)
         {
           
         }*/
      for (var i = 0 ; i < responseData.length;i++) {
        const rowData = [];
        
        rowData.push(responseData[i].Date.substr(0, 5));
        rowData.push(responseData[i].Height);
        if (i > 0){
            rowData.push(responseData[i].Height-responseData[i-1].Height);
        }
        else{
            rowData.push(0);
        }
        rowData.push(responseData[i].Temp);
        rowData.push(<View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(responseData[i].Weather)}/>
                    </View>);
        this.state.tableData.push(rowData);
        console.log(responseData[i].Weather)
      }
      this.forceUpdate()
      this.setState({isLoading:false})
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
}
    


    render() {
    
        const options = {
            tableHead: ['日期', '公分', '成長', '溫度', '天氣'],
            widthArr: [
            Dimensions.get('window').height * 0.11,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1]
        };

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
        <ImageBackground source={require('../../images/Growth_table_background.png')} style = {styles.container}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
        </TouchableOpacity>
        <View style = {styles.tablecontainer}>
            <ScrollView>
                <Table borderStyle={{borderWidth: 2, borderColor: '#4d805e',}}>
                    <Row data={options.tableHead} widthArr={options.widthArr} style={styles.head} textStyle={styles.text}/>
                    <Rows data={this.state.tableData} widthArr={options.widthArr} style={styles.row}  textStyle={styles.text}/>
                </Table>
                </ScrollView>
                </View>
               </ImageBackground>
            )
        }        
    }
}



const styles = StyleSheet.create({
    container: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
     },
    background: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
     tablecontainer: {
     //flex: 1,
     padding:16,
     alignItems:'center',
     //backgroundColor: '#333',
     width: '100%', 
     height: '80%',
     top:'5%',
     //position: 'absolute',
     },
    head: {
        height: 50,
        backgroundColor: '#82ab8f',
        
    },
    text: {
        margin: 5,
        textAlign: 'center',
        fontSize:20,
        
    },
    titleStyle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
        upperspace:{
        width: '100%', 
        height: '10%',
        marginBottom:'5%'
    },
    login_image: {
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
      },
    back: {
        width: "100%", 
        height: "100%",
        resizeMode:'stretch',
    },
    weatherview: {
        resizeMode:'stretch',
        width: "100%", 
        height: "100%",
        position: 'absolute',
    },
    weather: {
        width: "100%", 
        height: "100%",
        resizeMode:'stretch',
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
    row: { 
        flexDirection: 'row',
        backgroundColor: '#fbfadf',
        height: 70, 
         },
         
});