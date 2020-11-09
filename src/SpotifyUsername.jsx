import React, { useState, useEffect } from "react";
import { fetchSpotifyUsername } from "./utils/spotify";
import { getToken } from "./utils/tokenStorage";
import "./css/SpotifyUsername.css";

const SpotifyUsername = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("Cannot read access token");
      return;
    }

    const getUserName = async () => {
      const response = await fetchSpotifyUsername(token);

      if (!response.hasError) {
        setUser(response);
      } else setError(response.message);
    };

    getUserName();
  }, []);

  if (error)
    return (
      <div className="profileContainer">
        <p>Error occurred while fetching name: {error}</p>
      </div>
    );

  if (user)
    return (
      <div className="profileContainer">
        <div className="imageCropper">
          {user.profileImage ? (
            <img
              className="profileImg"
              src={user.profileImage}
              alt="your profile pic"
            />
          ) : (
            <h1 className="profileLetter">{user.username[0]}</h1>
          )}
        </div>
        <p>Hello, {user.username}</p>
      </div>
    );

  return <h1>Loading...</h1>;
};

export default SpotifyUsername;
