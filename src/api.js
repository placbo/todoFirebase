import firebase from "./firebase";
import "firebase/firestore";

const collectionName = "todoLists";

export const getTodoForUser = (userId) => {
    return firebase
        .firestore()
        .collection(collectionName)
        .doc(userId)
        .get()
        .then((doc) => {
            return doc.data().tasks;
        });
};


export const setTodoForUser = (userId,tasks) => {
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


