import React,{ useState, useEffect, useContext} from 'react';
import { StyleSheet, FlatList,TouchableOpacity, View, Text,  Button } from 'react-native';
import { Context } from '../context/ScoreContext';
import ScoreBoard from '../components/ScoreBoard';
import { AntDesign } from '@expo/vector-icons'; 


//import { Context } from '../context/BlogContext';
//import BlogPostForm from '../components/BlogPostForm';

const ScoreScreen = (  { navigation }  ) => {

   const { state , getPlayerList, setGame } = useContext(Context);
   const [selectdPlayers , setPlayer] = useState([]);
    
  useEffect(() => {
   getPlayerList();
     const listener = navigation.addListener('didFocus', () => {
     getPlayerList();
    // const docid = GetCurrentDateTime();
   });
   return () => {
     listener.remove();
   };
 }, []);

// console.log('inside playerscreen',selectdPlayers);
    
return (
        <View  style={styles.container} > 
          <Text > Game List </Text>
          <FlatList 
              data={state}
              keyExtractor= {blogPost => blogPost.id}   
              renderItem={ ({ item, index }) => {
                  return (
                    <View style={styles.row} > 
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Game', { id: item.id })}
                    >
                      <Text style={styles.title} > GameId: {item.id} - {index}  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setGame(item.id, () => navigation.navigate('Board', { id: item.id }) ) }>
                    <AntDesign name="pluscircle" size={34} color="blue" />
                    </TouchableOpacity>                              
                    </View>
                  );
            }}
          />
               
        </View>
      );
   
};

const styles = StyleSheet.create({  
   container: {
    
   },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:5,
    paddingRight: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'gray'
    },
    title: {
    fontSize: 18
    },
    icon: {
    fontSize: 25
    },
    header: {
    paddingRight: 5,
    paddingVertical:20,
    paddingHorizontal: 10,
    }
 });
  
  export default ScoreScreen ;