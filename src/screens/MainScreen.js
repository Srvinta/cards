import React from 'react';
import { Text, StyleSheet, Button , SafeAreaView , View,  ImageBackground, TouchableOpacity } from 'react-native';
//import { Context } from '../context/BlogContext';

const MainScreen = (  { navigation }  ) => {
    const Separator = () => (
        <View style={styles.separator} />
      );
      

return (
    <ImageBackground source={require('../../assets/Poker.png')} style={styles.image}>
    <SafeAreaView style={styles.container}>
        <Separator />
        <Button color="black" title="Start New Game" onPress={() => navigation.navigate('Players')} />
         <Separator />
         <Button color="black" title="Enter Score" onPress={() => navigation.navigate('Score')} />
        <Separator />
        <Button color="black" title="Reports" onPress={() => navigation.navigate('Testt')} />
        <Separator />
        </SafeAreaView>
        </ImageBackground>
      );
   
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "center",
        justifyContent: "center",
        },
    container: {
       // flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 5,
        backgroundColor: 'white',
       },      
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row', 
        height: 50, 
        width: 150,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100,
        //    elevation:3,
    },
    separator: {
        marginVertical: 5,
        borderBottomColor: 'red',
        borderBottomWidth: 5,
        marginBottom: 5
      },
  });
  
  export default MainScreen ;