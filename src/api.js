import firebase from './firebase';
import 'firebase/firestore';

const collectionName = 'todoLists';

export const getTodoForUser = (userId) => {
  if (process.env.REACT_APP_USE_MOCK === 'true') {
    return new Promise((resolve, reject) => {
      let MOCK_DATA = [
        { id: '1', itemTitle: 'TODO-item 1', isFavorite: true, isDone: false },
        { id: '2', itemTitle: 'TODO-item 2', isFavorite: false, isDone: false },
        { id: '3', itemTitle: 'TODO-item 3', isFavorite: false, isDone: true },
        { id: '4', itemTitle: 'TODO-item 4', isFavorite: false, isDone: true },
        { id: '5', itemTitle: 'TODO-item 5', isFavorite: false, isDone: false },
        { id: '6', itemTitle: 'TODO-item 6', isFavorite: false, isDone: true },
        { id: '7', itemTitle: 'TODO-item 7', isFavorite: false, isDone: false },
      ];
      console.log('Mock retrieving list');
      resolve(MOCK_DATA);
    });
  }
  return firebase
    .firestore()
    .collection(collectionName)
    .doc(userId)
    .get()
    .then((doc) => {
      return doc.data().tasks;
    });
};

export const setTodoForUser = (userId, tasks) => {
  if (process.env.REACT_APP_USE_MOCK === 'true') {
    console.log('Mock saving list');
    return;
  }
  return firebase
    .firestore()
    .collection(collectionName)
    .doc(userId)
    .set({ tasks: tasks })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error updating/creating document: ', error);
    });
};
