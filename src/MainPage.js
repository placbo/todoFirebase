import React, {useContext, useEffect, useState} from "react";
import app from "./firebase";
import firebase from "./firebase";
import {AuthContext} from "./Auth";

function MainPage() {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [items, setItems] = useState([]);
    const [waitForApi, setWaitForApi] = useState(false);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        setWaitForApi(true);
        firebase
            .firestore()
            .collection("todoLists")
            .doc(currentUser.email)
            .get()
            .then((doc) => {
                setItems(doc.data().tasks);
            })
            .catch((error) => {
                console.log("fail to load todoList", error)
            })
            .finally(() => {
                setWaitForApi(false);
            });
    }, [currentUser.email]);

    const onSubmit = (e) => {
        e.preventDefault();
        let newItem = {"itemTitle": newItemTitle};
        let data = [...items, newItem];
        setItems(data);
        firebase
            .firestore()
            .collection("todoLists")
            .doc(currentUser.email)
            .set({tasks: data})
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error updating/creating document: ", error);
            });
    };

    return (
        <div className="App">
            <h1>TODO {currentUser && `for ${currentUser.email}`}</h1>
            <pre>{items.size}</pre>
            <form onSubmit={onSubmit}>
                <div>
                    <label/>
                </div>
                <input
                    type="text"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.currentTarget.value)}
                />
                <button>Add</button>
            </form>
            {waitForApi && (<h1>fetching data ...</h1>)}
            {items &&
            items.map((item, index) => <li key={index}>{item.itemTitle}</li>)}

            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    );
}

export default MainPage;
