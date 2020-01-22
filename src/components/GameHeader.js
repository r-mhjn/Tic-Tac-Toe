import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

export default class GameHeader extends React.Component{

    render() {
        return (
         <View style={styles.container}>
       
         <Text style={styles.title}>Tic Tac Toe</Text>
         
         </View>    
        );    
  }
}

const styles=StyleSheet.create({

  container:{
     flex:0.4,
     height:80,
     marginTop:31,
     width: Dimensions.get('window').width,
     borderColor:"green",
     borderWidth:2, 
     justifyContent:"center",
     alignItems:"center",    
     backgroundColor:"blue",
  },  
  title :{
    fontSize:50,        
    color:"#FFF",
  },
});
