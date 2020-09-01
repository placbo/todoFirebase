import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import MainPage from "./MainPage";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import DonePage from "./DonePage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#494D5F",
        },
        secondary: {
            main: "#8458B3",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <PrivateRoute exact path="/" component={MainPage}/>
                    <Route exact path="/done" component={DonePage}/>
                    <Route exact path="/login" component={Login}/>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;