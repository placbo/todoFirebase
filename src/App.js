import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import MainPage from "./MainPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const App = () => {

    const classes = useStyles();


    return (
        <AuthProvider>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            JUST DO IT!
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Router>
                    <div>
                        <PrivateRoute exact path="/" component={MainPage}/>
                        <Route exact path="/login" component={Login}/>
                    </div>
                </Router>
            </div>
        </AuthProvider>
    );
};

export default App;