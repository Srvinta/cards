import  React  from 'react';
import { View, Text, StyleSheet , FlatList, TouchableOpacity } from 'react-native';
import PlayersDetail from './PlayersDetail';
import { withNavigation } from 'react-navigation';



const PlayersList = ( {gameList, title, navigation } ) => {
    
    console.log('Gamelist results:', gameList);
    if ( !gameList.length ) {
        return null;
    }

    const getColor = (  ) => {
        switch (title) { 
            case 'Still in Game':
                return 'green';
            case 'Compulsary':
                return 'yellow'
            case 'Out of Game':
                return 'red'
            default:
                return 'white';
        }
    };

    const colorStyles = {
        backgroundColor: getColor()
    };

    const Separator = () => (
        <View style={styles.separator} />
      );
      
     
    return(
        <View style={styles.container}>
            <Text style={[styles.titleStyle,colorStyles]}> {title} </Text>
            <Separator/>
            < FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={gameList.sort(function(a, b) {return a.total - b.total;})}
                keyExtractor={result => result.id}
                renderItem={( { item }) => {
                return ( 
                    <PlayersDetail result={item} />
                );
                }}
            />
         </View>
    ) ;
};

const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: 5,
      
    },
    container:{
        marginBottom: 10,
        backgroundColor: 'white'
    },
    separator: {
        marginVertical: 5,
        borderBottomWidth: 5,
        marginBottom: 5
      },
});
  
  export default withNavigation(PlayersList);