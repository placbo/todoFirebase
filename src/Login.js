import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import { AuthContext } from './Auth.js';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { signInWithGoogle } from './firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button
          onClick={() => {
            signInWithGoogle();
          }}
          fullWidth
          variant="contained"
          className={classes.submit}
          color="primary">
          Sign In with Google
        </Button>
      </div>
    </Container>
  );
};

export default withRouter(Login);
