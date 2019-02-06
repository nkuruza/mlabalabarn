/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import UserForm from './screens/UserForm';
import Board from './component/Board';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Lobby from './screens/Lobby';
import Challenge from './screens/Challenge';


const MainNavigator = createStackNavigator({
  Home: { screen: UserForm },
  Game: { screen: Board },
  Lobby: { screen: Lobby },
  Challenge: { screen: Challenge }
});

const App = createAppContainer(MainNavigator);

export default App; 