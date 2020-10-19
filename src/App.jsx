import React, {useState} from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom"
import { SpotifyLogin } from "./SpotifyLogin";
import { SpotifyAuthRedirect } from "./SpotifyAuthRedirect";
import { SpotifyPlaylists } from "./SpotifyPlaylists";

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {
                        loggedIn ?
                            <SpotifyPlaylists/> :
                            <SpotifyLogin/>
                    }
                </Route>
                <Route exact path="/auth">
                    {
                        loggedIn ?
                            <Redirect to="/" /> :
                            <SpotifyAuthRedirect onSuccessfulLogin={() => setLoggedIn(true)}/>
                    }
                </Route>
            </Switch>
        </Router>
    );
};