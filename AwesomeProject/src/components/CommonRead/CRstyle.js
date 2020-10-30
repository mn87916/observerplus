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
    marginVertical:'2.5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
  },  
    Content:{
    fontFamily:'nunito-bold',
    fontSize: 18,
    //marginVertical:'2.5%',
    justifyContent: 'center',
    marginHorizontal:'5%',
    
  },
    login_image: {
    width:'100%',
    height:'100%',
    flex: 1,
    justifyContent: "center",
  },
    CRtext:{
    height:"70%",
    width:"100%",
    //backgroundColor:'#333',
    borderRadius:30,
    top:"7.5%",    
    },

    upperspace:{
        width: '100%', 
        height: '20%',
        marginBottom:'5%'
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

    back: {
        width: "100%", 
        height: "100%",
        resizeMode:'stretch',
    },
});