import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider as PlaerProvier } from './src/context/PlayerContext';
import { Provider as ScoreProvier } from './src/context/ScoreContext';
import MainScreen from './src/screens/MainScreen';
import PlayersScreen from './src/screens/PlayersScreen';
import ScoreScreen from './src/screens/ScoreScreen';
import ShowGameScreen from './src/screens/ShowGameScreen';
import ScoreBoardScreen from './src/screens/ScoreBoardScreen';
import TestScreen from './src/screens/TestScreen';


const navigator = createStackNavigator(
  {
    Main: MainScreen,
    Players: PlayersScreen,
    Score: ScoreScreen,
    Game: ShowGameScreen,
    Board: ScoreBoardScreen,
    Testt: TestScreen,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Conway Cards Club'
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <PlaerProvier>
      <ScoreProvier>
      <App />
      </ScoreProvier>
    </PlaerProvier>
  );
};