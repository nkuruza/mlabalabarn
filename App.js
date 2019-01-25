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


const MainNavigator = createStackNavigator({
  Home: {screen: UserForm},
  Game: {screen: Board},
});

const App = createAppContainer(MainNavigator);

export default App;