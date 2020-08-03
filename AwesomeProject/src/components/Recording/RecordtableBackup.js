import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,Image,ActivityIndicator,Alert} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
export default class TableExample extends Component {

     getImage = (Weather) => {

    switch (Weather) {
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
      RecordArray:[],
      isLoading:true,
    }
    

   
    
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
      for (var i = 0 ; i < responseData.length;i++) {
       
        this.state.RecordArray.push(responseData[i])
        
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
                <View style={styles.container}>
        <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../../images/retune.png")}/>
          
        </TouchableOpacity>
        </View>
            <View style = {styles.tablecontainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#4d805e'}}>
                    <Row data={options.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={[[   
                    this.state.RecordArray[0].Date,
                    this.state.RecordArray[0].Height,
                    0,
                    24,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(this.state.RecordArray[0].Weather)}/>
                    </View>,
                    
                ],
                [
                    this.state.RecordArray[1].Date,
                    this.state.RecordArray[1].Height,
                    this.state.RecordArray[1].Height-this.state.RecordArray[0].Height ,
                    23,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(this.state.RecordArray[1].Weather)}/>
                    </View>,
                    ],
                [
                    this.state.RecordArray[2].Date,
                    this.state.RecordArray[2].Height,
                    this.state.RecordArray[2].Height-this.state.RecordArray[1].Height,
                    19,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(this.state.RecordArray[2].Weather)}/>
                    </View>,
                    ],
                [
                    this.state.RecordArray[3].Date,
                    this.state.RecordArray[3].Height,
                    this.state.RecordArray[3].Height-this.state.RecordArray[2].Height,
                    16,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(this.state.RecordArray[3].Weather)}/>
                    </View>,
                    ],
                    [
                    this.state.RecordArray[4].Date,
                    this.state.RecordArray[4].Height,
                    this.state.RecordArray[4].Height-this.state.RecordArray[3].Height,
                    16,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
                    source={this.getImage(this.state.RecordArray[4].Weather)}/>
                    </View>,
                    ]
                    ]} style={styles.row}  textStyle={styles.text}/>
                </Table>
                </View>
            </View>
            )

           

        }
        
        
    }
}



const styles = StyleSheet.create({
    container: {
     flex: 1,
     },
     tablecontainer: {
     flex: 1,
     padding:16,
     },
    head: {
        height: 40,
        backgroundColor: '#82ab8f'
    },
    text: {
        margin: 10,
        textAlign: 'center',
        fontSize:23,
        
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
         backgroundColor: '#fbfadf' },
});