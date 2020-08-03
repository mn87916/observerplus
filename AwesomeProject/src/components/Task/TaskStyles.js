import { StyleSheet } from 'react-native';//全球流呼叫CSS*

export const Taskstyles = StyleSheet.create({
  container: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
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
  //width:'75%',  
  //padding:'5%',
  height:"100%",
  width:"100%",
  //backgroundColor:'#333',
  },
  back:{
    top:'5%',
    left:'3%',
    height:"6%",
    width:"9%",
    resizeMode:'stretch',
    //backgroundColor:'#333',
    position:'absolute',
  },
  tableview:{
    height:'12%',
    width:'80%',
    resizeMode:'stretch',
    marginHorizontal:"10%",
    marginVertical:"5%",
    top:"10%",
  }
});