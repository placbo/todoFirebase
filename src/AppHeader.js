import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AuthContext } from './Auth';
import app from './firebase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  profileImage: {
    borderRadius: '50%',
    verticalAlign: 'middle',
    maxWidth: '3rem',
    maxHeight: '3rem',
    marginRight: '1rem',
  },
}));

const AppHeader = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const goToDonePage = () => {
    history.push('/done');
  };
  const goToHomePage = () => {
    history.push('/');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    app.auth().signOut();
    history.push('/');
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title} onClick={goToHomePage}>
          TODOAPP
        </Typography>
        {!currentUser && <Button color="inherit">Login</Button>}
        {!!currentUser && (
          <React.Fragment>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
              <div style={{ padding: '8px' }}>
                {currentUser.displayName ? (
                  <Typography variant="h6">
                    <img src={currentUser.photoURL} alt="Avatar" className={classes.profileImage} />
                    {currentUser.displayName}{' '}
                  </Typography>
                ) : (
                  <Typography variant="h6">Signed in as: {currentUser.email} </Typography>
                )}
              </div>
              <Divider />
              <MenuItem onClick={goToDonePage}>Show done items</MenuItem>
              <MenuItem onClick={signOut}>Log out</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
