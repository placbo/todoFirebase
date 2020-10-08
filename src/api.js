import firebase from './firebase';
import 'firebase/firestore';

// export const getTodoListsForUser = (userId) => {
//   if (process.env.REACT_APP_USE_MOCK === 'true') {
//     return new Promise((resolve, reject) => {
//       let MOCK_DATA = ['list1', 'list2'];
//       console.log('Mock retrieving list');
//       resolve(MOCK_DATA);
//     });
//   }
//   let list = [];
//   firebase
//     .firestore()
//     .collection(userId)
//     .get()
//     .then(function (querySnapshot) {
//       querySnapshot.forEach(function (doc) {
//         list.push(doc.id);
//       });
//     });
//   return list;
// };

export const getTodoForUser = (userId, listId) => {
  if (process.env.REACT_APP_USE_MOCK === 'true') {
    return new Promise((resolve, reject) => {
      let MOCK_DATA = [
        { id: '1', itemTitle: 'TODO-item 1', isFavorite: true, isDone: false },
        { id: '2', itemTitle: 'TODO-item 2', isFavorite: false, isDone: false },
        {
          id: '3',
          itemTitle: 'TODO-item 3 masse masse masse tekst her ja , ikke der, nei. ',
          isFavorite: false,
          isDone: false,
        },
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
    .collection(userId)
    .doc(listId)
    .get()
    .then((doc) => {
      return doc.data();
    });
};

export const setTodoForUser = (userId, listId, tasks) => {
  if (process.env.REACT_APP_USE_MOCK === 'true') {
    console.log('Mock saving list');
    return;
  }
  return firebase
    .firestore()
    .collection(userId)
    .doc(listId)
    .set({ tasks: tasks })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error updating/creating document: ', error);
    });
};
