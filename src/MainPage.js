import React, {useContext, useEffect, useState} from "react";
import {AuthContext, AuthProvider} from "./Auth";
import {getTodoForUser, setTodoForUser} from "./api";
import Checkbox from "@material-ui/core/Checkbox";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import AppHeader from "./AppHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding:theme.spacing(1),
        flex: 1,
    },
    inputfield: {
    }
}));


function MainPage() {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [items, setItems] = useState([]);
    const [waitForApi, setWaitForApi] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [allChangesSaved, setAllChangesSaved] = useState(true);
    const classes = useStyles();

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
            setTodoForUser(currentUser.email, items);
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
        <div className={classes.root}>
            <form onSubmit={addItem}>
                <InputBase className={classes.input}
                           variant="standard"
                           fullWidth
                           placeholder="Legg til en oppgave"
                           value={newItemTitle}
                           onChange={(e) => setNewItemTitle(e.currentTarget.value)}
                />
            </form>
            {waitForApi && (<pre>fetching data ...</pre>)}
            {items &&
            items.map((item, index) =>
                <ListItem key={index} button>
                    <ListItemSecondaryAction>
                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checked"/>
                        <IconButton edge="end" onClick={(e) => deleteItem(index, e)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                    <ListItemText id={index} primary={item.itemTitle}/>
                </ListItem>
            )}
        </div>
    );
}

export default MainPage;
