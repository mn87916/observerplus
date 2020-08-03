import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
export default class TableExample extends Component {
    constructor(props) {
        super(...arguments);
    }


    render() {

        const options = {
            tableHead: ['日期', '公分', '成長', '溫度', '天氣'],
            tableData: [
                ['3/01',
                    0,
                    0,
                    24,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
          source={require("../images/raining.png")}/>
                    </View>,
                    
                ],
                [
                    '3/02',
                    4,
                    4,
                    23,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
          source={require("../images/raining.png")}/>
                    </View>,
                    ],
                [
                    '3/03',
                    6,
                    2,
                    19,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
          source={require("../images/sunny.png")}/>
                    </View>,
                    ],
                [
                    '3/04',
                    7,
                    1,
                    16,
                    <View style ={styles.weatherview} >
                    <Image style={styles.weather}
          source={require("../images/sunny.png")}/>
                    </View>,
                    ]
            ]
        };
        return (
        <View style={styles.container}>
        <View style ={styles.upperspace}>
        <TouchableOpacity style={styles.backbutton} onPress={()=>{ this.props.navigation.goBack();}}>
          <Image style={styles.back}
          source={require("../images/back.png")}/>
          
        </TouchableOpacity>
        </View>
            <View style = {styles.tablecontainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#4d805e'}}>
                    <Row data={options.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={options.tableData} style={styles.row}  textStyle={styles.text}/>
                </Table>
                </View>
            </View>
        )
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