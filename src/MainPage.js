import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import { getTodoForUser, setTodoForUser } from './api';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { Divider } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import EditableTextField from './EditableTextField';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import AppHeader from './AppHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    listStyleType: 'none', //hack!!
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '800px',
    minWidth: '300px',
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
  const [newItemTitle, setNewItemTitle] = useState('');
  const [items, setItems] = useState([]);
  const [waitForApi, setWaitForApi] = useState(false);
  const { currentUser } = useContext(AuthContext);
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
        console.log('Failed to load todo-list', error);
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
      itemTitle: newItemTitle,
      id: uuidv4(),
      isFavorite: false,
      isDone: false,
    };
    setItems([...items, newItem]);
    setNewItemTitle('');
    setAllChangesSaved(false);
  };

  const toggleItemDone = (id, e) => {
    e.preventDefault();
    let selectedItem = items.find((item) => item.id === id);
    selectedItem.isDone = !selectedItem.isDone;
    setItems([...items]);
    setAllChangesSaved(false);
  };

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    let selectedItem = items.find((item) => item.id === id);
    selectedItem.isFavorite = !selectedItem.isFavorite;
    setItems([...items]);
    setAllChangesSaved(false);
  };

  const onDrop = ({ removedIndex, addedIndex }) => {
    const doneItems = items.filter(function (item) {
      return !item.isDone;
    });
    const removedIndexInFullList = items.findIndex((item) => item.id === doneItems[removedIndex].id);
    const addedIndexInFullList = items.findIndex((item) => item.id === doneItems[addedIndex].id);
    setItems((items) => arrayMove(items, removedIndexInFullList, addedIndexInFullList));
    setAllChangesSaved(false);
  };

  const updateItemTitle = (updatedItemTitle, id) => {
    items.find((item) => item.id === id).itemTitle = updatedItemTitle;
    setItems([...items]);
    setAllChangesSaved(false);
  };

  return (
    <>
      <AppHeader />
      <div className={classes.root}>
        <div className={classes.card}>
          <form onSubmit={addItem}>
            <InputBase
              className={classes.input}
              variant="standard"
              fullWidth
              required
              placeholder="Legg til en oppgave"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.currentTarget.value)}
            />
          </form>
          <Container
            onDrop={onDrop}
            getChildPayload={(index) => items[index]}
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'cards-drop-preview',
            }}>
            {items &&
              items
                .filter(function (item) {
                  return !item.isDone;
                })
                .map(({ id, isFavorite, itemTitle }) => {
                  return (
                    <Draggable key={id}>
                      <ListItem style={{ height: '3rem' }}>
                        <ListItemIcon>
                          <IconButton onClick={(e) => toggleItemDone(id, e)}>
                            <CheckBoxOutlineBlankIcon />
                          </IconButton>
                        </ListItemIcon>
                        <EditableTextField
                          value={itemTitle}
                          id={id}
                          updateItemTitle={(value, id) => updateItemTitle(value, id)}
                        />
                        <ListItemSecondaryAction>
                          <ListItemIcon style={{ minWidth: '0' }}>
                            <Checkbox
                              checked={isFavorite}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                              onClick={(e) => toggleFavorite(id, e)}
                              name="checked"
                            />
                          </ListItemIcon>
                          <ListItemIcon className="drag-handle" style={{ minWidth: '0', padding: '1rem' }}>
                            <DragHandleIcon />
                          </ListItemIcon>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </Draggable>
                  );
                })}
          </Container>

          {waitForApi && <pre>fetching data ...</pre>}

          {/*<pre>*/}
          {/*    {JSON.stringify(items, undefined, 4)}*/}
          {/*</pre>*/}
        </div>
      </div>
    </>
  );
};

export default MainPage;
