import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserForm from './screens/UserForm';
import Board from './screens/Board';
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