import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import PlayerNameScreen from './screens/PlayerNameScreen';
import PlayerNameScreenSingle from './screens/PlayerNameScreenSingle'; 

const AppNavigator  = createStackNavigator(
  { 
    Home:{screen:HomeScreen},
    GameScreen:{screen:GameScreen},
    PlayerNameScreen:{screen:PlayerNameScreen},
    PlayerNameScreenSingle:{screen:PlayerNameScreenSingle},
  },
  {
       defaultNavigationOptions:{
         headerTintColor:"#fff",
         headerStyle:{
           backgroundColor:"black",
           headerTitleStyle:{
             color:"rgba(57,62,70,0.7)",
           }
         }
       }
  }
)


const App = createAppContainer(AppNavigator);
export default App;
