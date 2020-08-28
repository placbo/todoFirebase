import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./Auth";
import {getTodoForUser, setTodoForUser} from "./api";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {Container, Draggable} from "react-smooth-dnd";
import arrayMove from "array-move";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import {Divider} from "@material-ui/core";
import {v4 as uuidv4} from 'uuid';
import EditableTextField from "./EditableTextField";
import Card from "@material-ui/core/Card";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        listStyleType: 'none', //hack!!
        display: 'flex',
        justifyContent: 'center',
    },
    pcb : {
        color:"red",
    },
    card: {
        width: "800px",
        minWidth: "300px"
    },
    input: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        flex: 1,
    },
    inputfield: {},
}));


const MainPage = () => {
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
        let newItem = {
            "itemTitle": newItemTitle,
            "id": uuidv4(),
            "favorite": false,
            "done": false,
        };
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

    const onDrop = ({removedIndex, addedIndex}) => {
        setItems(items => arrayMove(items, removedIndex, addedIndex));
        setAllChangesSaved(false);
    };

    const updateItemTitle = (value, index) => {
        items[index].itemTitle = value;
        setItems([...items])
        setAllChangesSaved(false);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <form onSubmit={addItem}>
                    <InputBase className={classes.input}
                               variant="standard"
                               fullWidth
                               placeholder="Legg til en oppgave"
                               value={newItemTitle}
                               onChange={(e) => setNewItemTitle(e.currentTarget.value)}
                    />
                </form>
                <Container onDrop={onDrop} dragHandleSelector=".drag-handle" lockAxis="y" dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview'
                }}>
                    {items && items.map(({id, itemTitle}, index) => {
                        return (
                            <Draggable key={id}>
                                <ListItem>
                                    {/*<ListItemText id={id} primary={itemTitle}/>*/}
                                    <EditableTextField   value={itemTitle} index={index}
                                                       updateItemTitle={(value, index) => updateItemTitle(value, index)}/>
                                    <ListItemSecondaryAction>
                                        <ListItemIcon >
                                            <IconButton onClick={(e) => deleteItem(index, e)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemIcon>
                                        {/*<ListItemIcon>
                                        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} onClick={(e) => setFavorite(id, e)} name="checked"/>
                                    </ListItemIcon>*/}
                                        <ListItemIcon style={{minWidth:"0"}} className="drag-handle">
                                            <DragHandleIcon/>
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </Draggable>
                        );
                    })}
                </Container>
                {waitForApi && (<pre>fetching data ...</pre>)}
            </Card>
        </div>
    );
}

export default MainPage;
