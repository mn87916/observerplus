import React, { useState } from 'react';
import { StyleSheet, FlatList,Text, View ,ImageBackground,TouchableOpacity,Image,} from 'react-native';
import { Globalstyles } from '../style/Global';

export default function Background({ navigation }) {
  const [reviews, setReviews] = useState([
    {title:'GodZen is god',rating:5,body:'lorem ipsum',key:'1'},
    {title:'GodZen is god1',rating:4,body:'lorem ipsum',key:'2'},
    {title:'GodZen is god2',rating:3,body:'lorem ipsum',key:'3'},
    {title:'GodZen is god3',rating:3,body:'lorem ipsum',key:'4'},
 ]);


   return(

  <ImageBackground source={require('../images/announcement_background.png')} style = {Globalstyles.container}>   
  
     

    <ImageBackground source={require('../images/announcement_title.png')} style = {Globalstyles.title}>
        <Text style = {Globalstyles.titletext}>
    公告 
    </Text>
    </ImageBackground>    
        
    <View>      
      <FlatList
        data ={reviews}
        renderItem = {({ item }) => (
        <TouchableOpacity onPress ={() => navigation.navigate('Article', item)}>
          <Text style ={(Globalstyles.toptext)}>{item.title}</Text>
          </TouchableOpacity>
      )}      
      />
    </View> 
  </ImageBackground>
   );
}


