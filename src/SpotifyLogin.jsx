import React from "react"

export const SpotifyLogin = () => {
    const initiateSpotifyLogin = () => {
        const authUrl =
            `https://accounts.spotify.com/authorize?` +
            `response_type=token` +
            `&client_id=962be0d99c5f4098985705f22c488288` +
            `&redirect_uri=http://localhost:1234/auth` +
            `&scope=user-library-read`;

        window.location.href = authUrl;
    };

    return <button onClick={initiateSpotifyLogin}>Log in to spotify</button>;
}