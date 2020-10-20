import React, { useState, useEffect } from "react"
import axios from "axios";

export const SpotifyPlaylists = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        axios
            .get("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            .then(res => setUsername(res.data["display_name"]))
            .catch(err => setError(true));
    }, []);

    if (error)
        return <h1>Error</h1>;

    if (username === "")
        return <h1>Fetching your name...</h1>
    return <h1>Hello, {username}. We are looking for your playlists...</h1>
}