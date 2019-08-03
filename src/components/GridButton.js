import React from 'react';
import { StyleSheet, Text ,View ,TouchableOpacity, Dimensions} from 'react-native';
import { Entypo } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;

export default class GridButton extends React.Component{

   constructor(props) {
       super(props);  
   }

   render() {
       return (
        <View style={styles.item}>        
        <TouchableOpacity 
         disabled ={this.props.isButtonDisabled}
         onPress ={() => {this.props.drawItem(this.props.itemnumber),this.props.playSound() }}
        >
        <Entypo name={this.props.chooseItemIcon(this.props.itemnumber)}
          size={screenWidth*0.11}
          color={this.props.chooseItemColor(this.props.itemnumber)} 
        ></Entypo>
        </TouchableOpacity>
        </View>  
        
       );
   }
}


const styles = StyleSheet.create({

    item:{
        flex:1,
        // borderWidth:2,
        // borderColor:"blue",
        backgroundColor:"rgba(57,62,70,0.7)",       
        padding:screenWidth*0.08,
        minWidth:(Dimensions.get('window').width)*0.28,
        maxWidth:(Dimensions.get('window').width)*0.28,
        minHeight:(Dimensions.get('window').width)*0.28,
        maxHeight:(Dimensions.get('window').width)*0.28,
        margin:Dimensions.get('window').width*0.005,
      }
});