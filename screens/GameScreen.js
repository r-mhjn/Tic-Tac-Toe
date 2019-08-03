import React from 'react';
import { StyleSheet, Text ,View, Dimensions, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import GridButton from '../src/components/GridButton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const screenWidth = Dimensions.get('window').width;


var itemArray = new Array(9).fill("empty");

export default class GameScreen extends React.Component {


   constructor(props) {
    super(props)
  
    this.state = {
       isCross: false,
       winMessage:"",
       scorePlayerOne: 0,
       scorePlayerTwo:0,
       didWin:false,       
       isLoading: true,
       isButtonDisabled: false,
       playerOne:"PlayerOne",
       playerTwo:"PlayerTwo",
       scoreColorOne:"red",
       scoreColorTwo:"#fff",
    }    
  }
  

  static navigationOptions = ({ navigation })  => {   
  return{
    title: 'Game On!!',  
    headerLeft:  (
      <TouchableOpacity
      onPress={ () =>{
        navigation.navigate('Home')
      }}
      >
      <Entypo name="home"
      size={25}
      style={{justifyContent:"center", alignItems:"flex-end", marginLeft:2,}}
      color="white"    
      ></Entypo>    
      </TouchableOpacity>
      ),
    headerRight:(
    <TouchableOpacity
    onPress={navigation.getParam('resetGame')}
    >
    <Entypo name="ccw"
    size={25}
    style={{justifyContent:"center", alignItems:"flex-end", marginRight:2,}}
    color="white"    
    ></Entypo>    
    </TouchableOpacity>
    ),
   }; 
  };
 
  // to set resetGame function as a navigation param so that it can be called from a static navigationOptions method
  componentDidMount(){
    this.props.navigation.setParams({ resetGame: this.resetGame });    
  }

  // Method to get Player Names
  getPlayerNames =()=>{
    let playerOne  =  this.props.navigation.getParam("playerOne");
    let playerTwo  =  this.props.navigation.getParam("playerTwo");    
    if(playerOne==='')
    { playerOne='PlayerOne' }
    if(playerTwo==='')
    { playerTwo='PlayerTwo' }
    this.setState({playerOne:playerOne});
    this.setState({playerTwo:playerTwo});
  }  
  
  componentWillMount(){
    this.resetGame();
    this.getPlayerNames();   
    // this.setState({scoreColorOne:"red"}); // To initially highlight the color of player one
   
  }

  componentWillUnmount(){    
    this.resetGame();    
  }


  //TODO: Highlight player turn
  highlightPlayer  = () =>{
    if(this.state.isCross===false)
    {     
      this.setState({scoreColorOne:"#fff"});
      this.setState({scoreColorTwo:"red"});
      this.forceUpdate();
    }
    if(this.state.isCross===true)
    {   
      this.setState({scoreColorTwo:"#fff"});
      this.setState({scoreColorOne:"red"});
      this.forceUpdate();
    }
  }

  //TODO: function to play sound on click
  playSound = async () => {
    const soundObject  =  new Audio.Sound();
    try{
       let path = require('../assets/audio/Sound-Button.wav');
       await soundObject.loadAsync(path);
       await soundObject.playAsync()
       .then( async playbackStatus =>{
         setTimeout( () =>{
           soundObject.unloadAsync();
         }, playbackStatus.playableDurationMillis);
       })
       .catch( error => {
         console.log(error);
       })
    }
    catch(error){
      console.log(error);
    }
  }

  // Method to draw the icon item
  drawItem = (itemNumber) => {    
    if(itemArray[itemNumber] === 'empty')
    {
      itemArray[itemNumber] = this.state.isCross;
      this.setState({isCross:!itemArray[itemNumber]});
      this.forceUpdate();
    }    
       // TODO: add a method highlightPlayer   
       console.log(this.state.isCross);
       this.highlightPlayer()
       this.winGame();    
  };
  
  // Method to choose icon item
  chooseItemIcon = (itemNumber) => {
     
    if(itemArray[itemNumber] !== "empty"){
          
        return itemArray[itemNumber] ? "cross" : "circle";
     }
     return "feather";
  }

   // Method to choose item color
  chooseItemColor = (itemNumber) =>{
     
     if(itemArray[itemNumber] !== "empty"){
          
      return itemArray[itemNumber] ? "#3498DB" : "#fff";
      }
     return "black";
  }

     resetGame = () => {     
     itemArray.fill("empty");
     this.setState({winMessage :''});
     this.setState({isCross : false});
     this.setState({didWin:false});
     this.setState({flag:true});
     this.setState({isButtonDisabled:false});
     this.setState({scoreColorOne:"red"});
      this.setState({scoreColorTwo:"#fff"});
     // force update to the component
     this.forceUpdate();
    }

    increaseScore =(value) => {
      if(value==false)     // here false  = circle  =  player one
        {
           let scorePlayerOne = this.state.scorePlayerOne+1;
           this.setState({scorePlayerOne:scorePlayerOne});
        }
      else if(value==true){
        let scorePlayerTwo = this.state.scorePlayerTwo+1;
            this.setState({scorePlayerTwo: scorePlayerTwo});
         }
     }

  winGame = () =>{     

     if( (itemArray[0] !== "empty") && (itemArray[0] == itemArray[1]) && (itemArray[1] == itemArray[2]))
     {
         this.setState({winMessage: (itemArray[0] ? this.state.playerTwo:this.state.playerOne ).concat(' Win\'s')});
         this.setState({didWin:true});    
         this.increaseScore(itemArray[0]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[3] !== "empty") && (itemArray[3] == itemArray[4]) && (itemArray[4] == itemArray[5]))
     {
         this.setState({winMessage: (itemArray[3] ? this.state.playerTwo:this.state.playerOne).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[3]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[6] !== "empty") && (itemArray[6] == itemArray[7]) && (itemArray[7] == itemArray[8]))
     {
         this.setState({winMessage: (itemArray[6] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[6]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[0] !== "empty") && (itemArray[0] == itemArray[3]) && (itemArray[3] == itemArray[6]))
     {
         this.setState({winMessage: (itemArray[0] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[0]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[1] !== "empty") && (itemArray[1] == itemArray[4]) && (itemArray[4] == itemArray[7]))
     {
         this.setState({winMessage: (itemArray[1] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[1]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[2] !== "empty") && (itemArray[2] == itemArray[5]) && (itemArray[5] == itemArray[8]))
     {
         this.setState({winMessage: (itemArray[2] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[2]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[0] !== "empty") && (itemArray[0] == itemArray[4]) && (itemArray[4] == itemArray[8]))
     {
         this.setState({winMessage: (itemArray[0] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[0]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }
     else if( (itemArray[2] !== "empty") && (itemArray[2] == itemArray[4]) && (itemArray[4] == itemArray[6]))
     {
         this.setState({winMessage: (itemArray[2] ? this.state.playerTwo:this.state.playerOne ).concat('  Win\'s')});
         this.setState({didWin:true});
         this.increaseScore(itemArray[2]);
         this.setState({isButtonDisabled:true});
        //  this.alertUser();
     }else{      
      this.drawGame();
     }
  } 

  drawGame =()=>{
 
    let flag=true;
    for(let i=0; i<9; i++)
    {
      if(itemArray[i]=="empty")
      {       
        flag=true;        
        break;
      }
      else{       
        flag=false;        
      }
    }      
     if(flag==false && this.state.didWin==false)
     {
        console.log("draw3");
        this.setState({winMessage:"Draw"});
        // this.alertUser();
     }
  }
 
  render(){     
  return (
      <View style={styles.container}>
         
        <View style={styles.winMessageContainer}>
        <Text style={styles.winMessage}>{ this.state.winMessage }</Text>
        </View>  

         <View style={styles.gridContainer}>
         <View style={styles.row}>
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={0}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
        
         <GridButton drawItem={this.drawItem}
           chooseItemIcon={this.chooseItemIcon}
           chooseItemColor={this.chooseItemColor}
           itemnumber={1}
           playSound={this.playSound}
           isButtonDisabled={this.state.isButtonDisabled}
           />
           
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={2}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
         </View>
         <View style={styles.row}>
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={3}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
        
         <GridButton drawItem={this.drawItem}
           chooseItemIcon={this.chooseItemIcon}
           chooseItemColor={this.chooseItemColor}
           itemnumber={4}
           playSound={this.playSound}
           isButtonDisabled={this.state.isButtonDisabled}
           />
           
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={5}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
         </View>
         <View style={styles.row}>
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={6}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
        
         <GridButton drawItem={this.drawItem}
           chooseItemIcon={this.chooseItemIcon}
           chooseItemColor={this.chooseItemColor}
           itemnumber={7}
           playSound={this.playSound}
           isButtonDisabled={this.state.isButtonDisabled}
           />
           
         <GridButton drawItem={this.drawItem}
          chooseItemIcon={this.chooseItemIcon}
          chooseItemColor={this.chooseItemColor}
          itemnumber={8}
          playSound={this.playSound}
          isButtonDisabled={this.state.isButtonDisabled}
          />
         </View>
         </View>        

         <View style={styles.scorecontainer}>         
         <Entypo name="circle"
          size={30}
          color="#fff" 
          style={styles.scoreIcon}
         ></Entypo>
         <Text style={[styles.scoretextPlayerOne, {color:this.state.scoreColorOne}]} >{this.state.playerOne}: {this.state.scorePlayerOne}</Text>
         
         <Entypo name="cross"
          size={30}
          color="#3498DB" 
          style={styles.scoreIcon}
         ></Entypo> 
         <Text style={[styles.scoretextPlayerTwo, {color:this.state.scoreColorTwo}]} >{this.state.playerTwo}: {this.state.scorePlayerTwo}</Text>
         </View>       
      </View>
   );
 }
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"black",
   },  
   headerRefresh:{
      marginRight:4,
      marginBottom:3,
   },
   icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
   scorecontainer:{
     flex:1,
     flexDirection:"row",
     width: Dimensions.get('window').width,
    //  borderColor:"red",
    //  borderWidth:2,
     alignItems:"center",
     alignContent:"center",
     minHeight:hp(4),
     marginTop:50,
    //  backgroundColor:"orange",
   },
   scoretextPlayerOne:{
     fontSize:responsiveFontSize(2.3),
     fontWeight:"bold",
     marginRight:screenWidth*0.10,
     marginLeft:3,
     marginVertical:5,
    //  color:this.state.scoreColorOne,
   },
   scoretextPlayerTwo:{
    fontSize:responsiveFontSize(2.3),
    fontWeight:"bold",
    marginRight:screenWidth*0.10,
    marginLeft:3,
    marginVertical:5,
    // color:this.state.scoreColorTwo,
  },
   scoreIcon:{
    marginLeft:screenWidth*0.02,
   },
   gridContainer:{
     flex:2,     
     margin:Dimensions.get('window').width*0.065,     
     minWidth:Dimensions.get('window').width*0.87,
     maxWidth:Dimensions.get('window').width*0.87,
     minHeight:Dimensions.get('window').width*0.87,
     maxHeight:Dimensions.get('window').width*0.87,
    //  borderWidth:2,
    //  borderColor:"orange",
   },
   row:{
      flexDirection:"row",  
   },
   winMessageContainer:{
      flex:0.5,      
      width:Dimensions.get('window').width,     
      minHeight:hp(7), 
      alignItems:"center",    
      justifyContent:"center",
      // borderColor:"red",
      // borderWidth:2,
   },
   winMessage:{
       padding:20,
       fontSize:responsiveFontSize(3),
       fontWeight:"bold",
       color:"#DAE0E2", 
   },  
});
