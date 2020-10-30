import { StyleSheet } from 'react-native';//全球流呼叫CSS*

export const Taskstyles = StyleSheet.create({
  container: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
  },
  login_image: {
    width:'100%',
    height:'100%',
    flex: 1,
    justifyContent: "center",
  },
  toptext:{  
    fontFamily:'nunito-bold',
    borderRadius:10,
    //marginVertical:"2%",
    padding:'8%',
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#fbfadf',
    borderColor: "black",
    borderWidth:1,
    //width:'80%',
    //height:'10%',       
    //marginHorizontal:"13%",
    //top:'40%',
    

  },
  title:{
    resizeMode:'contain',
    marginHorizontal:"2%",
    marginVertical:'15%' ,
  },
  taskwater:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    color:'#333',   
  },
  image3:{
    height:'70%',
    width:'20%',
    resizeMode:'stretch',
    position:'absolute',
    top:'17%',
    left:'90%',
  },
  image2:{
    height:'70%',
    width:'20%',
    resizeMode:'stretch',
    position:'absolute',
    top:'17%',
    left:'67%',
  },   
  image1:{
    height:'70%',
    width:'20%',
    resizeMode:'stretch',
    position:'absolute',
    top:'17%',
    left:'44%',
  },
  imagesize:{
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
  tableview:{
    height:'10%',
    width:'80%',
    resizeMode:'stretch',
    marginHorizontal:"10%",
    marginVertical:"5%",
    top:"8%",
  }
});