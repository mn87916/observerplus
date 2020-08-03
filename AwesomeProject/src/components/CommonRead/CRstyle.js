import { StyleSheet } from 'react-native';//全球流呼叫CSS*

export const CRstyle = StyleSheet.create({
    container: {
    resizeMode:'contain',
    justifyContent:'center',
    flex:1,
  },
    title:{  
    fontFamily:'nunito-bold',
    fontSize: 22,
    marginVertical:'2%',
    justifyContent: 'center',
    marginHorizontal:'3%',
  },  
    Content:{
    fontFamily:'nunito-bold',
    fontSize: 18,
    marginVertical:'2%',
    justifyContent: 'center',
    marginHorizontal:'3%',
    
  },
    CRtext:{
    height:"65%",
    width:"100%",
    backgroundColor:'#fbfadf',
    borderRadius:30,
    bottom:'5%',    
    },

    upperspace:{
        width: '100%', 
        height: '20%',
        marginBottom:'5%'
    },

    backbutton: {
        resizeMode:'stretch',
        width: "10%", 
        height: "100%",
        left:'2%',
        bottom:'0%' ,
        position: 'absolute',
    },

    back: {
        width: "100%", 
        height: "100%",
        resizeMode:'stretch',
    },
});