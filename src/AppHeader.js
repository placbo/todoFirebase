import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AuthContext} from "./Auth";
import app from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {useHistory} from "react-router";

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

    const history = useHistory();
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const goToDonePage = () => {
        history.push("/done");
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => app.auth().signOut();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    ONKEL PERS TODOAPP
                </Typography>
                {!currentUser && <Button color="inherit">Login</Button>}
                {!!currentUser &&
                <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                }
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <div style={{padding: "8px"}}>
                        <Typography variant="h6">Signed in as: {currentUser.email} </Typography>
                    </div>
                    {/*<MenuItem onClick={goToDonePage}>Show done items</MenuItem>*/}
                    <MenuItem onClick={signOut}>Log out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default AppHeader;
