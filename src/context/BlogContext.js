import createDataContext from './createDataContext';
import { firebase } from '../api/firebase/firebase';



const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPost = dispatch => {
  console.log("inside getBlogPost ");
  return async () => {
    
    const response=[];    
    await firebase.firestore().collection("blogposts")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           // console.log("feetched data:",doc.id, " => ", doc.data());
            const mydata = doc.data();
            response.push({id: doc.id, title: mydata.title, content: mydata.content} );
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    //console.log('Response:',response);
    dispatch({ type: 'get_blogposts', payload: response });
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await firebase.firestore().collection('blogposts').add({ title, content });

    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await firebase.firestore().collection('blogposts').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });

    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    console.log('Edit id:',id);
   // await firebase.firestore().collection('blogposts').push(`${id}`,{ title, content });

   await firebase.firestore().collection('blogposts').doc(id).update({ title, content })
    .then(() => {
    console.log("Document successfully updated!");
    }).catch((error) => {
    console.error("Doc update error: ", error);
    });

    dispatch({
      type: 'edit_blogpost',
      payload: { id, title, content }
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
);