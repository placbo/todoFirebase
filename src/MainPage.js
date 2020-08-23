import React, {useContext, useEffect, useState} from "react";
import app from "./firebase";
import {AuthContext} from "./Auth";
import {getTodoForUser, setTodoForUser} from "./api";

function MainPage() {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [items, setItems] = useState([]);
    const [waitForApi, setWaitForApi] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [allChangesSaved, setAllChangesSaved] = useState(true);

    useEffect(() => {
        setWaitForApi(true);
        getTodoForUser(currentUser.email)
            .then((items) => {
                setItems(items);
            })
            .catch((error) => {
                console.log("fail to load todoList", error)
            })
            .finally(() => {
                setWaitForApi(false);
            });
    }, [currentUser.email]);


    useEffect(() => {
        if (!allChangesSaved) {
            setTodoForUser(currentUser.email,items);
            setAllChangesSaved(true);
        }
    }, [items, allChangesSaved, currentUser.email]);


    const addItem = (e) => {
        e.preventDefault();
        let newItem = {"itemTitle": newItemTitle};
        let data = [...items, newItem];
        setItems(data);
        setNewItemTitle("");
        setAllChangesSaved(false);
    };

    const deleteItem = (index, e) => {
        e.preventDefault();
        items.splice(index, 1)
        //setItems(items.slice());
        setItems([...items]); //TODO: forstå denne
        setAllChangesSaved(false);
    }

    return (
        <div className="App">
            <h1>TODO {currentUser && `for ${currentUser.email}`}</h1>
            <pre>{items.size}</pre>
            <form onSubmit={addItem}>
                <div>
                    <label/>
                </div>
                <input
                    type="text"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.currentTarget.value)}
                />
                <button disabled={newItemTitle.length === 0}>Add</button>
            </form>
            {waitForApi && (<h1>fetching data ...</h1>)}
            {items &&
            items.map((item, index) => <li key={index}>{item.itemTitle}
                <button onClick={(e) => deleteItem(index, e)}>Slett</button>
            </li>)}

            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    );
}

export default MainPage;
