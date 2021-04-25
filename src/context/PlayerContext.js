import createDataContext from './createDataContext';
import { firebase } from '../api/firebase/firebase';



const playerReducer = (state, action) => {
  switch (action.type) {
    case 'get_playerlist':
      return action.payload;
    case 'add_player':
        return [...state, action.payload ];
    case 'delete_player':
      return state.filter(state => state.id !== action.payload);
    default:
      return state;
  }
};

const getPlayerList = dispatch => {
  //console.log("inside getPlayerList ");
  return async () => {
    
    const response=[];    
    await firebase.firestore().collection("playerlist")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           // console.log("feetched data:",doc.id, " => ", doc.data());
            const mydata = doc.data();
            response.push({id: doc.id, name: mydata.name, rank: mydata.rank, handle: mydata.handle} );
        });
    })
    .catch((error) => {
        console.log("Error getting playerlist: ", error);
    });
    //console.log('Response:',response);
    dispatch({ type: 'get_playerlist', payload: response });
  };
};

const deletePlayer = dispatch => {
    return  id => {
      dispatch({ type: 'delete_player', payload: id });
    };
  };

  const addPlayer = dispatch => {
    return  (item) => {
      dispatch({ type: 'add_player', payload: item });
    };
  };

  const addPlayerList = dispatch => {
    return async (docid,selectdPlayers,callback) => {
      await firebase.firestore().collection('gamelist').doc(docid).set({docid, status: true, game: selectdPlayers})
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
      console.log('PLAYERLIST',selectdPlayers);
      console.log('DOCID',docid);
      if (callback) {
        callback();
      }
    };
  };

  
export const { Context, Provider } = createDataContext(
    playerReducer,
  { getPlayerList, deletePlayer,addPlayer,addPlayerList },
  []
);