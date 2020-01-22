import React from "react";
import { Audio } from "expo-av";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Alert
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOption = {
    title: "HomeScreen"
  };

  //TODO: function to play sound on click
  playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      let path = require("../assets/audio/Metroid_Door-Brandino480-995195341.wav");
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

  alertUser = () => {
    Alert.alert(
      "Exit Game",
      "Are you sure you want to quit?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.alertUser();
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.gameTitle}>Tic Tac Toe</Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            title="Play Game"
            onPress={() => {
              {
                this.playSound(),
                  this.props.navigation.navigate("PlayerNameScreen");
              }
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={styles.buttontext}
            >
              Play Game
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            title="Quit"
            onPress={() => {
              this.playSound(), this.alertUser();
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={styles.buttontext}
            >
              Quit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  titlecontainer: {
    flex: 1,
    //  borderColor:"red",
    //  borderWidth:2,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: screenHeight * 0.08,
    minHeight: screenHeight * 0.18,
    maxHeight: screenHeight * 0.18
  },
  gameTitle: {
    color: "#3498DB",
    // borderColor:"pink",
    padding: "4%",
    fontSize: responsiveFontSize(5.5),
    // borderWidth:2,
    marginHorizontal: screenWidth * 0.1,
    minWidth: screenWidth * 0.8,
    minHeight: screenHeight * 0.18,
    maxHeight: screenHeight * 0.18,
    textAlign: "center"
  },
  buttoncontainer: {
    flex: 1
    // borderColor:"orange",
    // borderWidth:2,
  },
  button: {
    borderRadius: 20,
    borderColor: "#3498DB",
    borderWidth: 2,
    backgroundColor: "rgba(57,62,70,0.7)",
    marginVertical: screenHeight * 0.01,
    minWidth: screenWidth * 0.7,
    minHeight: screenHeight * 0.08,
    maxWidth: screenWidth * 0.7,
    maxHeight: screenHeight * 0.08
  },
  buttontext: {
    fontSize: responsiveFontSize(2.4),
    color: "#fff",
    padding: "6%",
    textAlign: "center"
  }
});
