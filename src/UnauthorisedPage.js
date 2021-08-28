import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';
import app from './firebase';

const UnauthorisedPage = () => {
  useEffect(() => {
    app.auth().signOut().then(console.log('signed out'));
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <h1>IKKE TILGANG, SJØ!</h1>
      <p>Du er logget ut igjen</p>
      <a href={'/'}>Tilbake til innlogging</a>
    </Container>
  );
};

export default withRouter(UnauthorisedPage);
