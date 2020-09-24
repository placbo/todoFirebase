import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import { getTodoForUser, setTodoForUser } from './api';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AppHeader from './AppHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';

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
  actionLine: {
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteAllButton: {},
}));

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [waitForApi, setWaitForApi] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [allChangesSaved, setAllChangesSaved] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  const goToHomePage = () => {
    history.push('/');
  };

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

  const deleteItem = (id, e) => {
    items.splice(
      items.findIndex((item) => item.id === id),
      1
    );
    setItems([...items]); //TODO: forstå denne
    setAllChangesSaved(false);
  };

  const deleteAllDone = (e) => {
    const IndexesToBeRemoved = items.reduce(function (indexList, item, index) {
      if (item.isDone) indexList.push(index);
      return indexList;
    }, []);
    while (IndexesToBeRemoved.length) {
      items.splice(IndexesToBeRemoved.pop(), 1);
    }
    setItems([...items]);
    setAllChangesSaved(false);
  };

  const toggleItemDone = (id, e) => {
    e.preventDefault();
    let selectedItem = items.find((item) => item.id === id);
    selectedItem.isDone = !selectedItem.isDone;
    setItems([...items]);
    setAllChangesSaved(false);
  };

  return (
    <>
      <AppHeader />
      <div className={classes.root}>
        <div className={classes.card}>
          <div className={classes.actionLine}>
            <IconButton onClick={goToHomePage}>
              <ArrowBackIcon />
            </IconButton>
            <Button onClick={deleteAllDone} className={classes.deleteAllButton}>
              Delete all
            </Button>
          </div>
          {items &&
            items
              .filter((item) => item.isDone)
              .map(({ id, itemTitle }) => {
                return (
                  <ListItem key={id} style={{ height: '3rem' }}>
                    <ListItemIcon>
                      <IconButton onClick={(e) => toggleItemDone(id, e)}>
                        <CheckBoxIcon />
                      </IconButton>
                    </ListItemIcon>
                    <Typography variant="body1" style={{ textDecoration: 'line-through' }}>
                      {itemTitle}
                    </Typography>
                    <ListItemSecondaryAction>
                      <ListItemIcon>
                        <IconButton onClick={(e) => deleteItem(id, e)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}

          {waitForApi && <pre>fetching data ...</pre>}
        </div>
      </div>
    </>
  );
};

export default MainPage;
