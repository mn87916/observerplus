import React,{useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading} from 'expo';
import Navigator from './routes/drawer';

const getFonts = ()=> Font.loadAsync({
  'nunito-regular':require('./assets/font/Nunito-Regular.ttf'),
  'nunito-bold':require('./assets/font/Nunito-Bold.ttf')
});//自己載入檔案來改變字型!!!


export default function App() { 
  const [fontsLoaded,setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return(
      <Navigator />
    );
  }
  else{
    return(
    <AppLoading
      startAsync = {getFonts}
      onFinish ={() => setFontsLoaded(true)}
    />
    )
  }
} 