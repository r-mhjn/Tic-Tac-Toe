import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import GridButton from "../src/components/GridButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const screenWidth = Dimensions.get("window").width;

var itemArray = new Array(9).fill("empty");
export default class GameScreenComputer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isComputerCross: false,
      winMessage: "",
      scorePlayer: 0,
      scoreComputer: 0,
      didWin: false,
      isButtonDisabled: false,
      playerName: "Player",
      turnComputer: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Game On!!",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Entypo
            name="home"
            size={25}
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              marginLeft: 2
            }}
            color="white"
          ></Entypo>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("resetGame")}>
          <Entypo
            name="ccw"
            size={25}
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: 2
            }}
            color="white"
          ></Entypo>
        </TouchableOpacity>
      )
    };
  };

  // to set resetGame function as a navigation param so that it can be called from a static navigationOptions method
  componentDidMount() {
    this.props.navigation.setParams({ resetGame: this.resetGame });
  }

  componentWillMount() {
    this.resetGame();
    this.getPlayerNames();
  }

  componentWillUnmount() {
    this.resetGame();
  }

  //TODO: Add a funtion to get player name and the player icon choice

  // TODO: Add a function to check the turn player/computer...enable and disable the input for the player

  //Function to play sound on click
  playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      let path = require("../assets/audio/Sound-Button.wav");
      await soundObject.loadAsync(path);
      await soundObject
        .playAsync()
        .then(async playbackStatus => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.winMessageContainer}>
          <Text style={styles.winMessage}>{this.state.winMessage}</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={0}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={1}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={2}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />
          </View>
          <View style={styles.row}>
            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={3}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={4}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={5}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />
          </View>
          <View style={styles.row}>
            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={6}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={7}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />

            <GridButton
              drawItem={this.drawItem}
              chooseItemIcon={this.chooseItemIcon}
              chooseItemColor={this.chooseItemColor}
              itemnumber={8}
              playSound={this.playSound}
              isButtonDisabled={this.state.isButtonDisabled}
            />
          </View>
        </View>

        <View style={styles.scorecontainer}>
          <Entypo
            name="circle"
            size={30}
            color="#EA425C"
            style={styles.scoreIcon}
          ></Entypo>
          <Text style={styles.scoretext}>
            {this.state.playerOne}: {this.state.scorePlayerOne}
          </Text>

          <Entypo
            name="cross"
            size={30}
            color="#3498DB"
            style={styles.scoreIcon}
          ></Entypo>
          <Text style={styles.scoretext}>
            {this.state.playerTwo}: {this.state.scorePlayerTwo}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  headerRefresh: {
    marginRight: 4,
    marginBottom: 3
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
  scorecontainer: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    //  borderColor:"red",
    //  borderWidth:2,
    alignItems: "center",
    alignContent: "center",
    minHeight: hp(4),
    marginTop: 50
    //  backgroundColor:"orange",
  },
  scoretext: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    marginRight: screenWidth * 0.1,
    marginLeft: 3,
    marginVertical: 5,
    color: "#FFF"
  },
  scoreIcon: {
    marginLeft: screenWidth * 0.02
  },
  gridContainer: {
    flex: 2,
    margin: Dimensions.get("window").width * 0.065,
    minWidth: Dimensions.get("window").width * 0.87,
    maxWidth: Dimensions.get("window").width * 0.87,
    minHeight: Dimensions.get("window").width * 0.87,
    maxHeight: Dimensions.get("window").width * 0.87
    //  borderWidth:2,
    //  borderColor:"orange",
  },
  row: {
    flexDirection: "row"
  },
  winMessageContainer: {
    flex: 0.5,
    width: Dimensions.get("window").width,
    minHeight: hp(7),
    alignItems: "center",
    justifyContent: "center"
    // borderColor:"red",
    // borderWidth:2,
  },
  winMessage: {
    padding: 20,
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "#DAE0E2"
  }
});
