import  React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView , FlatList} from 'react-native';
import { Context } from '../context/ScoreContext';
import PlayersList from '../components/PlayersList'

const ShowGameScreen = ( { navigation } ) => {
    const { state } = useContext(Context);
    const gameId = navigation.getParam('id');

    const gameList = state.find(
        game => game.id === navigation.getParam('id')
      );

      const filterResultsByScore = ( low, high ) => {
        //return gameList.game.filter( game => { return game.total >= low && game.total <= high;
          //        });
        console.log(gameList);
      };
      
       return(
        < >
       
            <ScrollView style={styles.container} > 
             <Text style={styles.textStyle}> {gameId} </Text>
            
            <PlayersList gameList={filterResultsByScore(0,275)} title="Still in Game" />
            <PlayersList gameList={filterResultsByScore(276,300)} title="Compulsary" />
            <PlayersList gameList={filterResultsByScore(301,400)} title="Out of Game" />
                                
            </ScrollView>
         </>
    ) ;
};

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 25,
      marginLeft: 55,
    },
    subHeader: {
       fontSize: 35 
    },
    container: {
      //  backgroundColor: 'blue',
        margin: 10
       },
  });
  
  export default ShowGameScreen ;