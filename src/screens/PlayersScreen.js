import React,{ useState, useEffect,  useContext} from 'react';
import { StyleSheet, FlatList,TouchableOpacity, View, Text, TextInput, Button, ScrollView,SafeAreaView, LogBox  } from 'react-native';
import { Context } from '../context/PlayerContext';
import { Feather,MaterialCommunityIcons   }  from '@expo/vector-icons';
import SearchableDropdown from 'react-native-searchable-dropdown';

const PlayersScreen = (  { navigation }  ) => {
  const { state , getPlayerList, deletePlayer , addPlayer, addPlayerList } = useContext(Context);
  const [selectdPlayers , setPlayer] = useState([]);
  const [dropScore, setDrop] = useState('25');
  const [middleDropScore, setMiddle] = useState('40');
  const [fullScore, setFull] = useState('80');
  const [totalScore, setTotal] = useState('300');
  const month = new Date().getMonth() + 1;
   //const full_date = new Date().toLocaleDateString(); 
   const d = new Date();
   const docid = d.getFullYear() + '-' + month + '-' + d.getDate()   + ' ' + d.getHours() + ':' + d.getMinutes();
  
  const Separator = () => (
    <View style={styles.separator} />
  );
  //  console.log("My state:",state.name);
  const removePlayerFromList = ( item ) => {
    setPlayer(selectdPlayers.filter((selectdPlayers) => selectdPlayers.id !== item.id));
    addPlayer(item);
    //const docid = GetCurrentDateTime();
    console.log('Selected removePlayerFromList:',item);
  };
   
  const GetCurrentDateTime = () => { 
    const month = new Date().getMonth() + 1;
   //const full_date = new Date().toLocaleDateString(); 
   const d = new Date();
   const full_date = d.getFullYear() + '-' + month + '-' + d.getDate()   + ' ' + d.getHours() + ':' + d.getMinutes();
  // console.log('CURRENT_DATE:',full_date);
   return full_date
  };

  const colors = ['#123456', '#654321', '#fdecba', '#abcdef'];

  //console.log('STATE:',state);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getPlayerList();
    const listener = navigation.addListener('didFocus', () => {
      getPlayerList();
      const docid = GetCurrentDateTime();
    });
    return () => {
      listener.remove();
    };
  }, []);

  
      
      return (
        <>
          <View style={styles.scoreview} >
          <View style={styles.header1}> 
            <Text style={styles.label}>  Game Score: </Text>
            <TextInput style={styles.input} value={totalScore} onChangeText= { (text) => setTotal(text)} />
             <Text style={styles.label}>  Full Score: </Text>
            <TextInput style={styles.input}  value={fullScore} onChangeText= { (text) => setFull(text)} />
          </View>
          <View style={styles.header1}> 
          <Text style={styles.label}>  Middle Drop: </Text>
          <TextInput style={styles.input} value={middleDropScore} onChangeText= { (text) => setMiddle(text)} />
          <Text style={styles.label}>  Drop Score: </Text>
          <TextInput style={styles.input} value={dropScore} onChangeText= { (text) => setDrop(text)} />
          </View>
        </View>
        <View >
          <SearchableDropdown
            onItemSelect={(item) => {
              const items = selectdPlayers;
             // console.log('select Player', selectdPlayers);
              items.push({id: item.id, place: selectdPlayers.length + 1 , name: item.name,total:0,score:[]})
              setPlayer(items);
                console.log('select Player', selectdPlayers);
              deletePlayer(item.id);
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const items = selectdPlayers.filter((sitem) => sitem.id !== item.id);
              setPlayer(items);
            }}
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
            items={state}
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
        <ScrollView> 
        { selectdPlayers.length ? ( <FlatList 
                    style={{backgroundColor: colors[colors.length]}}
                    data={selectdPlayers}
                    keyExtractor= {item => item.id}   
                    renderItem={ ({ item }) => {
                            return (
                                  
                                  <View style={styles.row}  > 
                                   <MaterialCommunityIcons name="cards-playing-outline" size={35} color="black" />
                                    <Text style={styles.title1} > {item.name}  </Text>
                                    <TouchableOpacity onPress={ () => removePlayerFromList(item) }>
                                        <Feather style={styles.icon} name="trash" />
                                    </TouchableOpacity>
                                    </View>
                                    
                             );
                    }}
                /> 
                ) : null }
           { selectdPlayers.length > 2 ? ( <Button title='Begein the Fun' onPress={() => addPlayerList(docid,selectdPlayers, () => navigation.navigate('Score'))} /> ) : null }
           </ScrollView> 
          </>
        );
   
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
        fontSize: 16,
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
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 3,
    paddingLeft: 10,
    paddingRight: 10
    },
    input: {
      fontSize: 17,
      //borderWidth: 1,
      borderColor: 'black',
      height: 30,
      width: 40,
      flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
      //  marginBottom: 10,
     // padding: 5,
     // margin: 5
   },
   label: {
       fontSize: 17,
       marginBottom: 5,
       marginLeft: 5
   },
   separator: {
    marginVertical: 15,
    borderBottomColor: 'red',
    borderBottomWidth: 5,
    marginBottom: 15,
  },
});
  
  export default PlayersScreen ;