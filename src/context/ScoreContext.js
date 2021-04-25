import createDataContext from './createDataContext';
import { firebase } from '../api/firebase/firebase';



const scoreReducer = (state, action) => {
  switch (action.type) {
    case 'get_playerlist':
      return action.payload;
    case 'rerender_player':
      return state;;
    case 'add_player':
        return [...state, action.payload ];
    case 'delete_player':
      //console.log('inside delete_player',state);
      return state.filter(state => state.game.id !== action.payload);
      //return state;
      case 'set_game' :
      //return state.filter(state => state.id === action.payload);
      return action.payload;
    default:
      return state;
  }
};

const getPlayerList = dispatch => {
  console.log("inside getPlayerList ");
  return async () => {
    
    const response=[];    
    await firebase.firestore().collection("gamelist")
    .where("status", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log("feetched data:",doc.id);
            const mydata = doc.data();
         //   console.log("feetched data:",doc.data());
         //   console.log("JSON data:",doc.json());
           // response.push(mydata);
           response.push({id: mydata.docid } );
            console.log('response: ',response);
        });
    })
    .catch((error) => {
        console.log("Error getting playerlist: ", error);
    });
    //console.log('Response json:',response.json());
    dispatch({ type: 'get_playerlist', payload: response });
  };
};

const deletePlayer = dispatch => {
  return  (docid,id) => {
    console.log('docid:',docid,'id',id);
   // console.log('state inside delete:',state);
    dispatch({ type: 'delete_player', payload: id });
  };
};

const reRender = dispatch => {
  return  ( id ) => {
    console.log('reRender:');
   // console.log('state inside delete:',state);
    dispatch({ type: 'rerender_player', payload: id });
  };
};


const setGame = dispatch => {
  console.log("inside setgame ");
  return async ( docid , callback) => {
    
    const response=[];    
    await firebase.firestore().collection("gamelist").doc(docid)
    .get()
    .then((doc) => {
      if (doc.exists){
        // Convert to City object
        //const response = doc.data();
        response.push( doc.data() );
        // Use a City instance method
      //  console.log("MY New Game:",response);
      } else {
        console.log("No such document!");
      }}).catch((error) => {
        console.log("Error getting document:", error);
      });
    //console.log('Response json:',response.json());
    dispatch({ type: 'set_game', payload: response });
    if (callback) {
      callback();
    }
  };
};


  
export const { Context, Provider } = createDataContext(
    scoreReducer,
  { getPlayerList,deletePlayer,setGame,reRender },
  []
);