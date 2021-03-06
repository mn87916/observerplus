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
    top:'10%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    height:"75%",
    justifyContent: 'center',
    //marginBottom:'15%',
    //backgroundColor:'#d9cfc5',
  },
  AnnounceCard2:{  
    //top:'10%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    height:"75%",
    justifyContent: 'center',
    //marginBottom:'15%',
    //backgroundColor:'#d9cfc5',
    textAlign: 'center',
    alignItems: 'center',
  },
  AnnounTitle:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    marginVertical:'5%',
    //justifyContent: 'center',
    marginHorizontal:'5%',
  },  
  AnnounTitle2:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
  },  
  AnnounDate:{
    fontFamily:'nunito-bold',
    fontSize: 18,
    marginVertical:10,
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  AnnounContent:{
    fontFamily:'nunito-bold',
    fontSize: 20,
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
     backgroundColor:'#fbd292',
    //justifyContent: 'center',
    //marginHorizontal:"18%",
    left:"17.5%",
    width:"65%",
    height:200,
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
  resizeMode:'stretch',
  //backgroundColor:'#333',
  },
    back: {
        resizeMode:'stretch',
        width: "10%", 
        height: "100%",
        left:'2%',
        bottom:'0%' ,
        position: 'absolute',
        //backgroundColor:'#333',
    },
      upperspace:{
        width: '100%', 
        height: '10%',
        marginBottom:'5%'
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
  login_image: {
    width:'100%',
    height:'100%',
    flex: 1,
    justifyContent: "center",
    },
  ArtContent:{
    fontFamily:'nunito-bold',
    fontSize: 20,
    marginVertical:'2%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  Arttext:{  
    top:'10%',  
    left:'10%',
    height:"85%",
    width:"80%",
    //backgroundColor:'#fbfadf',
    borderRadius:30,
  },  
  Artback:{
    top:'-1%',
    left:'4%',
    height:"6%",
    width:"9%",
    resizeMode:'stretch',
    //backgroundColor:'#fbfadf',
    //position:'absolute',
  },
});