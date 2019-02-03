/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import UserForm from './UserForm';
import Board from './Board';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Lobby from './Lobby';
import Challenge from './Challenge';


const MainNavigator = createStackNavigator({
  Home: {screen: UserForm},
  Game: {screen: Board},
  Lobby: {screen: Lobby},
  Challenge: {screen: Challenge}
});

const App = createAppContainer(MainNavigator);

export default App;