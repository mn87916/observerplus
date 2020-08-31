import { StyleSheet } from 'react-native';//全球流呼叫CSS*

export const GWStyles = StyleSheet.create({

    container: {
        resizeMode:'contain',
        justifyContent:'center',
        flex:1,
    },
    container2: {
        resizeMode:'contain',
        flex:1,
    },
    imagesize:{
        height:"100%",
        width:"100%",
    },
    back:{
        top:'3%',
        left:'3%',
        height:"6%",
        width:"9%",
        resizeMode:'stretch',
        //backgroundColor:'#333',
        position:'absolute',
  },
  GW_Card:{  
    height:"82%",
    width:"100%",
    top:'8%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    //justifyContent: 'center',
    //marginBottom:'10%',
    //backgroundColor:'#d9cfc5',
  },
  AnnounceCard:{  
    height:"82%",
    width:"100%",
    top:'8%',
    fontFamily:'nunito-bold',
    //marginVertical:'5%',
    color:'#333',
    //justifyContent: 'center',
    //marginBottom:'10%',
    //backgroundColor:'#d9cfc5',
  },
    GW_Box:{  
    fontFamily:'nunito-bold',
    borderRadius:30,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#cfe1ff',
    height:240,
    width:"70%",
    left:'15%',
    borderWidth: 1,
  },  
  toptext2:{  
    fontFamily:'nunito-bold',
    borderRadius:30,
    marginVertical:"2.5%",
    textAlign: 'center',
    color:'#333',
    shadowOffset:{width:1,height:1},
    shadowRadius:2,
    shadowOpacity:6,
    elevation:3,
    backgroundColor:'#fce9de',
    height:600,
    width:"75%",
    left:'12.5%',
  },  
  CardBox:{ 
    //top:"-2%", 
    left:'6%',
    height:'72.5%',
    width:'88%', 
  },
  CardBox2:{  
    //top:'25%',
    left:'6%',
    height:'50%',
    width:'88%', 
    marginVertical:'2%',
    //position: 'absolute',
  },
  image:{
    height:'100%',
    width:'100%', 
    borderRadius:3,
    resizeMode:'stretch',
  },
  GWTitle:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    marginVertical:'5%',
    marginHorizontal:'5%',
    textAlign: 'center',
  },  
  AnnounTitle2:{  
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'1%',
    marginHorizontal:'5%',
    textAlign: 'center',
  },  
  AnnounDate:{
    fontFamily:'nunito-bold',
    fontSize: 15,
    //marginVertical:'5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
  AnnounContent:{
    fontFamily:'nunito-bold',
    fontSize: 25,
    //marginVertical:'5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },
});