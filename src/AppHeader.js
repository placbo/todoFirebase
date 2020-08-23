import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AuthContext} from "./Auth";
import app from "./firebase";

const useStyles = makeStyles((theme) => ({
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    root: {
        backgroundColor: theme.palette.primary
    },
    title: {
        flexGrow: 1,
    },
    userName: {
        flexGrow: 1,
    },
}));

const AppHeader = () => {
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext);

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*    <MenuIcon/>*/}
                {/*</IconButton>*/}
                {/*<Typography variant="h6" className={classes.title}>*/}
                {/*    ONKEL PERS TODO APP*/}
                {/*</Typography>*/}
                {!currentUser && <Button color="inherit">Login</Button>}
                {!!currentUser && <>
                    <Typography className={classes.userName} variant="h6">{currentUser.email} </Typography>
                    <Button color="inherit" onClick={() => app.auth().signOut()}>Sign out</Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}

export default AppHeader;
