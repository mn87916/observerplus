import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
      Audio.requestPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  const uploadImageAsync = (pictureuri)  =>{
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
  }

if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>
            <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name={ Platform.OS === 'ios' ? "ios-reverse-camera" : 'md-reverse-camera'} size={40} color="white" />
            
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo.uri);
              uploadImageAsync(photo.uri);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
              borderRadius:50,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                borderRadius:50,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{alignSelf: 'center'}} 
            onPress={async() => {
              if(!recording){
                setRecording(true)
              let video = await cameraRef.recordAsync();
              console.log('video', video.uri);
              uploadVideo(video.uri);
              
              
            } else {
                setRecording(false)
                cameraRef.stopRecording()
            }
           }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius: 50,
               borderColor: 'red',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                borderRadius: 50,
                 borderColor: recording ? "blue":'red',
                 height: 40,
                 width:40,
                 backgroundColor: recording ? "blue":'red'}} >
              </View>
            </View>
          </TouchableOpacity>
           
          
            </View>
        </View>
      </Camera>
    </View>
  );
}