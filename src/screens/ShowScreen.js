import  React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome }  from '@expo/vector-icons';



const ShowScreen = (  { navigation }  ) => {
    const { state  } = useContext(Context);

    const blogPost = state.find(
        blogPost => blogPost.id === navigation.getParam('id')
      );
      
    return(
        <View >
            <Text> {blogPost.title}  </Text>
            <Text> {blogPost.content}  </Text>
         </View>
    ) ;
};

ShowScreen.navigationOptions = ( {navigation} ) => {
    return {
        headerRight: () =>  (
        <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })} >
            <FontAwesome style={styles.header} name="pencil" size={30} />
        </TouchableOpacity>
        )

    };
};

const styles = StyleSheet.create({  
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
     },
     title: {
         fontSize: 18
     },
     icon: {
         fontSize: 25
     }
  });
  
  export default ShowScreen ;