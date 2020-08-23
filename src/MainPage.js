import React, {useContext, useEffect, useState} from "react";
import app from "./firebase";
import {AuthContext} from "./Auth";
import {getTodoForUser, setTodoForUser} from "./api";
import Checkbox from "@material-ui/core/Checkbox";
import {Favorite, FavoriteBorder} from "@material-ui/icons";

function MainPage() {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [items, setItems] = useState([]);
    const [waitForApi, setWaitForApi] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [allChangesSaved, setAllChangesSaved] = useState(true);

    //Trigger (get list) on logged in user
    useEffect(() => {
        setWaitForApi(true);
        getTodoForUser(currentUser.email)
            .then((items) => {
                setItems(items);
            })
            .catch((error) => {
                console.log("Failed to load todo-list", error)
            })
            .finally(() => {
                setWaitForApi(false);
            });
    }, [currentUser.email]);


    //Trigger (save list) on list change
    useEffect(() => {
        if (!allChangesSaved) {
            setTodoForUser(currentUser.email,items);
            setAllChangesSaved(true);
        }
    }, [items, allChangesSaved, currentUser.email]);

    const addItem = (e) => {
        e.preventDefault();
        let newItem = {"itemTitle": newItemTitle};
        setItems([...items, newItem]);
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
            items.map((item, index) =>
            <li key={index}>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checked" />
                {item.itemTitle}
                <button onClick={(e) => deleteItem(index, e)}>Slett</button>
            </li>
            )}

            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    );
}

export default MainPage;
