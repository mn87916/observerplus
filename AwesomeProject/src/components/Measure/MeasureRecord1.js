import React, { useState, useEffect, useRef } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,navigation } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function MeasureRecord() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false)
  
  
  
    useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);



  const recordVideo = async () => {
    if(!recording){
              setRecording(true)
              let video = await cameraRef.recordAsync();
              global.video = video.uri
              global.boolvideo = true;
              } 
              else {
              setRecording(false)
              cameraRef.stopRecording()
              navigation.navigate("Measure");
              }
  };
/*video = async () => {
              if(!recording){
              setRecording(true)
              let video = await cameraRef.recordAsync();
              global.video = video.uri
              global.boolvideo = true;
              } 
              else {
              setRecording(false)
              cameraRef.stopRecording()
              this.props.navigation.navigate("Measure");
              }
           }
*/

  /*const uploadImageAsync = (pictureuri)  =>{
   let apiUrl = 'https://observerplus.club/API/img.aspx';
    var data = new FormData();  
    data.append('file',{  
      uri:pictureuri,
      name:'file',
      type:'image/jpg',
    })
    

    fetch(apiUrl, {  
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(
      response => {
        console.log('succ ')
        console.log(response)
      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } )
  }

  const uploadVideo = (videouri)  => {
  let apiUrl = 'https://observerplus.club/API/mp4.aspx';
    var data = new FormData();  
    data.append('file', {  
      uri: videouri,
      name: 'file',
      type: 'video/${codec}'
    })

    fetch(apiUrl, {  
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(
      response => {
        console.log('succ ')
        console.log(response.json())
        
      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } )
  }*/

if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style= {styles.contain}>
      <Camera style= {styles.contain} type={type} ref={ref => {setCameraRef(ref) ;}}>
          <View style={styles.location}>
            <TouchableOpacity style={styles.swap} 
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name='md-reverse-camera' size={40} color="white" /> 
          </TouchableOpacity>
           </View>
           <View style={styles.background}>
          <TouchableOpacity 
            style={styles.video} 
            onPress={recordVideo}>
            <View style={styles.icon_camera} >
              <View style={{borderWidth: 2,
                    borderRadius: 50,
                    height: 40,
                    width:40,
                    borderColor: recording ? 'red':'white',
                    backgroundColor: recording ? 'red':'white',}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({  
  contain: {
    flex: 1,
  },
  background:{
    backgroundColor: 'transparent',
    top:'85%',
    justifyContent: 'center',
    //position: 'absolute',
  },
  location:{
    display: 'flex',
    top:'86%',
    left:"10%",
    position: 'absolute',
  },
  swap:{
    flex: 0.1,
  },
  video:{
    alignSelf: 'center',
  },
  icon_camera:{
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width:50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});