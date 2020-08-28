import firebase from "./firebase";
import "firebase/firestore";

const collectionName = "todoLists";

export const getTodoForUser = (userId) => {
    if (process.env.REACT_APP_USE_MOCK==="true") {
        return new Promise((resolve, reject) => {
            let MOCK_DATA = [
                {id:"1",itemTitle: "TODO-item 1"},
                {id:"2",itemTitle: "TODO-item 2"},
                {id:"3",itemTitle: "TODO-item 3"},
                {id:"4",itemTitle: "TODO-item 4"},
            ];
            console.log("Mock retrieving list")
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
    if (process.env.REACT_APP_USE_MOCK==="true") {
        console.log("Mock saving list")
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


