import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,Image,ActivityIndicator,Alert,Dimensions,ImageBackground,ScrollView} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import '../../data/GlobalVariable.js';
import { Globalstyles } from '../../style/Global';

export default class TableExample extends Component {

     getImage = (Weather) => {

    switch (Weather) { //天氣圖片顯示
        case "sun":
            return require("../../images/sunny.png")
            break;
        case "rain":
            return require("../../images/raining.png")
            break;
        default:
            return require("../../images/sunny.png");
            break;
    }
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
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1,
            Dimensions.get('window').height * 0.1]
        };

        if(this.state.isLoading){
        return(
          <View style ={styles.container}>
          <ActivityIndicator size="large" color="#4d805e"/>
          </View>
        )
      }
        else{
            return(
                <ImageBackground source={require('../../images/announcement_background.png')} style = {Globalstyles.Background}>
                <View style={styles.container}>
        <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
            <ScrollView>
            <View style = {styles.tablecontainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#4d805e',}}>
                    <Row data={options.tableHead} widthArr={options.widthArr} style={styles.head} textStyle={styles.text}/>
                    <Rows data={this.state.tableData} widthArr={options.widthArr} style={styles.row}  textStyle={styles.text}/>
                </Table>
                </View>
                </ScrollView>
            </View>
               </ImageBackground>
            )
        }        
    }
}



const styles = StyleSheet.create({
    container: {
     flex: 1,
     },
     tablecontainer: {
     //flex: 1,
     padding:16,
     alignItems:'center',
     //backgroundColor: '#333',
     width: '100%', 
     height: '100%',
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
        width: "10%", 
        height: "90%",
        left:'2%',
        bottom:'0%' ,
        position: 'absolute',
    },
    row: { 
        flexDirection: 'row',
        backgroundColor: '#fbfadf',
        height: 70, 
         },
         
});