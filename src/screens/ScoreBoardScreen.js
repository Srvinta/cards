import  React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView , FlatList,Button, TouchableOpacity, TextInput, LogBox} from 'react-native';
import { Context } from '../context/ScoreContext';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Feather,MaterialCommunityIcons   }  from '@expo/vector-icons';

const ScoreBoardScreen = ( { navigation } ) => {
    const { state , setGame, reRender } = useContext(Context);
    

    const gameId = navigation.getParam('id');
    const [selectdPlayers , setPlayer] = useState([]);
    const [FullPlayers , setFullPlayer] = useState([]);
    const [score, setScore] = useState('25');
   // const gameList = [];
    const docid = navigation.getParam('id');

    useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
     // setGame(docid, () => createFulPlyayeres() );
      setFullPlayer(state);
      const listener = navigation.addListener('didFocus', () => {
      //  setGame(docid,  () => setFullPlayer(state));
      });
      return () => {
        listener.remove();
      };
    }, []);
    const createFulPlyayeres = () => {
      setFullPlayer(state);
      console.log('state full players....', state );

    };
    // console.log('STATE full players', FullPlayers );
    // console.log('STATE STATE', state );

     if ( !FullPlayers.length ) {
      return null;
     }

   const removePlayerFromList = ( item ) => {
   // setPlayer(selectdPlayers.filter((selectdPlayers) => selectdPlayers.id !== item.id));
    addPlayer(item);
    //const docid = GetCurrentDateTime();
    console.log('Selected removePlayerFromList:',item);
  };
   
  const deletePlayerFromFullList = ( item ) => {
    // setFullPlayer(FullPlayers.filter((FullPlayers) => FullPlayers.game.id !== item.id));
     reRender(item);
    //const docid = GetCurrentDateTime();
    console.log('Selected deletePlayerFromFullList:',item);
  };

    const colors = ['#123456', '#654321', '#fdecba', '#abcdef'];
          const Separator = () => (
        <View style={styles.separator} />
      );
      
       return(
        <>
       
            <View> 
            <View style={styles.header1}> 
            <Text style={styles.label}>  Enter Score: </Text>
            <TextInput style={styles.input} value={score} onChangeText= { (text) => setScore(text)} />
             
          </View>
             <SearchableDropdown
            onItemSelect={(item) => {
              const items = selectdPlayers;
              console.log('select Player Before:', selectdPlayers);
              items.push({id: item.id, place: selectdPlayers.length + 1 , name: item.name,total: item.total + parseInt(score) ,score: item.score})
              setPlayer(items);
               console.log('select Player After:', selectdPlayers);
              deletePlayerFromFullList(item.id);
            }}
            containerStyle={{ padding: 5 }}
             itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 3,
              borderRadius: 10,
            }}
            itemTextStyle={{ color: '#222', alignSelf: 'center' }}
            itemsContainerStyle={{ maxHeight: 150 }}
            items={state[0].game}
          //  defaultIndex={1}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Player Search ",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 5,
                    borderWidth: 2,
                    borderColor: '#42827e',
                    borderRadius: 5,
                },
             //   onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
            </View>
            { selectdPlayers.length ? (
            <ScrollView> 
          <FlatList 
                    style={{backgroundColor: colors[colors.length]}}
                    data={selectdPlayers}
                    keyExtractor= {item => item.id}   
                    renderItem={ ({ item }) => {
                            return (
                                  
                                  <View style={styles.row}  > 
                                   <MaterialCommunityIcons name="counter" size={35} color="black" />
                                    <Text style={styles.title1} > {item.name} -C: {score} -T: {item.total} </Text>
                                    <TouchableOpacity onPress={ () => removePlayerFromList(item) }>
                                        <Feather style={styles.icon} name="trash" />
                                    </TouchableOpacity>
                                    </View>
                                    
                             );
                    }}
                /> 
                { selectdPlayers.length > 2 ? ( <Button title='SAVE SCORE' onPress={() => addPlayerList(docid,selectdPlayers, () => navigation.navigate('Score'))} /> ) : null }
           </ScrollView> 
            ) : null }
         </>
    ) ;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:4,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderColor: 'gray'
 },
 search: {
  flexDirection: 'row',
  paddingVertical:4,
  paddingHorizontal: 4,
  borderTopWidth: 1,
 },
 title: {
     fontSize: 20,
     marginBottom: 10,
     color:'blue',    
     fontWeight: "bold",
     alignContent:'center'  
    },
    title1: {
      fontSize: 18,
      color:'red'
     },
  scoreview: {
    backgroundColor: '#99a7a0', 
    borderWidth:3, 
    borderColor:'#29302c',
    marginTop: 10,
    margin: 5,
    padding:3, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, },
 icon: {
     fontSize: 25
 },
 header: {
     paddingRight: 5,
     paddingVertical:20,
    paddingHorizontal: 10,
 },
 header1: {
  fontSize: 23,
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 3,
  paddingLeft: 10,
  paddingRight: 10,
  paddingVertical:10,
  paddingHorizontal: 10,
  borderColor: 'black',
  borderWidth: 5,
  },
  input: {
    fontSize: 23,
    //borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 60,
   //   flexDirection: 'row',
      backgroundColor: 'lightgray',
    //  justifyContent: 'center',
  //    alignItems: 'center',
    marginLeft: 10,
   // padding: 5,
   // margin: 5
 },
 label: {
     fontSize: 23,
     marginTop: 10,
     color:'blue', 
 },
 separator: {
  marginVertical: 15,
  borderBottomColor: 'red',
  borderBottomWidth: 5,
  marginBottom: 15,
},
  });
  
  export default ScoreBoardScreen ;