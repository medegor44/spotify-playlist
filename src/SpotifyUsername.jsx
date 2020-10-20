import React, { useState, useEffect } from "react";
import { fetchSpotifyUsername } from "./utils/spotify";
import { getToken } from "./utils/tokenStorage";

export const SpotifyUsername = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("Cannot read access token");
      return;
    }

    const getUserName = async () => {
      const data = await fetchSpotifyUsername(token);

      const name = data["username"];

      if (name) setUsername(name);
      else setError(data["message"]);
    };

    getUserName();
  }, []);

  if (error) return <h1>Error occurred while fetching name: {error}</h1>;

  if (username) return <h1>Hello, {username}</h1>;

  return <h1>Loading...</h1>;
};
