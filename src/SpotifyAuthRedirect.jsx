import React, { useState, useEffect } from "react";

export const SpotifyAuthRedirect = ({ onSuccessfulLogin }) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getParams = (url) => {
            let params = {};

            const urlParams = new URLSearchParams(url.split("#")[1]);

            for (let par of urlParams.entries())
                params[par[0]] = par[1];

            return params;
        };

        const params = getParams(window.location.href);
        console.log(params);
        const token = params["access_token"];

        sessionStorage.setItem("token", token);

        console.log(token);
        setRedirect(true);
        onSuccessfulLogin();
    }, []);

    return (
        <div>
            {!redirect && <h1>Authenticating</h1>}
            {redirect && <h1>Authentication successful! Redirecting to your playlists</h1>}
        </div>
    );
};