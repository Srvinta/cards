import  React , { useState} from 'react';
import { View, Text, StyleSheet , FlatList, TouchableOpacity } from 'react-native';

const ScoreBoard = ( PlayerList ) => {
   
    
    const [selectdPlayers , setPlayer] = useState(PlayerList);

    console.log('insdie ScoreBoard selectdPlayers:',selectdPlayers );

    return(
        <View style={styles.container}>
            <Text style={styles.titleStyle}> PlayerList </Text>
            < FlatList
                showsHorizontalScrollIndicator={false}
                data={selectdPlayers.PlayerList.PlayerList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={( { item }) => {
                return ( 
                    <View> 
                        <Text style={styles.score}> {item.name} </Text>
                    </View>
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
      marginBottom: 5
    },
    container:{
        marginBottom: 10
    }
});
  
  export default ScoreBoard;