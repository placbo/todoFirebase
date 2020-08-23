import firebase from "./firebase";
import "firebase/firestore";

const collectionName = "todoLists";

export const getTodoForUser = (userId) => {
    if (process.env.REACT_APP_USE_MOCK) {
        return new Promise((resolve, reject) => {
            let MOCK_DATA = [
                {itemTitle: "test1"},
                {itemTitle: "test2"},
                {itemTitle: "test3"}
            ];
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
    if (process.env.REACT_APP_USE_MOCK) {
        return;
    }
    return firebase
        .firestore()
        .collection(collectionName)
        .doc(userId)
        .set({tasks: tasks})
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error updating/creating document: ", error);
        });
};


