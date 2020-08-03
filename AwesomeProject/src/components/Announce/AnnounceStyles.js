import { StyleSheet } from 'react-native';//全球流呼叫CSS*

export const AnnounceStyles = StyleSheet.create({

  container: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
  },
    title:{
    resizeMode:'stretch',
    height:"10%",
    width:"70%",
    top:'10%',
    left:"15%",
    position: 'absolute',
    justifyContent: 'center',
  },
  AnnounceCard:{  
    top:'15%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    justifyContent: 'center',
    marginBottom:'15%',
  },
  AnnounTitle:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    marginVertical:'5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },  
  AnnounDate:{
    fontFamily:'nunito-bold',
    fontSize: 15,
    marginVertical:10,
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  AnnounContent:{
    fontFamily:'nunito-bold',
    fontSize: 18,
    marginVertical:10,
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  toptext:{  
    fontFamily:'nunito-bold',
    fontSize: 30,
    borderRadius:30,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#d9cfc5',
    justifyContent: 'center',
    marginHorizontal:"16%",
  },  
  Artbackground:{
    resizeMode:'contain',
    justifyContent:'center',
    //backgroundColor:'#fbfadf',
    flex:1,    
  },
  imagesize:{
  //width:'75%',  
  //padding:'5%',
  height:"100%",
  width:"100%",
  //backgroundColor:'#333',
  },
  back:{
    top:'2%',
    left:'8%',
    height:"6%",
    width:"9%",
    resizeMode:'stretch',
    //backgroundColor:'#333',
    //position:'absolute',
  },
  ArtTitle:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    marginVertical:'5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  ArtDate:{
    fontFamily:'nunito-bold',
    fontSize: 15,
    marginVertical:'3%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  ArtContent:{
    fontFamily:'nunito-bold',
    fontSize: 20,
    marginVertical:'2%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  Arttext:{  
    //top:'5%',  
    left:'10%',
    height:"80%",
    width:"80%",
    backgroundColor:'#fbfadf',
    borderRadius:30,
  },  
  Artback:{
    top:'-2%',
    left:'10%',
    height:"6%",
    width:"9%",
    resizeMode:'stretch',
    //backgroundColor:'#fbfadf',
    //position:'absolute',
  },
});