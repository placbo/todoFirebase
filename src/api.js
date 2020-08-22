import React, {useEffect, useState} from "react";
import firebase from "./firebase";
import "firebase/firestore";

const api = () => {
const collectionName = "todoLists";

    // const getTodoForUser = (userId) => {
    //     firebase
    //     .firestore()
    //         .collection(collectionName)
    //         .doc(userId)
    //         .get()
    //         .then( (doc) => {
    //             return doc.data().tasks;
    //         });
    //       });
    // };

    // const setTodoForUser = (userId, tasks) => {
    //     firebase
    //       .firestore()
    //     .collection(collectionName)
    //     .doc(userId)
    //     .set({tasks: tasks})
    //     .then((docRef) => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch( (error) => {
    //         console.error("Error updating/creating document: ", error);
    //     });
    // };
}

export default api;
