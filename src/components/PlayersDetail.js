import  React  from 'react';
import { View, Text, StyleSheet , Image,FlatList } from 'react-native';

const PlayersDetail = ( { result } ) => {
 
    return(
        <View style={styles.containerStyle}>
            <View >
            <Image style={styles.imageStyle} source={require('../../assets/gambler.png')}/>
            <Text style={styles.nameStyle}> {result.name} </Text>
            <Text> Total Score: {result.total}  </Text>
            </View>
            <Text> Score</Text>
             < FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={result.score}
                keyExtractor={(item, index) => index.toString()}
                renderItem={( { item }) => {
                return ( 
                    <View> 
                        <Text style={styles.score}> {item} </Text>
                    </View>
                   );
                }}
            />
         </View>
    ) ;
};

const styles = StyleSheet.create({
    containerStyle: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row'
    },
    imageStyle: {
      width: 200,
      height: 100,
      borderRadius: 4,
      marginBottom: 5
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    score: {
        fontSize:18 
    }
});
  
  export default PlayersDetail ;