import React from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {Radio, Left, Right, ListItem} from 'native-base';


export default class PlayerNameScreen extends React.Component
{

     constructor(props) {
         super(props);     
         this.state = {
           playerOne:'',
           playerTwo:'',                     
         }
     }    

   static navigationOption ={
       headerTitle:"Enter Players",
   }

     render(){
         return (
             <View style={styles.container}>
            
             <View style={styles.playerIconContainer}>
             <ListItem>
             <Left>
               <Text>Daily Stand Up</Text>
             </Left>
             <Right>
               <Radio selected={false} />
             </Right>
           </ListItem>
           <ListItem>
             <Left>
               <Text>Discussion with Client</Text>
             </Left>
             <Right>
               <Radio selected={true} />
             </Right>
           </ListItem> 
             
              
             </View>

             <View style={styles.inputsContainer}>             
             <View style={styles.inputHolder}>             
             <TextInput
             style={styles.inputText}
             placeholder="Player Name"
             maxLength = {8}
             onChangeText={ (playerone) => {this.setState({playerOne:playerone})}}
             onFocus={()=>{
                this.setState({inputBorderColor: "#3498DB"})
             }}
             onBlur={()=>{
                this.setState({inputBorderColor:"rgba(57,62,70,0.7)"})
            }}
             >
             </TextInput>
             </View>

             <Text style={{color:"#fff", fontSize:responsiveFontSize(2)}}>VS</Text>

 
             <View style={styles.inputHolder}>             
             <TextInput
             style={styles.inputText}
             placeholder="Computer"
             maxLength = {8}
             editable={false}
             onChangeText={ (playerone) => {this.setState({playerOne:playerone})}}
             onFocus={()=>{
                this.setState({inputBorderColor: "#3498DB"})
             }}
             onBlur={()=>{
                this.setState({inputBorderColor:"rgba(57,62,70,0.7)"})
             }}
             >
             </TextInput>
             </View>  
             </View>

             <View style={styles.buttonContainer}>
             <TouchableOpacity 
             onPress={ ()=>{
                this.props.navigation.navigate("GameScreen", {playerOne:this.state.playerOne, playerTwo:this.state.playerTwo});
             }}>
             <Text 
             numberOfLines={1}
             adjustsFontSizeToFit 
             style={styles.buttonText}>Start Game</Text>             
             </TouchableOpacity>             
             </View>             
             </View>
         );
     }
}



const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"black",
    },
    playerIconContainer:{
        minHeight:screenHeight*0.20,
        maxHeight:screenHeight*0.20,
        minWidth:screenWidth,
        maxWidth:screenWidth,
        borderColor:"blue",
        borderWidth:2,
    },
    inputsContainer:{
        flex:1,        
        // marginTop:screenHeight*0.20,
        minHeight:screenHeight*0.40,
        maxHeight:screenHeight*0.40,     
        alignItems:"center",
        borderColor:"red",
        borderWidth:2,
        color:"white",
     },  

     inputHolder:{
        flex:0.3,
        minHeight:screenHeight*0.10,
        maxHeight:screenHeight*0.10,
        minWidth:screenWidth*0.70,
        maxWidth:screenWidth*0.70,       
        marginHorizontal:screenWidth*0.15,
        marginVertical:screenWidth*0.05,        
        backgroundColor:"rgba(57,62,70,0.7)",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,  
        borderColor:"#3498DB",
        borderWidth:2,
    },       
    inputText:{
        flex:0.5,
        flexDirection:"row",
        fontSize:responsiveFontSize(2.3),
        color:"#3498DB",        
        textDecorationLine:"none",    
    },
    buttonContainer:{
       flex:1,    
       minHeight:screenHeight*0.30,  
       maxHeight:screenHeight*0.30,  
       minWidth:screenWidth,
       maxWidth:screenWidth,
       flexDirection:"row",
       borderColor:"blue",
       borderWidth:4,
       justifyContent:"center",
       alignItems:"flex-start",     
    },

    buttonText:{
        fontSize:responsiveFontSize(2.4),
        backgroundColor:"rgba(57,62,70,0.7)",
        borderColor:"#3498DB",
        borderWidth:2,
        color:"#fff",
        width:screenWidth*0.40,
        marginHorizontal:screenWidth*0.30,
        padding:screenWidth*0.05,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
    },
});