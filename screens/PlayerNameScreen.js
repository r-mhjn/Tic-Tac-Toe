import React from 'react';
import { Audio } from 'expo-av';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class PlayerNameScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerOne: '',
			playerTwo: '',
		};
	}

	static navigationOption = {
		headerTitle: 'Enter Players',
	};

	//TODO: function to play sound on click
	playSound = async () => {
		const soundObject = new Audio.Sound();
		try {
			let path = require('../assets/audio/Metroid_Door-Brandino480-995195341.wav');
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
				<View style={styles.inputsContainer}>
					<View style={styles.inputHolder}>
						<TextInput
							style={styles.inputText}
							placeholder="Player One"
							maxLength={8}
							onChangeText={playerone => {
								this.setState({ playerOne: playerone });
							}}
							onFocus={() => {
								this.setState({ inputBorderColor: '#3498DB' });
							}}
							onBlur={() => {
								this.setState({ inputBorderColor: 'rgba(57,62,70,0.7)' });
							}}
						></TextInput>
					</View>

					<Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>VS</Text>

					<View style={styles.inputHolder}>
						<TextInput
							style={styles.inputText}
							placeholder="Player Two"
							maxLength={8}
							onChangeText={playertwo => {
								this.setState({ playerTwo: playertwo });
							}}
							onFocus={() => {
								this.setState({ borderColor: '#3498DB' });
							}}
							onBlur={() => {
								this.setState({ borderColor: 'rgba(57,62,70,0.7)' });
							}}
						></TextInput>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => {
							this.playSound(),
								this.props.navigation.navigate('GameScreen', {
									playerOne: this.state.playerOne,
									playerTwo: this.state.playerTwo,
								});
						}}
					>
						<Text numberOfLines={1} adjustsFontSizeToFit style={styles.buttonText}>
							Start Game
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
		backgroundColor: 'black',
	},
	inputsContainer: {
		flex: 1,
		marginTop: screenHeight * 0.2,
		minHeight: screenHeight * 0.4,
		maxHeight: screenHeight * 0.4,
		alignItems: 'center',
		// borderColor:"red",
		// borderWidth:2,
		color: 'white',
	},

	inputHolder: {
		flex: 0.3,
		minHeight: screenHeight * 0.1,
		maxHeight: screenHeight * 0.1,
		minWidth: screenWidth * 0.7,
		maxWidth: screenWidth * 0.7,
		marginHorizontal: screenWidth * 0.15,
		marginVertical: screenWidth * 0.05,
		backgroundColor: 'rgba(57,62,70,0.7)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#3498DB',
		borderWidth: 2,
	},
	inputText: {
		flex: 0.5,
		flexDirection: 'row',
		fontSize: responsiveFontSize(2.3),
		color: '#3498DB',
		textDecorationLine: 'none',
	},
	buttonContainer: {
		flex: 1,
		minHeight: screenHeight * 0.3,
		maxHeight: screenHeight * 0.3,
		minWidth: screenWidth,
		maxWidth: screenWidth,
		flexDirection: 'row',
		//    borderColor:"blue",
		//    borderWidth:4,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},

	buttonText: {
		fontSize: responsiveFontSize(2.4),
		backgroundColor: 'rgba(57,62,70,0.7)',
		borderColor: '#3498DB',
		borderWidth: 2,
		color: '#fff',
		width: screenWidth * 0.4,
		marginHorizontal: screenWidth * 0.3,
		padding: screenWidth * 0.05,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
